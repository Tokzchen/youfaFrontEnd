import axios from '@/axios.js'


export const getLawAidSocialInfoUser1=()=>{
    return axios.get('/follow/get/followers')
}

export const getLawAidSocialInfoUser2=()=>{
    return axios.get('/follow/get/followees')
}

export const getSocialPostsCnt=()=>{
    return axios.post('/forum/article/get/count')
}