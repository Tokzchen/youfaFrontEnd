<template>
    <div class="bubble bg-blue-400 flex justify-center items-center" 
    :style="{width:radius*2+'px',height:radius*2+'px',
    borderRadius:radius+'px'}">
        <slot></slot>
    </div>
</template>
  
  <script setup>
  import {ref,reactive}from 'vue'
  defineProps({
    radius:{
        required:false,
        type:Number,
        default:30,
    }
  })
  </script>
  
  <style scoped>
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  .bubble {
     animation-name: float;
     animation-duration:4s;
     animation-iteration-count: infinite;
  }
  </style>