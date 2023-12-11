/**
// 发送 POST 请求
axios({
  // `method` 是创建请求时使用的方法
  method: 'post',
  // `url` 是用于请求的服务器 URL
  url: '/user/12345',
  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },
  // `data` 是作为请求主体被发送的数据
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  },
  // `responseType` 表示服务器响应的数据类型
  responseType: 'json', // 默认的
});

// 响应结构
{
  // `data` 由服务器提供的响应
  data: {},
  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,
  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',
  // `headers` 服务器响应的头
  headers: {},
  // `config` 是为请求提供的配置信息
  config: {}
}
 */

const axios = require('axios')

const service = axios.create({
  baseURL: 'localhost',
  timeout: 600000 // 10分钟
})
// request interceptor
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
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

export default service

export const useRequestPrefix = (prefix) => {
  return {
    get: (controller) => (data) =>
      service({ url: `/${prefix}/${controller}`, params: data }),
    post: (controller) => (data) =>
      service({ url: `/${prefix}/${controller}`, method: 'post', data })
  }
}
