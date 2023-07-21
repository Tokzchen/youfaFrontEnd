<template>
  <div class="con">
    <div class="nav">
      <Logo></Logo>
      <div class="nav-button">
        <el-button @click='$router.push("/forum")' type="primary">返回</el-button>
      </div>
    </div>
    <hr>
    <div class="editor">
      <QuillEditor ref="quill" :options="options" @ready="ready" />
    </div>
  </div>
</template>
  
<script setup>
import Logo from "../components/Logo.vue";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
const quill = ref();
const options = {  // 自定义quill
  debug: 'error',
  modules: {
    toolbar: false
  },
  readOnly: true,
  theme: 'snow'
}
const route = useRoute();
const ready = () => {  // quill装载完毕
  quill.value.setHTML(route.params.data);
}
</script>
  
<style scoped>
.con {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-button {
  margin-right: 200px;
}
.editor {
  flex: 1;
  margin-left: 100px;
  margin-right: 100px;
}

:deep(.ql-container.ql-snow) {
  border: none !important
}
</style>