const fs = require('fs')
const p = require('path')
const _ = require('lodash')

module.exports = class SettingsLoader {
  static detectSettingsPath($root) {
    const { app, settingsPath, settings } = $root
    const homeDir = app.getPath('home')
    const groupPath = p.join(homeDir, `.${settingsPath.group}`)
    const appPath = p.join(groupPath, `.${settingsPath.app}`)
    $root.settingsPath.filePath = p.join(appPath, `${settingsPath.file}`)
    $root.settingsPath.appPath = app.getAppPath()
    if (!fs.existsSync(groupPath)) {
      fs.mkdirSync(groupPath)
    }
    if (!fs.existsSync(appPath)) {
      fs.mkdirSync(appPath)
    }
    if (!fs.existsSync($root.settingsPath.filePath)) {
      fs.writeFileSync(
        $root.settingsPath.filePath,
        JSON.stringify(settings, null, 2)
      )
    }
  }

  static loadConfig($root) {
    SettingsLoader.detectSettingsPath($root)
    let result = {}
    try {
      result = JSON.parse(fs.readFileSync($root.settingsPath.filePath, 'utf8'))
    } catch (e) {
      console.warn(e)
    }
    $root.settings = _.merge({}, $root.settings, result)
    return $root.settings
  }

  static initSettings($root) {
    SettingsLoader.detectSettingsPath($root)
    SettingsLoader.loadConfig($root)
  }
}
