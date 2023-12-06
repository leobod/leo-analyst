const { app } = require('electron')
const Home = require('./src/windows/Main/index')

const root = {
    app: null,
    config: {
        env: 'development'
    },
    views: [],
}

app.whenReady().then(() => {
    root.app = app
    Home.create(root)
})
