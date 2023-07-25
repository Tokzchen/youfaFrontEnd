import { defineStore } from 'pinia'
import { ref,reactive, computed } from 'vue'
import{getUserInfos}from '@/api/account.js'
import {notif} from '@/composable/utils.js'
import { setToken,removeToken } from '@/composable/auth.js'

 export default  defineStore('forumstore', {
    state: () => {
        return {
            search: Function,
            key : "key"
        }
    }
})
//尽量将function(对应vue的methods,pinia的action)写成空返回函数，直接return是undefine,实在需要使用回调callback
//ref,reactive-->state computed(()=>{})--->computed function--->methods

export const useUserStore=defineStore('userInfo',{
    state: () => {
        return {
            userInfo:{
                userId:null,
                username:null,
                gender:null,
                birthday:null,
                email:null,
                password:null,
                phone:null,
                province:null,
                city:null,
                lastLoginTime:null,
                lastLoginIp:null,
                issue:null,
                lastUpdateTime:null,
                emailCode:null,
                checkCode:null,
                avatar:null,
                ansId:null,
        
            },

            timerId:null,
        }
    },

    actions:{

        async updateUserInfo(){
            const res=await getUserInfos()
            //不能使用userinfo=reactive(res.data.data)
            Object.assign(this.userInfo,res.data.data)
            console.log('嘿嘿嘿更新完成啦,以下是更新后的userinfo')
            console.log(this.userInfo)       
          },
      
           startTimer() {
              if (this.timerId) {
                clearInterval(this.timerId);
              }         
              // 设置定时器，每隔五分钟执行一次 updateUserInfo 方法
              this.timerId = setInterval(async () => {
                await this.updateUserInfo();
                console.log('执行了定时器')
              }, 15 * 60 * 1000); // 15分钟的毫秒数
            },
          
            stopTimer() {
              clearInterval(this.timerId);
              this.timerId = null;
            },
      
            async initialStore(){
              this.stopTimer()
              await this.updateUserInfo();
              this.startTimer()
            }
    },
    getters:{
        needInitial:(state)=>{
            return state.userInfo.userId==null
        }

    }
})