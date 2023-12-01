const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('$ipc', {
    win: {
        close: () => ipcRenderer.send('close-app'),
        min: () => ipcRenderer.send('min-app'),
        max: () => ipcRenderer.send('max-app'),
        move: (canMove) => ipcRenderer.send("window-move-open", canMove)
    }
})