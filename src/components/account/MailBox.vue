<template>
<el-button class="ml-2 mt-2" type="primary" size="default" @click="router.push('/')">返回首页</el-button>  
<el-row class="mt-2" :gutter="20">
    <el-col :span="8" :offset="0">
        <div class="allMails bg-light-300 flex flex-col w-full h-screen overflow-y-auto">
            <div v-for="(item,index) in youfaMails" 
            class="w-full h-15  flex justify-between border-1 cursor-pointer hover:bg-light-500"
            @click="handleCheckMail(index)">
                <div class="ml-2 flex items-center">
                    <el-icon class="text-xl" v-if="item.checked=='0'"><Message/></el-icon>
                    <el-icon class="text-xl" v-else><MessageBox /></el-icon>
                    <div class="ml-1">{{ item.title }}</div>
                </div>
                <div class="flex items-center mr-2">
                    {{ item.sendTime }}
                </div>
            </div>
        </div>
    
    </el-col>
    <el-col class="bg-light-200" :span="16" :offset="0">
        <div class="mailDetails h-screen overflow-y-auto"> 
            <div class="flex justify-between h-15 items-center">
                <div class="text-xl ml-2 font-semibold">{{ selected.title }}</div>
                <div class="text-2xl mr-4 cursor-pointer hover:bg-light-500"><el-icon><Close/></el-icon></div>
            </div>
            <div class="w-full mb-2 bg-gray-300 h-[0.5px]"></div>
            
            <div>
                <span class="flex flex-col ml-2">
                    <span>发送人: {{ selected.sender==88888?'优法官方':selected.sender }}</span>                 
                    <span class="mt-2">日期: {{ selected.sendTime }}</span>
                    <span class="mt-2">内容: {{ selected.content }}</span>
                    
                </span>
            </div>
            
        </div>
    </el-col>
</el-row>

</template>

<script setup>
import{ref,computed,reactive, toRefs,onMounted}from 'vue'
import {useRouter} from 'vue-router'
import { getMailCache } from '@/composable/auth';
import {checkUsermail}from '@/api/account.js'
const router=useRouter()
const selectedIndex=ref(0)
const handleTest=()=>{
    props.youfaMailsP.value[0].checked='1'
    console.log(props.youfaMailsP.value[0])
}
const youfaMails=ref([{
    sender:888888,
    title:'测试标题',
    receiver:null,
    content:'你好China',
    type:'0',
    checked:'0',
    sendTime:new Date('2023-8-11 14:00').toLocaleString()

},
{
    sender:888888,
    title:'测试标题',
    receiver:null,
    content:'你这是一封测试邮件',
    type:'0',
    checked:'1',
    sendTime:new Date('2023-8-11 14:00').toLocaleString()

}
])

const selected=computed(()=>{
    return youfaMails.value[selectedIndex.value]
})

const handleCheckMail=async (index)=>{
    const previous=youfaMails.value[index].checked
    youfaMails.value[index].checked='1'
    selectedIndex.value=index
    //api
    if(previous=='0'){
        console.log('访问后端服务器修改checked')
       const res= await checkUsermail(youfaMails.value[index].id)
       console.log('res')
    }
}

const receiveMails=(arr)=>{
    youfaMails.value=arr
}

defineExpose({
    receiveMails
})


</script>

<style lang="scss" scoped>
</style>
