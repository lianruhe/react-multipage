import request from 'opiece-utils/lib/request'
import { message } from 'antd'

const showMessage = body => {
  let msg = '服务器错误'
  if (body && body.msg) {
    msg = body.msg
    console.error(body.msg, ': ', body.result || {})
  }

  message.error(msg)
}

const requestParse = async (url, options = {}) => {
  // 默认 post 请求
  if (!options.method) {
    options.method = 'POST'
  }

  const body = await request(url, options).catch(e => {
    // 调用接口失败
    showMessage()
    throw e
  })

  const { status, result } = body || {}
  // 认证失败，需要重新发送或登陆
  if (body && +status === 10) {
    const { type } = result
    if (type === 'resend') {
      const rebody = await requestParse(url, options)
      return rebody
    }
    if (type === 'login' && result.url) {
      window.location.href = result.url
      throw body
    }
  }

  // 接口返回错误
  if (body && +status !== 0) {
    showMessage(body)
    throw body
  }

  return result
}

export default requestParse
