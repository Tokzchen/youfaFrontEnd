<template>
  <div class="con">
    <div class="nav">
      <div>
        <Logo></Logo>
      </div>
      <el-button type="primary" @click='$router.push("/forum")'>返回</el-button>
    </div>
    <hr>
    <div class="essay">
      <div class="title">
        {{ title }}
      </div>
      <div class="content">
        <mavon-editor v-model="content" :toolbarsFlag='isFalse' :editable="isFalse" :subfield="isFalse"	defaultOpen="preview" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Logo from '@/components/Logo.vue'
import { onBeforeRouteLeave, useRoute } from "vue-router";
const isFalse = ref(false)
const route = useRoute()
const title = ref('')
const content = ref('')
onMounted(() => {
  const params = route.params
  content.value = params.content;
  title.value = params.title;
  console.log(params);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 100px;

}

.essay {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 100px;
  margin-right: 100px;

}

.title {
  margin: 5px 0px;
  font-size: large;
  text-align: center;
}

.content {
  height: 620px;
}

.shadow.v-note-wrapper.markdown-body {
  height: 100%;
  width: 100%;
}
</style>