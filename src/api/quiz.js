import axios from '@/axios.js'

// export const loadLogo='http://47.120.8.89:7071/api/picture/logo.png'
// export const checkCodeApi='http://47.120.8.89:7071/api/user/checkCode'

export const loadLogo='http://127.0.0.1:7071/api/picture/logo.png'
export const checkCodeApi='http://127.0.0.1:7071/api/user/checkCode'

export const userStartSurvey=()=>{
    return axios.get('/survey/start')
}


export const usercontinueSurvey=(config)=>{
    const {ansId}=config
    return axios.post('/survey/continue',{
        ansId,
    })
}

export const getUserResult=()=>{
    return axios.get('/survey/result');
}

export const getLawAidArea=()=>{
    return axios.get('/survey/areas')
}