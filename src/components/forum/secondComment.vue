<template>
  <div class="second_comment_con">
    <div class="second_comment_left">
      <div class="second_comment_avatar">
        <el-avatar shape="circle" :src="scmt.user.avatar" />
      </div>
    </div>
    <div class="comment">
      <div class="comment-header">
        <p>{{ scmt.user.email }}</p>
        <el-button type="danger" size="small" @click="deleteSecondComment($event)">删除</el-button>
      </div>

      <p v-if="scmt.replyUser == null" class="comment-body content">
        {{ scmt.content }}
      </p>
      <p v-else class="comment-body">
        回复 <span>{{ scmt.replyUser.email }}:&nbsp;</span>
        <span class="content">

          {{ scmt.content }}
        </span>
      </p>


      <div class="comment-footer">

        <div class="buttons">

          <div>
            <el-button size="small" @click="likeSecondComment($event)" :color="scmt.likeColor">
              <el-icon size="small">
                <el-icon>
                  <Sugar />
                </el-icon>
              </el-icon>
              <span>{{ scmt.like }}</span>
            </el-button>

            <el-button size="small" @click="changeOpenReplyArea($event)">
              <el-icon size="small">
         
         
                    <el-icon><EditPen /></el-icon>
         
              </el-icon>
            </el-button>
          </div>
          <div>{{ formatTime(scmt.createTime) }}</div>

        </div>
      </div>
    </div>

  </div>
  <div class="reply" v-show="scmt.openReply">
    <el-input v-model="scmt.reply" autosize type="textarea" />
    <el-button type="primary" @click="publishReply($event)" round>发布</el-button>
  </div>
</template>

<script setup lang="ts">
import service from '@/axios';
import { SecondComment, UserInfo } from '@/entity/forum';
import { PropType, onBeforeMount, reactive, toRefs } from 'vue';
import { buttonReset, formatTime } from '@/composable/utils'
import { notif } from '@/composable/utils'
const emits = defineEmits(['deleteSecondComment', 'publishReply'])

const { secondComment, me } = defineProps({
  secondComment: Object as PropType<SecondComment>,
  me: Object as PropType<UserInfo>,
});
const scmt = reactive<SecondComment>(JSON.parse(JSON.stringify(secondComment)));

scmt.openReply = false,
scmt.reply = '',
scmt.likeColor = '',



onBeforeMount(async () => {
    scmt.likeColor = await checkLikeSecondComment()

  })


const checkLikeSecondComment = async () => {
  const res = await service.get(`forum/second/comment/check/like?id=${scmt.id}`)
  if (res.data.data) {
    return 'red'
  }
}

const changeOpenReplyArea = async (e: any) => {
  buttonReset(e)
  scmt.openReply = !scmt.openReply
}

const publishReply = (e: any) => {
  buttonReset(e)
  if (scmt.reply == '') {
    notif("评论内容为空噢~", 'error')
    return
  }
  const newScmt = {
    user: { userId: me?.userId },
    cmtId: scmt.cmtId,
    content: scmt.reply,
    like:0,
    replyUser: { userId: scmt.user.userId },
    reply: scmt.reply,
    createTime: new Date(),
    updateTime: new Date()
  }

  service.post('/forum/second/comment/publish', newScmt).then(res => {
    emits("publishReply", res.data.data)
    notif("评论发布成功~", 'success')
  })
  scmt.openReply = false
}


const likeSecondComment = async (e: any) => {
  if (scmt.likeColor != 'red') {
    await service.post(`/forum/second/comment/like?id=${scmt.id}`)
    scmt.like++;
    scmt.likeColor = 'red'
  } else {
    await service.post(`/forum/second/comment/unlike?id=${scmt.id}`)
    scmt.like--
    scmt.likeColor = undefined
  }

  buttonReset(e)
}
const deleteSecondComment = (e: any) => {
  service.post(`/forum/second/comment/delete?id=${scmt.id}`).then(res => {
    emits("deleteSecondComment", scmt.id)
    notif("删除评论成功~", 'success')
  })
  buttonReset(e)
}
</script>

<style scoped>

.comment-footer .buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.comment-header {
  display: flex;
  justify-content: space-between;
}
.comment{
  width: 100%;
}
.comment-footer {
  color: rgb(188, 193, 196);
  font-size: small;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

}

.second_comment_con {
  display: flex;
  justify-content: space-between;
}

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
.comment-footer .el-button {
  margin: 5px;
  margin-left: 0;
}
.content{
  color: black;
}

</style>