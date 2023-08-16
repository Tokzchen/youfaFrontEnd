import service from '@/axios';
import { useCookies } from '@vueuse/integrations/useCookies'

const tokenKey='login_token'
const loginInfo='login_info'
const location='login_location'
const cookie=useCookies()
const maxAge=60*60*24*3;
const loacationAge=60*60*3;

export function getToken(){
    return cookie.get(tokenKey)
}

//设置token
export function setToken(value){
    cookie.set(tokenKey,value,{
        maxAge,
    });
}


//清除token

export function removeToken(){
    cookie.remove(tokenKey);
}

//设置登录信息
export function setLoginInfo(value){
    cookie.set(loginInfo,value,{
        maxAge,
    })
}

export function removeLoginInfo(){
    cookie.remove(loginInfo)
}

export async function getLoginInfo(){
   return await service.post('/user/identity')
}


export function setLoginLocation(obj){
    cookie.set(location,JSON.stringify(obj),{
        loacationAge
    })
}

export function getLoginLocation(){
    return cookie.get(location)
}

export function removeLoginLocaion(){
    cookie.remove(location)
}