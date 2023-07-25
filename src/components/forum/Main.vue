<template>
    <div class="con">
        <el-tabs class="demo-tabs" v-model="activeName" @tab-change="handleClick">
            <el-tab-pane label="最新" name="/forum/article/get/new/pages"></el-tab-pane>
            <el-tab-pane label="最老" name="/forum/article/get/pages"></el-tab-pane>
        </el-tabs>
        <div class="main-content">
            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto" :infinite-scroll-disabled="disabled">
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
    </div>
</template>

<script  setup>
import { ref } from 'vue';
import service from '../../axios'
import router from '@/router';
let page = 0;
let activeName = ref('/forum/article/get/new/pages');
let items = ref([]);
const disabled = ref(false)
const handleClick = () => {
    page = 0;
    items.value = [];
    load()
}
const load = () => {
    disabled.value = true;
    service.get(activeName.value + "?page=" + page).then(res => {
        if (res.data.data.length != 0) {
            page += 1;
            disabled.value = false;
            console.log(res.data.data);
            items.value = items.value.concat(res.data.data)
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
            title: item.title,
            content: item.content
        }
    })
}
</script>
<style scoped>
.con {
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