import { ElNotification, ElMessageBox, ElMessage } from "element-plus";
import server from '@/axios';
export function notif(message, type) {
    ElNotification({
        title: '通知',
        message,
        type,
        duration: 1500,
        showClose: false,
    })
}

export function confirmDec(content = '提示内容', type, title = '') {
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

export function elMsg(msg, type = 'info', callback) {
    ElMessage({
        message: msg,
        type,
        duration: 2000,
        onClose: () => {
            if (callback) {
                callback()
            }
        }
    })
}
export async function  getQiniuToekn() {
    let token = '';
    await server.get('/qiniu/get/token').then(
        res => {
            token = res.data.data;
        }, err => {
            console.log(err);
        })
    return token;
}
export function buttonReset (e){ // 按钮按下，鼠标离开时回复原有样式(针对el-button)
    let target = e.target;
    if (target.nodeName == "SPAN") {
      target = e.target.parentNode;
    }
    target.blur(); // 按钮样式
}
 export function formatTime (time){
    const date = new Date(time);
    console.log(date);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }