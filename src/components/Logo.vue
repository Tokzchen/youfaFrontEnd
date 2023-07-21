<template>
    <div @click="$router.push('/')" class="ml-10 cursor-pointer  ">
        <el-image style="width: 65px; height: 65px" :src="logoApi" :fit="fit" />
    </div>
</template>

<script setup>
import { loadLogo } from '@/api/quiz.js'
const logoApi = loadLogo
</script>

<style scoped>
.ml-10.cursor-pointer {
    margin: 100px;
}
</style>