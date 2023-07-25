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
        <div>
          <Avatar></Avatar>
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
                  <div>
                    <el-icon>
                      <View />
                    </el-icon>
                    <span> </span>
                  </div>
                  <span>{{ item.email }}</span>
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
import Avatar from '@/components/AvatarClick.vue';
import SideBar from "@/components/forum/SideBar.vue";
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import service from '@/axios'
import router from '@/router';
let id = ref('');
let otherValue = ref('');
let sortTag = ref('1');
let key = ref('');
let path = ref('');
let items = ref([]);
const disabled = ref(false)
const handleClick = () => {
  items.value = [];
  id.value = '';
  otherValue.value = '';
  load();
}

const load = () => {
  if (sessionStorage.getItem("sortTag")) {
    items.value = JSON.parse(sessionStorage.getItem("articles"))
    sortTag.value = JSON.parse(sessionStorage.getItem("sortTag"))
    key.value = JSON.parse(sessionStorage.getItem("key"))
    sessionStorage.removeItem("sortTag")
    sessionStorage.removeItem("articles")
    sessionStorage.removeItem("key")
    return
  }
  disabled.value = true;
  if (id.value == '') {
    path.value = "/forum/article/get/pages?" + "flag=" + sortTag.value + "&key=" + key.value;
  } else {
    path.value = "/forum/article/get/pages?" + "flag=" + sortTag.value + "&id=" + id.value + "&otherValue=" + otherValue.value + "&key=" + key.value;
  }
  service.get(path.value).then(res => {
    const data = res.data.data;
    console.log(data.articles);
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
  sessionStorage.setItem('articles', JSON.stringify(items.value));
  sessionStorage.setItem('key', JSON.stringify(key.value));
  sessionStorage.setItem('sortTag', JSON.stringify(sortTag.value));
  
  router.push({
    name: 'ForumReaderPage',
    params: {
      title: item.title,
      content: item.content,
      email: item.email
    }
  })
}
</script>

<style scoped>
.common-layout,
.el-container {
  height: 100%;
}

.el-header {
  background-color: rgb(255, 255, 255);
  height: 100px;
  display: flex;
  align-items: center;
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
  margin-left: 300px;
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
</style>@/store/forumstore