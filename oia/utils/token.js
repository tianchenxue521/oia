/**
 * @overview token业务处理
 */

const TOKEN_KEY = 'token'

const get = () => uni.getStorageSync(TOKEN_KEY)

const remove = () => uni.removeStorageSync(TOKEN_KEY)

const set = (token) => uni.setStorageSync(TOKEN_KEY, token)
export default {
  remove,
  set,
  get
}
