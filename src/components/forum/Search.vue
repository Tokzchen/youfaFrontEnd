<template>
    <div class="con">
        <el-input v-model="searchText"  class="input-with-select">
            <template #append>
                <el-button :icon="Search" />
            </template>
        </el-input>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const searchText = ref('')

</script>

<style scoped>
.con {
    margin: 0;
    width:400px;
    margin-left: 400px;
}
</style>