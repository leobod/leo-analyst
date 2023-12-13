import axios from 'axios'

const httpService = axios.create({
  baseURL: 'localhost',
  timeout: 600000 // 10分钟
})
// request interceptor
httpService.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
httpService.interceptors.response.use(
  async (response) => {
    const res = response.data
    if (res.errCode !== 0) {
      return Promise.reject(new Error(res.msg || 'error'))
    } else {
      return res.data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

const httpServicePrefix = (prefix) => {
  return {
    get: (controller) => (data) =>
      httpService({ url: `/${prefix}/${controller}`, params: data }),
    post: (controller) => (data) =>
      httpService({ url: `/${prefix}/${controller}`, method: 'post', data })
  }
}

const ipcService = async (params) => {
  if (window && window.$ipc) {
    return await window.$ipc.service(params)
  } else {
    console.warn('暂不支持')
  }
}

/**
 * 定义基础的IpcService入口
 * @param {*} type
 * @returns
 */
const ipcServicePrefix = (type) => {
  return async (payload = null) => {
    if (window && window.$ipc) {
      const finalParams = {
        type,
        payload
      }
      return await window.$ipc.service(finalParams)
    } else {
      console.warn('暂不支持')
    }
  }
}

export { httpService, httpServicePrefix, ipcService, ipcServicePrefix }
