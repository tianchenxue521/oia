import axios from 'axios'
import { Dialog } from 'vant'
const service = axios.create({
  baseURL: 'http://106.14.82.45:6695', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout

})

service.defaults.retry = 6;
service.defaults.retryDelay = 1000;

// request拦截器 request interceptor
service.interceptors.request.use(
  (config) => {
    if (uni.getStorageSync('token')) {
      config.headers.token = uni.getStorageSync('token');
    }

    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      // Toast.loading({
      //   forbidClick: true
      // })
    }

    return config
  },
  (error) => {
    // do something with request error
    return Promise.reject(error)
  }
)
// respone拦截器
// service.interceptors.response.use(
//   (response) => {
//     Toast.clear()
//     const res = response.data
//     if (res.status && res.status !== 200) {
//       // 登录超时,重新登录
//       return Promise.reject(res || 'error')
//     }
//     return Promise.resolve(res)
//   },
//   (error) => {
//     Toast.clear()
//     console.log('err' + error) // for debug
//     return Promise.reject(error)
//   }
// )

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log("11111111111111");
    if(res && res.code==401) {
      // //账号异地登录
      //  Toast(res.msg);
      //  setTimeout(() => {
      //     sessionStorage.clear();
      //     window.location.href="/login";
      // }, 2000)
      Dialog.alert({
        message: '去登录'
      }).then(() => {
		uni.removeStorageSync('token');
		uni.removeStorageSync('login_code');
        console.log('点击确定')
        window.location.href = "/#login"
        location.reload();
      })
    }
    return res
  },
  (error) => {
    if (error.response) {

      // const res = response.data;
      // if(res && res.code==500) {
      //   if(res.msg="账号异地登录"){
      //       Toast(res.msg);
      //   }
      // }
      // return res
      // switch (error.response.status) {
      //   case 401:
      //     // console.log('err status' + error.response.status)
      //     router.push('/')
      //     break
      //   case 330:
      //     break
      //   case 500:
      //     break
      // }
    }

    // 处理超时的情况
    let config = error.config
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) {return Promise.reject(error)}

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0

    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
      // Reject with the error
      return Promise.reject(error)
    }

    // Increase the retry count
    config.__retryCount += 1

    // Create new promise to handle exponential backoff
    let backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve()
      }, config.retryDelay || 1)
    })

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
      return axios(config)
    })
  }
)

export default service