<template>
    <div class="con">
        <Logo></Logo>
        <Search></Search>
    </div>
</template>

<script setup>
import Logo from '../Logo.vue'
import Search from './Search.vue'

</script>

<style scoped>
.con {
    display: flex;
    align-items: center;
    height: 100%;
}
</style>