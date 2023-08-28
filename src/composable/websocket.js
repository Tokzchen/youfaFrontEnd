import { getToken } from "./auth";
import {notif} from './utils.js'

export default class WebSocketServer{
    static ws=null;
    static url='ws://127.0.0.1:7071/api/websocket/mail/';
    static toClose=false

    //获取websocket连接
    static getConnection=(token)=>{
        WebSocketServer.toClose=false
        WebSocketServer.ws=new WebSocket(WebSocketServer.url+token); 
        return WebSocketServer.ws.readyState;
    }
    
    //获取连接状态
    static getConnectionState=()=>{
        if(WebSocketServer.ws==null){
            return null;
        }else{
            return WebSocketServer.ws.readyState;
        }
    }

    static closeConnection=()=>{
        //表明是主动关闭的
        WebSocketServer.toClose=true
        console.log('主动请求关闭websocket连接')
        if(WebSocketServer.ws!=null){
            WebSocketServer.ws.close()
        }
    }

    //初始化:监听事件等
    static WebSocketInit=()=>{
        //监听是否连接成功
    WebSocketServer.ws.onopen = function () {
        console.log('ws连接状态：' + WebSocketServer.ws.readyState);
        //连接成功则发送一个数据
        WebSocketServer.ws.send('test1');
    }
    // 接听服务器发回的信息并处理展示
    WebSocketServer.ws.onmessage = function (data) {
        console.log('接收到来自服务器的消息：');
        console.log(data);
    }
    // 监听连接关闭事件
    WebSocketServer.ws.onclose = function (e) {
        // 监听整个过程中websocket的状态
        //打印断开连接的原因:
        if(WebSocketServer.toClose==false){
            console.log('好像是异常断开服务器连接，重新连接中')
            //不素主动想断开连接，而是其他原因导致连接断开
            WebSocketServer.getConnection()
            if(WebSocketServer.ws.readyState!=1){
                notif('网络异常，重新连接服务器失败','error')
            }
        }
        console.log(e)
        console.log('websocket断开:'+e.code+' 断开原因:'+e.reason+'whole：'+e)
        console.log('ws连接状态：' + WebSocketServer.ws.readyState);
    }
    // 监听并处理error事件
    WebSocketServer.ws.onerror = function (error) {
        console.log(error);
    }

    }

    static sendString=(str)=>{
        WebSocketServer.ws.send(str)
    }

    static sendObject=(obj)=>{
        WebSocketServer.ws.send(JSON.stringify(obj))
    }
    

};