import axios from '@/axios.js'

export const getAvatar=()=>{
    return axios.post('/university/getAvatar',{})
}