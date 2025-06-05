// import { Toast } from 'vant'
// 手机号校验
export function validatePhone(value) {
  var mPattern = /^1[3456789]\d{9}$/;
  return mPattern.test(value);
}
// 校验密码：只能输入6-12个字母、数字、下划线
export function isPasswd(value) {
  // var patrn = /^(\w){6,12}$/;
  var patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
  if (!patrn.exec(value)) { return false }
  return true
}
// 校验交易密码：只能数字
function businessPwd(str) {
  if (str.length != 6) {
    return false
  }
  let reg = /^\d{6}$/;
  if (reg.test(str)) {
    return true
  }
  return false
}
// 只能大于0的正整数
export function numberGreater0(str) {
  let reg = /(^[1-9]\d*$)/;
  if (reg.test(str)) {
    return true
  }
  return false
}
// 校验大于等于50并且是10的倍数的数字
export function isNum10MultipleAndGreater50(value) {
  let reg = /^\d/;
  if (!reg.test(value)) {
    return false
  }
  if (value >= 50 && value % 10 == 0) {
    return true
  }
  return false

}
// 校验大于等于100并且是10的倍数的数字
export function isNum10MultipleAndGreater100(value) {
  let reg = /^\d/;
  if (!reg.test(value)) {
    return false
  }
  if (value >= 100 && value % 10 == 0) {
    return true
  }
  return false

}


export function formatDateTime(value) { // 时间戳转换日期格式方法
  if (value == null) {
	return ''
  } else {
	const date = new Date(value)
	const y = date.getFullYear() // 年
	let MM = date.getMonth() + 1 // 月
	MM = MM < 10 ? ('0' + MM) : MM
	let d = date.getDate() // 日
	d = d < 10 ? ('0' + d) : d
	let h = date.getHours() // 时
	h = h < 10 ? ('0' + h) : h
	let m = date.getMinutes()// 分
	m = m < 10 ? ('0' + m) : m
	let s = date.getSeconds()// 秒
	s = s < 10 ? ('0' + s) : s
	return  MM + '月' + d + '日'+ ' ' + h + ':' + m
	}
  }

export default {
  validatePhone,
  isPasswd,
  businessPwd,
  numberGreater0,
  isNum10MultipleAndGreater50,
  isNum10MultipleAndGreater100,
  formatDateTime
}
