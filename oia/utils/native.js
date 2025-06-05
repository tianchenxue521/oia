import { Toast } from 'vant'
// 判断安卓
export function isAndroid() {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    if (isAndroid) {
        return true
    }
    return false
}
// 判断设备为 ios
export function isIos() {
    var u = navigator.userAgent
    if (u.indexOf('iPhone') > -1 || u.indexOf('iOS') > -1) {
        return true
    }
    return false
}

function getSearchJson() {
    var hrefInfo = window.location.search
        .substring(1)
        .split('&')
        .map((query) => query.split('='))
        .reduce((params, pairs) => (params[pairs[0]] = pairs[1] || '', params), {})
    return hrefInfo
}
// 清除缓存
export function clearCache() {
    //   if (isIos()) {
    //     window.webkit && window.webkit.messageHandlers.jsToIosInteraction.postMessage({
    //       // 'type': 'get', 'act': 'addressbook'
    //       'type': 'jump', 'act': 'scancode'
    //     })
    //   }
    //   if (isAndroid()) {
    //     call.go2QR()
    //   }
    let options = getSearchJson()
    if (options && options.app == 1) {
        call.clearCache()
    } else if (options && options.app == 2) {
        window.webkit && window.webkit.messageHandlers.clearCache.postMessage({});
    }
}

// 获得定位权限
export function getLocationPermission() {
    let options = getSearchJson()
    if (options && options.app == 1) {
        call.getLocationPermission()
    } else if (options && options.app == 2) {
        window.webkit && window.webkit.messageHandlers.getLocationPermission.postMessage({});
    }
}

// 获得摄像头权限
export function getCameraPermission() {
    let options = getSearchJson()
    // console.log("获得摄像头权限--", options)
    // options.app = 1 为安卓   2为苹果
    if (options && options.app == 1) {
        call.getCameraPermission()
    } else if (options && options.app == 2) {
        window.webkit && window.webkit.messageHandlers.getCameraPermission.postMessage({});
    }
}
// app跳转到抖音或者快手
// 三个参数  1.target（1是抖音  2是快手） 2.type（1是主页，2是视频）  3.任务worksid
export function go2ExternalApp(target, type, worksid) {
    let options = getSearchJson()
    // options.app = 1 为安卓   2为苹果
    window.call.go2Main();
    // window.android.go2Main();
    // if (options && options.app == 1) {
    //     call.goback()
    // } else if (options && options.app == 2) {
    //     var param = {
    //         app: target,
    //         type: type,
    //         worksid: worksid
    //     }
    //     window.webkit && window.webkit.messageHandlers.go2ExternalApp.postMessage(param);
    // }
}
export default {
    isAndroid, isIos, clearCache, getLocationPermission, getCameraPermission, go2ExternalApp
}
