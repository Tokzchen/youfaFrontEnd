<template>
  <div></div>
</template>
<script setup>
import {ref,reactive, onMounted} from 'vue'
import {notif} from '@/composable/utils'
const ws=ref(null)
const url=ref('ws://127.0.0.1:7071/api/websocket/mail/')
const toClose=ref(false)
const msgCache=ref([])
const getConnection=(token)=>{
    ws.value=new WebSocket(url.value+token)
}

const WebSocketInit=()=>{
    //监听是否连接成功
    ws.value.onopen = function () {
        console.log('ws连接状态：' + ws.value.readyState);
        //连接成功则发送一个数据
    }
    // 接听服务器发回的信息并处理展示
    ws.value.onmessage = function (me) {
        console.log('接收到来自服务器的消息：'+me.data);
        console.log(me.data);
        emits('received',me.data)
        msgCache.value.push(me.data)
    }
    // 监听连接关闭事件
    ws.value.onclose = function (e) {
        // 监听整个过程中websocket的状态
        //打印断开连接的原因:
        if(toClose.value==false){
            console.log('好像是异常断开服务器连接，重新连接中')
            //不素主动想断开连接，而是其他原因导致连接断开
            ws.value.getConnection()
            if(ws.value.readyState!=1){
                notif('网络异常，重新连接服务器失败','error')
            }
        }
        console.log(e)
        console.log('websocket断开:'+e.code+' 断开原因:'+e.reason+'whole：'+e)
        console.log('ws连接状态：' + ws.value.readyState);
    }
    // 监听并处理error事件
    ws.value.onerror = function (error) {
        console.log(error);
    }

}

const closeConnection=()=>{
    toClose.value=true
    if(ws.value!=null){
        //主动关闭websockt连接
        ws.value.close()
    }
}

const sendObjectMessage=(obj)=>{
    WebSocketServer.ws.send(JSON.stringify(obj))

}

defineExpose({
    ws,
    getConnection,
    WebSocketInit,
    sendObjectMessage,
})


const emits=defineEmits(['received'])
onMounted(() => {
  toClose.value=false  
})

</script>


