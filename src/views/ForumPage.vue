<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Navibars></Navibars>
      </el-header>
      <hr>
      <el-container>
        <el-aside width="300px">
          <SideBar></SideBar>
        </el-aside>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup> 
import { loadLogo } from '@/api/quiz.js'

import  Navibars from "../components/forum/Navibars.vue";
import  SideBar from "../components/forum/SideBar.vue";
import  Main from "../components/forum/Main.vue";
</script>

<style scoped>
    .common-layout, .el-container {
      height: 100%;
    }
    .el-header {
      background-color: rgb(255, 255, 255);
      height: 100px;
    }
    .el-aside {
      background-color: rgb(255, 255, 255);
    }
    .el-main {
      background-color: rgb(255, 255, 255);
    }
    .nav-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  .nav-button {
      margin-right: 200px;
  }
</style>