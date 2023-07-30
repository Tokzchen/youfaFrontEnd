<template>
  <div v-show="isShow" class="con">
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
            &nbsp; {{ item.like }}
          </div>
        </el-button>
        <el-button v-if="myEmail == item.email" type="primary" @click='follow'>编辑文章</el-button>
        <el-button v-else-if="!isFollow" type="success" @click='follow'>关注作者</el-button>
        <el-button v-else type="primary" @click="unFollow">取消关注</el-button>
        <el-button type="primary" @click="drawer = true">查看评论</el-button>
        <el-button type="primary" @click='$router.push("/forum")'>返回</el-button>
      </div>
    </div>
    <hr>
    <div class="essay">
      <div class="header">
        <p class="title"> {{ item.title }} </p>
      </div>
      <div class="content">
        <mavon-editor v-model="item.content" :toolbarsFlag='isFalse' :editable="isFalse" :subfield="isFalse"
          :boxShadow="isFalse" defaultOpen="preview" />
      </div>
    </div>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <div class="my_comment">
        <el-input v-model="comment" autosize placeholder="评论一下~~" type="textarea" />
        <el-button type="primary" class="publish_comment" @click="publish" round>发布</el-button>
      </div>
      <el-scrollbar>
        <div v-for="(cmt, index) in item.comments" :key="index" class="scrollbar-demo-item">
          <div class="comment-left">
            <div class="avatar">
              <el-avatar shape="circle" :src="avatarUrl" />
            </div>
          </div>
          <div class="comment">
            <div class="comment-header">
              <p> {{ cmt.email }} </p>
              <el-button type="danger" size="small" @click="deleteComment(cmt.id, $event)">删除评论</el-button>

            </div>
            <p class="comment-body">
              {{ cmt.content }}
            </p>
            <div class="comment-footer">
              <div class="buttons">
                <div>
                  <el-button size="small" @click="likeComment(index, $event)" :color="checkLikeComment(cmt)">
                    <el-icon size="small">
                      <el-icon>
                        <Sugar />
                      </el-icon>
                    </el-icon>
                    <span>{{ cmt.like }}</span>
                  </el-button>

                  <el-button size="small">
                    <el-icon size="small">
                      <el-icon>
                        <el-icon>
                          <ChatLineSquare />
                        </el-icon>
                      </el-icon>
                    </el-icon>
                    <span>{{ cmt.like }}</span>
                  </el-button>
                </div>
                <div>{{ formatTime(cmt.createTime) }}</div>
              </div>


              <div class="second_comments">
                <el-scrollbar >
                  <p v-for="item in 10" :key="item" class="scrollbar-demo-item">{{ item }}</p>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-drawer>

  </div>
</template>

<script setup>

import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";
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
const item = reactive({
  like: 1
})
const isShow = ref(false);
onBeforeMount(async () => {

  const id = route.params.id; // Access route params in Vue 3 with $ prefix
  await service.get(`/forum/article/get?id=${id}`).then(res => {
    const data = res.data.data
    item.id = data.id;
    item.title = data.title;
    item.content = data.content;
    item.email = data.email;
    item.like = data.like;
    item.visited = data.visited;
    item.comments = data.comments;
    item.createTime = data.createTime;
    item.userWhoLikes = data.userWhoLikes;

  })

  const user = await getUserInfos()
  myEmail.value = user.data.data.email
  checkFollow()
  likeArticleColor.value = checkLikeArticle()
  console.log(likeArticleColor);
  avatarUrl.value = await getAvatar()
  isShow.value = true  // 页面加载完之后再展示页面

});
watch(() => item.like, (newValue, oldValue) => {
  likeArticleColor.value = checkLikeArticle()
})

const checkLikeArticle = () => {
  if (item.userWhoLikes.indexOf(myEmail.value) != -1) {
    return 'yellow'
  }
}
const likeArticle = (e) => {
  if (checkLikeArticle(item) != 'yellow') {
    item.like++;
    item.userWhoLikes.push(myEmail.value)
    service.post(`/forum/article/like`, item)
  } else {
    item.like--
    item.userWhoLikes.splice(myEmail.value)
    service.post(`/forum/article/unlike`, item)
    buttonReset(e)
  }
}
const likeComment = (index, e) => {
  const cmt = item.comments[index]
  if (checkLikeComment(cmt) != 'red') {
    cmt.like++;
    cmt.userWhoLikes.push(myEmail.value)
    service.post(`/forum/comment/like?id=${cmt.id}`, item)
  } else {
    cmt.like--
    cmt.userWhoLikes.splice(myEmail.value)
    service.post(`/forum/comment/unlike?id=${cmt.id}`, item)
    buttonReset(e)
  }
}

const checkLikeComment = (cmt) => {
  if (cmt.userWhoLikes.indexOf(myEmail.value) != -1) return 'red'
}
const publish = (e) => { // 发布评论
  buttonReset(e)
  if (comment.value == '') {
    notif("评论内容为空噢~", 'error')
    return
  }
  item.comments.push({
    id: uuidv4(),
    content: comment.value,
    email: "2155507151@qq.com",
    like: 0,
    createTime: new Date().getTime(),
    userWhoLikes: [],
    reply: null
  })
  service.post('/forum/comment/publish', item);
  comment.value = ""
  notif("评论发布成功~", 'success')
}
const deleteComment = (id, e) => {
  buttonReset(e)
  item.comments = item.comments.filter(e => e.id !== id);
  service.post(`/forum/comment/delete?id=${id}`, item);
  notif("删除评论成功~", 'success')
}
const follow = () => {
  service.post('/forum/user/follow' + "?email=" + item.email, {}).then(res => { isFollow.value = true })
}
const unFollow = () => {
  service.post('/forum/user/unfollow' + "?email=" + item.email, {}).then(res => { isFollow.value = false })
}
const checkFollow = async () => {
  await service.get('/forum/user/is/follow' + "?email=" + item.email, {}).then(res => { isFollow.value = res.data.data })
}
const formatTime = (time) => {
  const date = new Date(time);
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
const buttonReset = (e) => {
  let target = e.target;
  if (target.nodeName == "SPAN") {
    target = e.target.parentNode;
  }
  target.blur(); // 按钮样式
}
</script>

<style scoped>
.second_comments .scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.second_comments :deep(.el-scrollbar .el-scrollbar__wrap){
  max-height: 300px;
}
.second_comments .el-scrollbar{
  width: 100%;
}
.second_comments{
  width: 100%;
}
.comment-footer .buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.comment-footer{
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