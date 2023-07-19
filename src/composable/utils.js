import { ElNotification,ElMessageBox,ElMessage } from "element-plus";

export function notif(message,type){
    ElNotification({
        title:'通知',
        message,
        type,
        duration:1500,
        showClose:false,
    })
}

export function confirmDec(content='提示内容',type,title=''){
    //返回promise对象，当点确定会promise.resolve,取消会promose.reject,
    //所以可以通过.then(res=>{})进入到确定的逻辑
    return ElMessageBox.confirm(content,
        title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type,
    })
}

export function elMsg(msg,type='info',callback){
    ElMessage({
        message:msg,
        type,
        duration:2000,
        onClose: ()=>{
            if(callback){
                callback()
            }
        }
    })
}