<template>
    <div @click="$router.push('/')" class="ml-10 cursor-pointer  ">
        <el-image :style="{width:width,height:height}" :src="logoApi" />
    </div>
</template>

<script setup>
import { loadLogo } from '@/api/quiz.js'

const logoApi = loadLogo
defineProps({
    width:{
        type:String,
        default:'65px',
    },
    height:{
        type:String,
        default:'65px',
    },
})
</script>

<style scoped>
.ml-10.cursor-pointer {
    margin-left: 100px;
}
</style>