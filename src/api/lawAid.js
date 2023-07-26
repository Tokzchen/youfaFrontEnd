import axios from '@/axios.js'

export const getLawAidInfoUser=()=>{
    return axios.post('/lawAid/lawAidInfo/user')
}

export const getLawAidSocialInfoUser1=()=>{
    return axios.get('/forum/user/get/followers')
}

export const getLawAidSocialInfoUser2=()=>{
    return axios.get('/forum/user/get/following')
}