//定义elementplus表单校验的规则
const regs={
    email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    password:/^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{8,}$/,//至少包含一个数字一个字母一个特殊字符，最少为8位
}

const verify=(rule,value,reg,callback)=>{
    if(value){
        if(reg.test(value)){
            
            callback()
        }else{
            
            callback(new Error(rule.message))
        }
    }else{
        callback()
    }
}

export default{
    email: (rule,value,callback) => {
        return verify(rule,value,regs.email,callback);
    },
    password: (rule,value,callback) => {
        return verify(rule,value,regs.password,callback);
    },
}