import axios from 'axios'
import {Message} from 'element-ui' //必须大写
//创建xaios 变量赋给 servce
const BASEURL ='/devApi';
const BASEURL1 ='http://www.web-jshtml.cn/vue_admin_api/token';
const service =axios.create({
    baseURL:BASEURL,
    timeout:'15000'
});
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data=response.data;
    if (data.resCode!== 0) {
        /**
         * element -ui 这个实在 main 得js 中引用得 vue.user() 只能在vue中使用  要想在js 中使用 需要单独引用js
         */
        Message.error(data.message);
        return Promise.reject(data);
    }else{
        return response;
    }
   // return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export  default  service
/**
 * 使用 dexport default  不能有多个 引用 js文件 时不需要 花括号
 */
