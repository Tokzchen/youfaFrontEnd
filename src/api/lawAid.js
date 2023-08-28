import axios from '@/axios.js'

export const getLawAidInfoUser=()=>{
    return axios.post('/lawAid/lawAidInfo/user')
}

export const getLawAidInfoUserById=(userId)=>{
    return axios.get(`/lawAid/lawAidInfo/user/${userId}`)
}


export const getRecommendUni=async ()=>{
    return axios.post('/lawAid/recommend/universities')
}

export const userApplyUniLawAid= (obj)=>{
    const {uniId} =obj
    return axios.post('/lawAid/apply/university',{
        uniId
    })
}

export const getUniLawAidInfo=()=>{
    return axios.get('/lawAid/university/info')
}


export const uniAcceptLawAid=(obj)=>{
    return axios.post('/lawAid/university/accept',obj)
}


export const remindUser=(youfaMail)=>{
    return axios.post('/lawAid/remind/user',youfaMail)
}