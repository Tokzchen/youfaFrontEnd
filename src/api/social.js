import axios from '@/axios.js'


export const getLawAidSocialInfoUser1=()=>{
    return axios.get('/forum/user/get/followers')
}

export const getLawAidSocialInfoUser2=()=>{
    return axios.get('/forum/user/get/following')
}

export const getSocialPostsCnt=()=>{
    return axios.get('/forum/user/get/article/count')
}