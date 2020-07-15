import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
import VueCompositionApi from "@vue/composition-api";
import "./icons/index"

import Icons from  "./demoIcons/index"
import IconSvg from './demoIcons/icon-components'

Vue.component('icon-svg', IconSvg)

//自定义全局组件  需要改变 vue的指向 默认是运行模式  在 vue.config.js 中更改就可以
// Vue.component('syg-icon',{
//   template:"<div>aaa</div>"
// })
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCompositionApi);
Vue.use(Icons)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
/**
 * vue3.0
 */
