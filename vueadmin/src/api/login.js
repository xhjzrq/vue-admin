import service from '@/utils/request';
/**
 * 验证码
 */
export function  getSms (data){
    return service.request({
        method:'post',
        url:'/getSms/',
        data,
        responseType:'stream'
    })
}
/**
 * 用户角色
 */
/**
 * 登录
 */
export function  Login (data){
    return service.request({
        method:'post',
        url:'/login/',
        data,
        // responseType:'stream'
    })
}
/**
 * 注册
 */
export function  Register (data){
    return service.request({
        method:'post',
        url:'/register/',
        data,
       // responseType:'stream'
    })
}


