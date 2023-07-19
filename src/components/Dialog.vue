<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    
  >
     <slot>
    </slot>
    
    
  </el-dialog>
</template>

<script setup>
import{ref} from 'vue'
const dialogVisible=ref(false)
const openDialog= () =>{dialogVisible.value=true;}
const closeDialog= () =>{dialogVisible.value=false;}
defineProps({
    title:{
        required:false,
        type:String,
    },
    width:{
        required:false,
        default:'35%',
        type:String,
    }
})
defineExpose({
    openDialog,
    closeDialog
})
</script>

<style lang="scss" scoped>
</style>
