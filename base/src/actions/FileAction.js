const { dialog } = require('electron')

module.exports = {
    /**
     * 选择文件夹
     */
    selectDir: async (opts = {}) => {
        const defaultOpts = {
            title: '请选择文件夹',
            label: '确定',
            properties: ["openDirectory"]
        }
        const fileOpts = Object.assign({}, opts, defaultOpts)
        const result = await dialog.showOpenDialog({
            title: fileOpts.title,
            buttonLabel: fileOpts.buttonLabel,
            properties: fileOpts.properties
        })
        return result
    }
}
