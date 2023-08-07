<template>
  <div class="con">
    <div class="nav">
      <Navibars :publish="publish"></Navibars>
    </div>
    <hr>
    <el-form :model="form">
      <el-form-item required>
        <el-input v-model="form.title" placeholder="请在这里输入标题..." />
      </el-form-item>
      <el-form-item required>
        <mavon-editor v-model="form.content" :scrollStyle="scrollStyle" @imgAdd="imgAdd" @imgDel="deleteImage" ref="md" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {  onMounted, reactive, ref } from "vue";
import Navibars from "../components/pulish/Navibars.vue";
import * as qiniu from 'qiniu-js';
import { getQiniuToekn } from '@/composable/utils'
import service from "@/axios";
import { notif, confirmDec } from '@/composable/utils'
import { useRoute,useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();
const scrollStyle = ref(true)
const form = reactive({
  id:'',
  title: '',
  content: ''
})
onMounted(async ()=>{
  const id = route.params.id
  const res = await service.get(`/forum/article/get?id=${id}`) // 文章信息
  console.log(res);
  const article = res.data.data;
  form.id = article.id
  form.title = article.title
  form.content = article.content
})
const md = ref('')
const isShow = ref(false)
let publish = async () => { // 发布保存逻辑(异步)
  if (form.title == '') {
    confirmDec('为文章写个标题吧~', "error")
  } else if (form.content == '') {
    confirmDec('文章还没有内容~', "error")
  } else {
    service.post('/forum/article/update', form).then(res => {
      setTimeout(() => {
        router.push('/forum')
      }, 500)  // 保证es成功添加到文章
      notif("文章更新成功~", "success")
    }, err => {
      notif("文章更新失败~", "error")
    })
  }

}
const domain = 'http://ry95tec7i.hb-bkt.clouddn.com/';
const imgAdd = async (pos, file) => {
  const date = new Date();
  const key = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + '/' + file.name;
  const token = await getQiniuToekn();
  const observer = {
    complete(res) {
      setTimeout(() => { }, 100); // 给云端服务器一点时间，防止503
      md.value.$img2Url(pos, domain + key);
    }
  }
  const observable = qiniu.upload(file, key, token, {}, {})
  observable.subscribe(observer)
}
const deleteImage = (ar) => {
  const pos = ar[0].replace(domain, '')
  service.post('/qiniu/delete?' + 'key=' + pos, {
  })
}
</script>

<style scoped>
.con {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav {
  height: 80px;
}

.el-form {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 100px;
  margin-right: 100px;

}

.el-form-item:nth-child(1) {
  margin: 0;
}

.el-form-item:nth-child(1) .el-input {
  margin: 5px 0px;
  font-size: large;
}

.el-form-item:nth-child(2) {
  height: 620px;
}

.shadow.v-note-wrapper.markdown-body {
  height: 100%;
  width: 100%;
}
</style>