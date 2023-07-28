import axios from '@/axios.js'

export const getLawAidInfoUser=()=>{
    return axios.post('/lawAid/lawAidInfo/user')
}

