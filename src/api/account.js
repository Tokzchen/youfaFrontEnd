import axios from '@/axios.js'

export const userLogin=(options)=>{
    const {userId,email,password,checkCode,} =options
    return axios.post('/user/login',{
        userId,
        email,
        password,
        checkCode,
    })
}

export const sendEmailCode=(options)=>{
    const {email}=options
    return axios.post('/user/sendEmailCode',{
        email,
    })
}

export const userRegistry=(options)=>{
    const {email,password,emailCode}=options
    return axios.post('/user/registry',{
        email,
        password,
        emailCode,
    })
}

export const uniRegistry=(options)=>{
    const {uniName,email,password,emailCode}=options
    return axios.post('/user/uniRegistry',{
        uniName,
        email,
        pwd:password,
        emailCode,
    })
}

export const userResetPwd=(options)=>{
    const {email,password,emailCode}=options
    return axios.post('/user/resetPwd',{
        email,
        password,
        emailCode,
    })
}

export const getUserIdentity=()=>{
    return axios.post('/user/identity')
}