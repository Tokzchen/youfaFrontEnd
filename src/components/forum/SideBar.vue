<template>
    <div>
        <el-button @click="$router.push(item.path)" v-for="(item, index) in a" :key="index" class="text item">
            <b>{{ item.title }}</b>
        </el-button>
    </div>
</template>

<script setup>
const a = [{
    title: '发布',
    path: '/forum/publish'
}, {
    title: '我的',
    path: '/forum'
}]
</script>

<style scoped>
.text.item {
    margin: 0;

}


.el-button {
    width: 100%;
    height: 60px;
    border: none;
    display: flex;
}

</style>