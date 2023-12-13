const ipcEnum = {
  winAction: 'winAction',
  fileAction: 'fileAction',
  pageAction: 'pageAction'
}

const ipcService = (ipcType, actionType) => {
  return async (payload = null) => {
    if (window && window.$ipc) {
      const finalParams = {
        type: actionType,
        payload
      }
      return await window.$ipc[ipcType](finalParams)
    } else {
      console.warn('暂不支持')
    }
  }
}

export { ipcEnum, ipcService }
