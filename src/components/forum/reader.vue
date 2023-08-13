<template>
  <div v-if="isShow" class="con">
    <div class="nav">
      <div>
        <Logo></Logo>
      </div>
      <div class="header-button">
        <el-button @click="likeArticle" class="like_article_button" :color="likeArticleColor">
          <el-icon>
            <Lollipop />
          </el-icon>
          <div>
            &nbsp; {{ article.like }}
          </div>
        </el-button>
        <div v-if="me?.userId == article.user.userId">
          <el-button type="primary" @click='update'>编辑文章</el-button>
          <el-button type="danger" @click='deleteArticle'>删除文章</el-button>
        </div>
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
  </div>
</template>

<script setup lang="ts">
import { ForumArticle, UserInfo } from '@/entity/forum'
import { onBeforeMount, onMounted, reactive, ref, toRefs, toRef, watch, PropType } from "vue";
import { buttonReset } from '@/composable/utils'
import Logo from '@/components/Logo.vue'
import service from "@/axios";
import router from '@/router';
const isFollow = ref(false)
let likeArticleColor = ref<string>('')

const emits = defineEmits(["openDrawer"])

const isShow = ref(false);
const isFalse = ref(false);

const props = defineProps({
  article: Object as PropType<ForumArticle>,
  me: Object as PropType<UserInfo>
})
const me = props.me


let article: ForumArticle


onMounted(async () => {

  article = reactive(JSON.parse(JSON.stringify(props.article)));
  await load()

  isShow.value = true  // 页面加载完之后再展示页面

});
const load = async () => {
  await checkFollow()
  await checkLikeArticle()
  console.log();

}
const deleteArticle = async () => {
  await service.post(`/forum/article/delete?id=${article.id}`)
  setTimeout(() => {
    router.push('/forum')
  }, 1000)  // 保证es成功删除到文章

}
const update = async () => {
  router.push({
    name: 'updateArticlePage',
    params: {
      id: article.id
    }
  });
}
const checkLikeArticle = async () => {
  const color = await service.get(`forum/article/check/like?id=${article.id}`)
  if (color.data.data) return likeArticleColor.value = 'yellow'
}
const likeArticle = async (e: any) => {
  article.likeButtonDisabled = true;
  if (likeArticleColor.value != 'yellow') {
    await service.post(`/forum/article/like?id=${article.id}`)
    article.like++;
    likeArticleColor.value = 'yellow'
  } else {
    await service.post(`/forum/article/unlike?id=${article.id}`)
    article.like--
    likeArticleColor.value = ''
  }
  buttonReset(e)
  article.likeButtonDisabled = false
  buttonReset(e)
}


const follow = async () => {

  await service.post('/follow/follow' + "?id=" + article.user.userId, {})
  isFollow.value = true
}
const unFollow = async () => {
  await service.post('/follow/unfollow' + "?id=" + article.user.userId, {})
  isFollow.value = false
}
const checkFollow = async () => {
  const res = await service.get('/follow/check/follow' + "?id=" + article.user.userId, {})
  isFollow.value = res.data.data
}

const openDrawer = (e: any) => {
  emits("openDrawer")
  buttonReset(e)
}
</script>

<style scoped>
.reply .el-button {
  margin: 10px !important;
}

.reply {
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  width: 300px;
}

.my_second_comment {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 10px;
}

.my_second_comment .el-textarea {
  width: 300px;
}

.my_second_comment .el-button {
  margin: 10px !important;
}

.second_comment_left {
  display: flex;
  justify-content: start;
}

.second_comment_avatar .el-avatar.el-avatar--circle {
  width: 30px;
  height: 30px;
  margin: 5px;
}


.second_comments :deep(.el-scrollbar .el-scrollbar__wrap) {
  max-height: 300px;
}

.second_comments .el-scrollbar {
  width: 100%;
}

.second_comments {
  width: 100%;
}

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

.publish_comment {
  margin: 10px;
  margin-right: 0;
  margin-bottom: 0;
}

.el-input {
  width: 385px;
}

.my_comment {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 10px;

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
  height: 600px;
}

.content {
  height: 600px;
}

.shadow.v-note-wrapper.markdown-body {
  height: 100%;
  width: 100%;
}
</style>