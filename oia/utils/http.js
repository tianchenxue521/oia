import axios from 'axios'
import $token from './token'
import { baseApi } from './config.js'
import qs from 'qs'

// import { Dialog } from 'vant'
// axios.defaults.timeout = 10000
// 服务器接口
axios.defaults.baseURL = baseApi

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    console.log('request-拦截中~');
		config.headers = {
		  'Content-Type': 'application/json',
		   'token': `${$token.get()}`
		}


    return config;
  },
  (error) => {
    console.log('拦截器----request', error)
    checkRequest(error)
    // return Promise.reject(error)
  }
)

const checkRequest = (error)=>{

}

// http response 拦截器
axios.interceptors.response.use(
  (res) => {
    console.log('拦截器----response', res)
    if (res.data) {
		if (res.data.code==0&&res.data.info.indexOf('登录失效') > -1) {
		    //uni.$u.toast("登录失效，请重新登录!");
			setTimeout(() => {
				uni.removeStorageSync('token');
				uni.removeStorageSync('login_code');
				uni.setStorageSync('indexGg', 1);
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}, 1500);
			
			return Promise.resolve(res);
		}
		if(res.data.hasOwnProperty('data')){
			if(res.data.data.hasOwnProperty('login_code') && uni.getStorageSync('login_code')){
				if (res.data.data.login_code != uni.getStorageSync('login_code')) {
				    uni.$u.toast("已在其它设备登录，请重新登录!");
					setTimeout(() => {
						uni.removeStorageSync('token');
						uni.removeStorageSync('login_code');
						uni.setStorageSync('indexGg', 1);
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}, 1500);
					
					return Promise.resolve(res);
				}
			}
		}
    }
    return Promise.resolve(res)
  },
  (error) => {
    console.log('拦截器----response-error', error)
    //checkStatus(error.response)
    return Promise.reject(error)
  }
)

// http状态码错误处理
const checkStatus = (res) => {
  switch (res && res.status) {
  case 401: { // 登录过期
    Dialog.alert({
      message: '去登录'
    }).then(() => {
      uni.removeStorageSync('token')
      console.log('点击确定')
      window.location.href = "/#login"
      location.reload();
    })
    break
  }
  default:
    break
  }
}


axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
    return new Promise((resolve, reject) => {
        console.log(config)
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                console.log("执行完成：",response)
                response = {
                    data: response.data,
                    status: response.statusCode,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };
                settle(resolve, reject, response);
            }
        })
    })
}



/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      headers: headers
    })
      .then((response) => {
        // console.log("get-response:",response)
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, params = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    console.log('post', headers)
    axios.post(url, params, headers)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}

export function postUrl (url, params, data, headers = {}) {
  function changeUrl () {
    let url = ''
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (typeof params[key] === 'boolean') {
          params[key] = Number(params[key])
        }
        url = url + key + '=' + params[key] + '&'
      }
    }
    return '?' + url
  }
  return new Promise((resolve, reject) => {
    axios.post(url + changeUrl(params), data, headers)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}

/**
* 封装patch请求
* @param url
* @param data
* @returns {Promise}
*/

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}

/**
* 封装put请求
* @param url
* @param data
* @returns {Promise}
*/

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}
export function putUrl (url, params, data, headers = {}) {
  function changeUrl () {
    let url = ''
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (typeof params[key] === 'boolean') {
          params[key] = Number(params[key])
        }
        url = url + key + '=' + params[key] + '&'
      }
    }
    return '?' + url
  }
  return new Promise((resolve, reject) => {
    axios.put(url + changeUrl(params), data, headers)
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}

/**
* 封装delete请求
* @param url
* @param data
* @returns {Promise}
*/

export function del (url, params = {}) {
  function changeUrl () {
    let url = ''
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if (typeof params[key] === 'boolean') {
          params[key] = Number(params[key])
        }
        url = url + key + '=' + params[key] + '&'
      }
    }
    return '?' + url
  }
  return new Promise((resolve, reject) => {
    axios.delete(url + changeUrl(params))
      .then((response) => {
        resolve(response.data)
      }, (err) => {
        reject(err)
      })
  })
}

export default { get, post, postUrl, put, putUrl, patch, del }
