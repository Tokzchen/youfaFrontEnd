<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Logo></Logo>
        <div class="search">
          <el-input v-model="key" class="input-with-select">
            <template #append>
              <el-button @click="handleClick" :icon="Search" />
            </template>
          </el-input>
        </div>
        <div class="avatar">
          <el-avatar :src="avatarUrl" />
        </div>
      </el-header>
      <hr>
      <el-container>
        <el-aside width="300px">
          <SideBar></SideBar>
        </el-aside>
        <el-main>
          <el-tabs class="demo-tabs" v-model="sortTag" @tab-change="handleClick">
            <el-tab-pane label="最新发布" name="1"></el-tab-pane>
            <el-tab-pane label="最晚发布" name="2"></el-tab-pane>
            <el-tab-pane label="最多访问" name="3"></el-tab-pane>
            <el-tab-pane label="最多赞同" name="4"></el-tab-pane>
          </el-tabs>
          <div class="main-content">
            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto"
              :infinite-scroll-disabled="disabled">
              <li v-for="item in items" :key="item.id" class="infinite-list-item" @click="jump(item)">
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="content-footer">
                  <div class="like_icon"> 
                    <el-icon><Lollipop /></el-icon>
                    &nbsp;
                    <span>{{item.like}}</span>
                  </div>
                  <span>{{ formatTime(item.updateTime) }}</span>
                </div>
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Logo from '@/components/Logo.vue'
import { getAvatar } from '@/api/account';
import SideBar from "@/components/forum/sideBar.vue";
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import {formatTime} from '@/composable/utils';
import service from '@/axios'
import router from '@/router';
const id = ref('');
const otherValue = ref('');
const sortTag = ref('1');
const key = ref('');
const path = ref('');
const items = ref([]);
const avatarUrl = ref('')
const disabled = ref(false)
const handleClick = () => {
  items.value = [];
  id.value = '';
  otherValue.value = '';
  load();
  console.log("handCCC");
}

const load = () => {
  disabled.value = true;
  if (id.value == '') {
    path.value = "/forum/article/get/my/pages?" + "flag=" + sortTag.value + "&key=" + key.value;
  } else {
    path.value = "/forum/article/get/my/pages?" + "flag=" + sortTag.value + "&id=" + id.value + "&otherValue=" + otherValue.value + "&key=" + key.value;
  }
  service.get(path.value).then(res => {
    const data = res.data.data;
    if (data.articles.length != 0) {
      disabled.value = false;
      items.value = items.value.concat(data.articles);
      otherValue.value = data.sort[0];
      id.value = data.sort[1];
      if (items.value.length < 10) {
        load();
      }
    }
  }, err => {
    console.log(err);
  })
}
const jump = (item) => {
  router.push({
    name: 'ForumReaderPage',
    params: {
      id: item.id 
    }
  })
}
onMounted(async () => {
  //挂载完之后，获取头像
  avatarUrl.value = await getAvatar()
  console.log(avatarUrl.value);
  

})
</script>

<style scoped>
.like_icon{
  display: flex;
  align-items: center;
}
.avatar {
  margin-right: 100px;
  width: 50px;
  height: 50px;
}

.common-layout,
.el-container {
  height: 100%;
}

.el-header {
  background-color: rgb(255, 255, 255);
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.search {
  margin: 0;
  width: 400px;
  margin-left: 100px;
}

.el-main {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.main-content {
  height: 100%;
  margin-top: 10px;
}

.infinite-list {
  height: 600px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin: 10px;
  padding: 5px;
  margin-left: 0;
  border-width: 1px;
  border-color: rgb(197, 228, 255);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}

.title {
  width: 100%;
  flex: 3;
  font-size: 20px;
  line-height: 50px;
  font-weight: 200;
}

.content-footer {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 13px;
  color: rgb(206, 206, 201);
}
</style>