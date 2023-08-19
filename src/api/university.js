import axios from '@/axios.js'

export const getAvatar=()=>{
    return axios.post('/university/getAvatar',{})
}

export const getUniInfo=()=>{
    return axios.get('/university/infos')
}

export const updateUniInfo=(obj)=>{
    console.log('进来咯')
    return axios.post('/university/infos/change/uni',obj)
}