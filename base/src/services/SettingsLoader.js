const fs = require('fs')
const p = require('path')
const _ = require('lodash')

const DetectSettingsPath = (payload = {}, $current = null, $root = null) => {
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

const GetSettings = (payload = {}, $current = null, $root = null) => {
  DetectSettingsPath(payload, $current, $root)
  let result = {}
  try {
    result = JSON.parse(fs.readFileSync($root.settingsPath.filePath, 'utf8'))
  } catch (e) {
    console.warn(e)
  }
  $root.settings = _.merge({}, $root.settings, result)
  return $root.settings
}

const InitSettings = (payload = {}, $current = null, $root = null) => {
  DetectSettingsPath(payload, $current, $root)
  GetSettings(payload, $current, $root)
}

module.exports = {
  DetectSettingsPath,
  GetSettings,
  InitSettings
}
