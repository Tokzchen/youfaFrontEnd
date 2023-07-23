<template>
    <div class="nav-con">
        <div>
            <Logo></Logo>
        </div>
        <div class="nav-button">
            <el-button @click="props.publish" type="primary">发布</el-button>
            <el-button @click='$router.push("/forum")' type="primary">返回</el-button>

        </div>
    </div>
</template>

<script setup>
import Logo from "../Logo.vue";

const props = defineProps({
    publish: Function
})
</script>

<style scoped>
.nav-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.nav-button {
    margin-right: 200px;
}
</style>