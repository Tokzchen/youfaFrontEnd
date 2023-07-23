<template>
  <div class="con">
    <div class="nav">
      <Navibars :publish="publish"></Navibars>
    </div>
    <hr>
    <div class="editor">
      <QuillEditor theme="snow" toolbar="full" v-model:content="content" ref="quill" placeholder="写点什么..."/>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Navibars from "../components/pulish/Navibars.vue";
import { QuillEditor } from "@vueup/vue-quill";
import axios from "axios";
const quill = ref();
let content = ref();
let publish = ref(() => { // 发布保存逻辑
  console.log(quill.value.getHTML());
  axios.post('http://localhost:5306/')
})
</script>

<style scoped>
.con {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav {
  height: 80px;
}

.editor {
  flex: 1;
  margin-left: 100px;
  margin-right: 100px;
}
:deep(.ql-snow) {
  border: none !important
}
</style>