import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'cookie_js'
import {Login} from '@/api/login';
Vue.use(Vuex)
import app from './app'
export default new Vuex.Store({

  modules: {

    app
  }
})
/***
 * state 是存储的单一的状态
 **/
