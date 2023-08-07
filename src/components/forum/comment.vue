<template>
  <div class="comment_con">
    <div class="comment-left">
      <div class="avatar">
        <el-avatar shape="circle" :src="cmt.user.avatar" />
      </div>
    </div>
    <div class="comment">
      <div class="comment-header">
        <p> {{ cmt.user.email }} </p>
        <el-button type="danger" size="small" @click="deleteComment($event)">删除</el-button>
      </div>
      <p class="comment-body font_black">
        {{ cmt.content }}
      </p>
      <div class="comment-footer">
        <div class="buttons">
          <div class="icon_box">
            <el-button size="small" @click="likeComment($event)" :color="cmt.likeColor">
              <el-icon size="small">
                <el-icon>
                  <Sugar />
                </el-icon>
              </el-icon>
              <span>{{ cmt.like }}</span>
            </el-button>

            
            <el-button size="small" @click="changeOpenSecondCommentArea($event)">
              <el-icon size="small">
                <el-icon>
                  <el-icon><ChatLineSquare /></el-icon>
                </el-icon>
              </el-icon>
              <span>{{ cmt.secondComments.length }}</span>
            </el-button>
            
            <el-button size="small" @click="changeOpenEditorArea($event)">
              <el-icon size="small">
                <el-icon>
                  <el-icon><EditPen /></el-icon>
                </el-icon>
              </el-icon>
            </el-button>
          </div>
          <div>{{ formatTime(cmt.createTime) }}</div>
        </div>
        <br>
        <div class="my_second_comment" v-show="cmt.openEditor">
          <el-input v-model="cmt.secondComment" autosize type="textarea" />
          <div class="publish_button_box">

            <el-button type="primary" class="publish_comment" @click="publishSecondComment($event)" round>发布</el-button>
          </div>
        </div>
        <div class="second_comment" v-if="cmt.openSecondComment">
          <el-scrollbar>
            <div v-for="(scmt, index) in cmt.secondComments" :key="index" class="scrollbar-demo-item">
              <Scmt :secondComment="scmt" @deleteSecondComment="deleteSecondComment" @publishReply="publishReply" />
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import service from '@/axios';
import { Comment, SecondComment, UserInfo } from '@/entity/forum';
import Scmt from '@/components/forum/secondComment.vue'
import { PropType, onBeforeMount, reactive, toRefs } from 'vue';
import { buttonReset, formatTime } from '@/composable/utils'
import { notif } from '@/composable/utils'
const emits = defineEmits(['deleteComment'])

const { comment, me } = defineProps({
  comment: Object as PropType<Comment>,
  me: Object as PropType<UserInfo>,
});
const cmt = reactive<Comment>(JSON.parse(JSON.stringify(comment)));


cmt.openEditor = false;
cmt.openSecondComment = false;
cmt.secondComment = '';
cmt.likeColor = '';


onBeforeMount(async () => {
  cmt.likeColor = await checkLikeComment()
})


const deleteSecondComment = async (scmt: SecondComment) => {  // 删除评论

  await service.post(`forum/second/comment/delete?id=${scmt.id}`)
  const index = cmt.secondComments.findIndex(e => e != scmt)
  if (index != -1) {
    cmt.secondComments.splice(index, 1)
  }
}


const publishSecondComment = async (e: any) => { // 发布二级评论
  
  if (cmt.secondComment == '') {
    notif("评论内容为空噢~", 'error')
    return
  }
  const newScmt = {
    user: { userId: me?.userId }, // 发布时用户id
    cmtId: cmt.id,
    content: cmt.secondComment,
    like: 0,
    createTime: new Date(),
    updateTime: new Date()
  }


  const res = await service.post('/forum/second/comment/publish', newScmt)
  cmt.secondComments.push(res.data.data)  // 返回值插入
  cmt.openEditor = false
  buttonReset(e)

}

const publishReply = (reply: SecondComment) => {
  cmt.secondComments.push(reply)  //二级评论添加回复
}

const changeOpenSecondCommentArea = (e: any) => { // 打开二级评论区
  buttonReset(e)
  
  cmt.openSecondComment = !cmt.openSecondComment
}

const changeOpenEditorArea = (e: any) => {  // 打开编辑区
  buttonReset(e)
  cmt.openEditor = !cmt.openEditor
}


const likeComment = async (e: any) => {  // 点赞
  if (cmt.likeColor != 'red') {
    await service.post(`/forum/comment/like?id=${cmt.id}`)
    cmt.like++;
    cmt.likeColor = 'red'
  } else {
    await service.post(`/forum/comment/unlike?id=${cmt.id}`)
    cmt.like--
    cmt.likeColor = undefined
  }
  buttonReset(e)
}
const checkLikeComment = async () => { // 检查是否点赞
  const res = await service.get(`forum/comment/check/like?id=${cmt.id}`)
  if (res.data.data) {
    return 'red'
  }
}
const deleteComment = (e: any) => {  // 删除评论
  emits('deleteComment', cmt)
  buttonReset(e)
}

</script>

<style scoped>
.my_second_comment {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  width: 100%;
}
.comment-header {
  display: flex;
  justify-content: space-between;
}

.second_comment {
  width: 100%;
}

.scrollbar-demo-item {
  width: 100%;
}

.comment_con {
  display: flex;
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
  margin: 10px;
  margin-right: 0;
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
  margin-top: 10px;
  flex: 1;
}</style>