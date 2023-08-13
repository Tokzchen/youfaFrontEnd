<template>
    <div>
        <div class="my_comment">
            <el-input v-model="comment" autosize placeholder="评论一下~~" type="textarea" />
            <el-button type="primary" class="publish_comment" @click="publishComment($event)" round>发布</el-button>
        </div>
        <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
            <li v-for=" (comment, i) in comments" :key="i" class="infinite-list-item">
                <Cmt :comment="comment" :me="me" @deleteComment="deleteComment" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import service from '@/axios.js';
import Cmt from '@/components/forum/comment.vue'
import { Comment, ForumArticle } from '@/entity/forum.ts'
import { PropType, reactive, ref } from 'vue'
import { notif } from '@/composable/utils'
import { buttonReset } from '@/composable/utils'
const comment = ref('')
const { article, me } = defineProps(["article", "me"])
let count = 2
let comments: Comment[] = reactive(article.comments);
const from = 0
const to = 10
const load = async () => {
    // const res = await service.get(`/forum/comment/get/page?id=${article.id}&from=${from}&to=${to}`)
    // comments.push(res.data.data)
}

const deleteComment = async (cmt: Comment) => {  // 删除评论
    await service.post(`forum/comment/delete?id=${cmt.id}`)
    const index = comments.findIndex(e => e != cmt)
    if (index != -1) {
        comments.splice(index, 1)
    }

}

const publishComment = async (e: any) => { // 发布评论
    if (comment.value == '') {
        notif("评论内容为空噢~", 'error')
        return
    }
    const newCmt = {
        user: { userId: me.userId },
        articleId: article.id,
        content: comment.value,
        like: 0,
        secondComments: [],
        createTime: new Date(),
        updateTime: new Date()
    }
    const res = await service.post('/forum/comment/publish', newCmt);
    comments.push(res.data.data) // 添加返回后的数据
    comment.value = ""
    notif("评论发布成功~", 'success')
    buttonReset(e)
}

</script>

<style scoped>
:deep(.el-drawer__header) {
    margin: 0;
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

.infinite-list {
    height: 600px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(249, 248, 250);
    margin: 10px;
    color: var(--el-color-primary);
    border-radius: 10px;
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}
</style>