import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'cookie_js'
import {Login} from '@/api/login';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    count: 10
  },
  getters: {  ///就类似 计算属性
    count: (state) => {
      return state.count + 1
    },
    count1: state => state.count + 10
  },
  mutations: {  //修改 state 得值 通过这个函数  通过 this.$store.commit('SET_COUNT'，100)
    SET_COUNT(state, value) {
      state.count = value
    },
    SET_ISCOLLAPSE(state) {


      state.isCollapse = !state.isCollapse
      console.log(state.isCollapse)
      //html5 本地存储
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse)) //转换成字符串 存储得东西在application 中
    }
  },
  actions: {
    setXhj(context, value) {   //context指向了3个东西 context.state,context.getters,context.commit  下面还有第二种写发

    },
    setXhj1({state, getters}, commit) {

    },
    login(content, repuestData) {
      return new Promise((resolve, reject) => {
        Login(repuestData).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {


  }
})
/***
 * state 是存储的单一的状态
 **/
