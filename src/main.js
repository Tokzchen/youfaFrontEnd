import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/icon/iconfont.css'
//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:windi.css'
import './config/global.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus);
app.use(createPinia())
app.use(router)
app.use(mavonEditor)
app.config.globalProperties.globalProperites={
  
}

app.mount('#app')
