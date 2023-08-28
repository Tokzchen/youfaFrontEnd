<template>
  <MailBox ref="mailBoxRef"/>
</template>

<script setup>
import MailBox from '@/components/account/MailBox.vue';
import {ref,onMounted} from 'vue'
import { getMailCache } from '@/composable/auth';
import { getUserMails } from '@/api/account';
const mailBoxRef=ref(null)
//挂载完后去请求后端获取邮件然后传给子组件
onMounted(()=>{
    //请求后端数据
    //mailBoxRef.value.receiveMails()
    const mailCache=getMailCache()
    if(mailCache!=null){
        console.log(mailCache)
        mailBoxRef.value.receiveMails(mailCache)
    }else{
        getUserMails()
            .then(res=>{
                if(res.data.flag){
                    mailBoxRef.value.receiveMails(res.data.data.youfaMails)
                }
            })
    }
}
)
</script>

<style lang="scss" scoped>
</style>
