<template>
  <div>
    <el-row :gutter="20">
        <el-col :span="9" :offset="0">
            <div class="flex justify-center items-center">
                <Logo></Logo>
                <span class="text-5xl text-blue-500 font-semibold">优法</span>
            </div>
        </el-col>
        <el-col :span="15" :offset="0">
            <div>

            </div>
        </el-col>
    </el-row>
    
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue';

</script>

<style lang="scss" scoped>
</style>
