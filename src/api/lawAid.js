import axios from '@/axios.js'

export const getLawAidInfoUser=()=>{
    return axios.post('/lawAid/lawAidInfo/user')
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
