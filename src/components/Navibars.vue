<template>
  <div class="min-w-screen h-[65px] bg-blue-50 flex">
            <div @click="$router.push('/')" class="ml-10 cursor-pointer  ">
                <el-image style="width: 65px; height: 65px"
                 :src="logoApi" :fit="fit" />
            </div>
            <span class="flex items-center font-semibold ml-2">诉求需求测评</span>
            <div class="ml-5 flex items-center">
                <el-icon size="large" class="mr-1"><Search/></el-icon>
                <el-input v-model="searchContent" placeholder="搜索" size="large" clearable @change=""></el-input>         
            </div>
            <div class="ml-auto flex items-center">
                <div class="flex items-center">
                    <span class="mr-2 font-semibold">用户名</span>
                    <el-avatar icon="el-icon-user-solid" size="default" shape="circle" :src="src" fit="fill"></el-avatar>                   
                </div>
                <div class="flex items-center ml-4 mr-5">
                    <el-dropdown size="large">
                <el-icon size="35" class="hover:bg-blue-gray-300 cursor-pointer rounded">
                  <Menu />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>回复我的</el-dropdown-item>
                    <el-dropdown-item>我收获的点赞</el-dropdown-item>
                    <el-dropdown-item>白嫖党名单</el-dropdown-item>
                    <el-dropdown-item>谁评论了我</el-dropdown-item>
                    <el-dropdown-item>系统消息</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
                </div>
            </div>
        </div>
</template>

<script setup>
import {ref} from 'vue'
import {loadLogo}from '@/api/quiz.js'
const logoApi=loadLogo
const searchContent=ref('')

</script>

<style lang="scss" scoped>
</style>
