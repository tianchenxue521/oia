import App from './App';
import http from "@/utils/http.js";
import store from './store.js';
import $token from '@/utils/token';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$token = $token;
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
App.mpType = 'app'
const app = new Vue({
    ...App,
	 store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif