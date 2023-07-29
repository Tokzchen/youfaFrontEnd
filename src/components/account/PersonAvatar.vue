<template>
    <el-upload  ref="uploadRef" class="upload-demo" :headers="headerObj" :on-success="onUploadSuccess"
        :on-error="onUploadError" action="http://127.0.0.1:7071/api/user/avatarUpload" :auto-upload="true">
        <el-tooltip  class="box-item" effect="dark" content="点击上传头像" placement="right-end">
            <el-avatar size="large" icon="el-icon-user-solid" class=" cursor-pointer hover:bg-gray-400" shape="circle"
                :src="avatarUrl" fit="fill">
            </el-avatar>
        </el-tooltip>
    </el-upload>
</template>

<script setup>
import {ref,reactive,onMounted} from 'vue'
import { getToken } from '@/composable/auth.js'
import { getUserInfos } from '@/api/account.js'
import QiniuUpload from '../QiniuUpload.vue'
const uploadRef=ref(null)
const headerObj = reactive({
    token: getToken(),
})
const avatarUrl=ref(null)
//上传的两个钩子
const onUploadSuccess = (res, file, fileList) => {
    
    if (res.flag) {
        notif('上传成功', 'success')
        //更新avatar和相关信息
        avatarUrl.value = res.data
    } else {
        notif('上传失败，请联系人工客服解决', 'error')
    }

}
const onUploadError = (res, file, fileList) => {
    notif('上传失败,请联系人工客服解决', 'error')

}
onMounted(() => {
    //挂载完之后，获取头像,用户名等其他信息
    getUserInfos()
        .then(res => {
            
            if (res.data.flag) {
                avatarUrl.value = res.data.data.avatar
            }
        })
        .catch(err => {

        })
        
    })

</script>

<style  scoped></style>
