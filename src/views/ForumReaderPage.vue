<template>
  <div v-if="isShow">
    <div>
      <Reader :article="article" :me="me" @openDrawer="drawer = true" ></Reader>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <CommentArea :article="article" :me="me">

      </CommentArea>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">


import Reader from '@/components/forum/reader.vue'
import CommentArea from '@/components/forum/commentArea.vue'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { ForumArticle, Comment, UserInfo } from '@/entity/forum'
import service from '@/axios'
import { useRoute } from 'vue-router'
import { getUserInfos } from '@/api/account'
const drawer = ref(false)
const route = useRoute()
const isShow = ref(false)

let article: ForumArticle
let me:UserInfo

onBeforeMount(async() => {
  await load()
  
  isShow.value = true
})

const load = async () => {
  const id = route.params.id;
  let res: any
  res = await service.get(`/forum/article/get/complex?id=${id}`) // 文章信息
  article = reactive(res.data.data)
  res = await getUserInfos()
  me = reactive(res.data.data) // 用户信息
  
}
</script>

<style scoped></style> 