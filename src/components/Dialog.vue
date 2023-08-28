<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    @close="handleClose"
    
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
const emits=defineEmits(['close'])
defineExpose({
    openDialog,
    closeDialog
})

const handleClose=()=>{
  emits('close')
}
</script>

<style lang="scss" scoped>
</style>
