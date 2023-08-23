<template>
  <div v-show="isShow" class="con">
    <div class="nav">
      <div>
        <Logo></Logo>
      </div>
      <div class="header-button">
        <el-button @click="likeArticle" class="like_article_button" :color="likeArticleColor"
          :disabled='article.likeButtonDisabled'>
          <el-icon>
            <Lollipop />
          </el-icon>
          <div>de
            &nbsp; {{ article.like }}
          </div>
        </el-button>
        <el-button v-if="user.userId == article.uid" type="primary" @click='follow'>编辑文章</el-button>
        <el-button v-else-if="!isFollow" type="success" @click='follow'>关注作者</el-button>
        <el-button v-else type="primary" @click="unFollow">取消关注</el-button>
        <el-button type="primary" @click="openDrawer">查看评论</el-button>
        <el-button type="primary" @click='$router.push("/forum")'>返回</el-button>
      </div>
    </div>
    <hr>
    <div class="essay">
      <div class="header">
        <p class="title"> {{ article.title }} </p>
      </div>
      <div class="content">
        <mavon-editor v-model="article.content" :toolbarsFlag='isFalse' :editable="isFalse" :subfield="isFalse"
          :boxShadow="isFalse" defaultOpen="preview" />
      </div>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      
      
    </el-drawer>

  </div>
</template>

<script setup>

import { onBeforeMount, onMounted, reactive, ref, toRefs, toRef, watch } from "vue";
import { getAvatar, getUserInfos } from '@/api/account';
import Logo from '@/components/Logo.vue'
import { useRoute } from "vue-router";
import service from "@/axios";
import { notif } from '@/composable/utils'
import { v4 as uuidv4 } from 'uuid'
const isFollow = ref(false)
const isFalse = ref(false)
const route = useRoute()
const drawer = ref(false)
const avatarUrl = ref('')
const comment = ref('')
const myEmail = ref('')
const likeArticleColor = ref('')
const user = reactive({
  userId: 0,
  username: '',
  gender: '',
  email: '',
  avatar: '',
})
const article = reactive({
  id: 0,
  uid: 0,
  title: '',
  content: '',
  category: '',
  visited: 0,
  like: 0,
  good: 0,
  top: 0,
  createTime: new Date(),
  updateTime: new Date(),
  likeButtonDisabled: false


})
const isShow = ref(false);
onBeforeMount(async () => {

  await load()
  isShow.value = true  // 页面加载完之后再展示页面

});
watch(() => article.like, async (newValue, oldValue) => {
  likeArticleColor.value = await checkLikeArticle()

})
const load = async () => {
  const id = route.params.id;
  await service.get(`/forum/article/get?id=${id}`).then(res => { // 文章数据
    Object.assign(article, res.data.data)
  })

  await service.get(`/user/info/id?id=${article.uid}`).then(res => { // 个人信息
    Object.assign(user, res.data.data)
  })

  await checkFollow() // 检查是否关注

  likeArticleColor.value = await checkLikeArticle() // 检查是否喜欢文章


  avatarUrl.value = user.avatar
  myEmail.value = user.email


}
const openDrawer = async () => {
  await service.get(`forum/comment/get?id=${article.id}`).then(res => {
    com.comments = res.data.data;
    com.comments.forEach(cmt => {
      cmt.openSecondComment = false;
      cmt.openEditor = false,
        cmt.likeColor = undefined
      cmt.secondComment = ''
    })
  })
  for (let index = 0; index < com.comments.length; index++) {
    const cmt = com.comments[index];
    cmt.likeColor = await checkLikeComment(cmt)
    console.log(await checkLikeComment(cmt));
  }
  drawer.value = true;

}







const checkLikeArticle = async () => {
  const color = await service.get(`forum/article/check/like?id=${article.id}`)
  if (color.data.data) return 'yellow'
}
const likeArticle = async (e) => {
  const uuid  = uuidv4();
  // 先发送一个token
  await service.post(`/forum/article/identifies?identifies=${uuid}`)
  article.likeButtonDisabled = true;
  if (likeArticleColor.value != 'yellow') {
    await service.post(`/forum/article/like?id=${article.id}&identifies=${uuid}`).then(res => {
      article.like++;

    })
  } else {
    await service.post(`/forum/article/unlike?id=${article.id}&identifies=${uuid}`).then(res => {
      article.like--
    })
  }
  article.likeButtonDisabled = false
  buttonReset(e)
}



const deleteComment = (id, e) => {
  buttonReset(e)
  com.comments = com.comments.filter(e => e.id !== id);
  service.post(`/forum/comment/delete?id=${id}`).then(res => {
    notif("删除评论成功~", 'success')
  })
}
defineProps

const follow = () => {
  service.post('/follow/follow' + "?id=" + article.uid, {}).then(res => { isFollow.value = true })
}
const unFollow = () => {
  service.post('/follow/unfollow' + "?id=" + article.uid, {}).then(res => { isFollow.value = false })
}
const checkFollow = async () => {
  await service.get('/follow/check/follow' + "?id=" + article.uid, {}).then(res => { isFollow.value = res.data.data })
}

const buttonReset = (e) => { // 按钮按下，鼠标离开时回复原有样式
  let target = e.target;
  if (target.nodeName == "SPAN") {
    target = e.target.parentNode;
  }
  target.blur(); // 按钮样式
}
</script>

<style scoped>

.comment-footer .buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.comment-footer {
  display: flex;
  flex-direction: column;
}

.header-button {
  display: flex;
}

.header-button .el-button {
  margin: 0 10px;
  height: 40px;
}

.comment-footer .el-button {
  margin: 0 10px;
}



.avatar {
  width: 40px;
  height: 40px;
  margin: 5px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  color: rgb(188, 193, 196);
  font-size: small;
}

.comment-body {
  margin: 5px;
  color: black !important;
}

.comment-footer {
  color: rgb(188, 193, 196);
  font-size: small;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

}

.comment-left {
  display: flex;
  align-items: start;
  height: 100%;
  width: 50px;
}

.comment {
  margin: 10px;
  margin-top: 20px;
  flex: 1;
}

.el-drawer {
  display: flex;
  flex-direction: column;
}

.scrollbar-demo-item {
  flex: 1;
  display: flex;
  margin: 10px;
  border-radius: 4px;
  border-width: 1px;
}

.con {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 100px;

}

.essay {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 100px;
  margin-right: 100px;

}

.title {
  width: 100%;
  margin: 5px 0px;
  font-size: xx-large;
  font-weight: 600;
  text-align: center;
}

.header {
  display: flex;
  justify-content: center;
}

:deep(.single-show.v-note-show) {
  height: 610px;
}

.content {
  height: 620px;
}

.shadow.v-note-wrapper.markdown-body {
  height: 100%;
  width: 100%;
}
</style>