const { app } = require('electron')
const mainWindow = require('./src/windows/mainWindow/index')

const root = {
    config: {
        env: 'development'
    }
}

app.whenReady().then(() => {
    mainWindow.create(root)
})
