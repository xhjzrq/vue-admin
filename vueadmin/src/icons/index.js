//自定义全局组件   这种定义需要改变vue 的指向
import Vue from "vue";
import Xhjicon from "./Xhjicon";


Vue.component('syg-icon',Xhjicon)
/**
 * require context 读取指定的目录所有文件
 * 1 目录 2 是否遍历子级目录    3  定义比遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);
