import axios from 'axios'
import { getToken,removeToken } from './composable/auth'
import{notif}from '@/composable/utils.js'
import router from '@/router/index.js'

const service=axios.create({
    // baseURL:"http://47.120.8.89:7071/api",
    baseURL:"http://127.0.0.1:7071/api",
    timeout:10*1000,
})

//请求前
service.interceptors.request.use((config)=>{
    const token=getToken();
    if(token){
        config.headers['token']=token;
    }
    return config

},(err)=>{
    return  Promise.reject(err)
})
//请求后
service.interceptors.response.use((response)=>{
    if(response.data.msg=='illegal token'){
        removeToken()
        notif('登录身份已过期,  请重新登录','error')
        router.push('/')
    }
    return response
},(err)=>{
    console.log(err)
    if(err.data.msg=='illegal token'){
        //身份过期啦，重新去请求token
        removeToken()
        notif('登录身份已过期，请重新登录','error')
        router.push('/')

    }
    return  Promise.reject(err)
})

export default service;