<template>
    <div>
        <input ref="uploadRef" type="file" @change="handleFileSelect">
        <div @click="handleTriggerSelect">
            <slot></slot>
        </div>
        
    </div>
</template>

<script setup>
import * as qiniu from 'qiniu-js'
import { ref } from 'vue'
import { getQiniuToekn } from '@/composable/utils'
import service from '@/axios';
const uploadRef=ref(null)
const selectedFile = ref(null);
const isImage = ref(false);
const domain = 'http://ry95tec7i.hb-bkt.clouddn.com/';
const token=ref('')
const handleTriggerSelect=()=>{
    uploadRef.value.click()
}

const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (file) {
        selectedFile.value = file;

        // Check if the file is an image (optional, you can remove this part if not needed)
        isImage.value = file.type.startsWith('image/');
        if (isImage.value) {
            const date = new Date();
            const key = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + '/' + file.name;
            const res=await service.get('/qiniu/get/token')
            token.value=res.data.data
            console.log(token.value)  
            const observer = {
                complete(res) {
                    setTimeout(() => { }, 100); // 给云端服务器一点时间，防止503                    
                    emit('uploadCompleted',domain+key)
                }
            }
            const observable = qiniu.upload(file, key, token.value, {}, {})
            observable.subscribe(observer)

        }
    }
}
//定义事件，上传完毕后触发，使用该组件的父组件可以监听以获取url
const emit=defineEmits(['uploadCompleted'])

</script>

<style  scoped>
input{
    display: none;
}

</style>
