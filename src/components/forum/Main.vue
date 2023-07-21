<template>
    <div class="con">
        <div class='main-bar'>
            <el-button>综合</el-button>
        </div>
        <div class="main-content">

            <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                <li v-for="i in count" :key="i" class="infinite-list-item" @click="jump">
                    <div class="title">
                        {{ i }}
                    </div>
                    <div class="content-footer">
                        <div>
                            <el-icon>
                                <View />
                            </el-icon>
                            <span> 100 </span>
                        </div>
                        <span>autor</span>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script  setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const count = ref(0)
const load = () => {
    count.value += 2
}
// const item =  接收数据
const router = useRouter();
const jump = () => {
    router.push({
        name: 'ForumReaderPage',
        params: {
            data: '<p>dsdsd<strong>dssds</strong></p><pre class="ql-syntax" spellcheck="false">sdsss',
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
    height: 700px;
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