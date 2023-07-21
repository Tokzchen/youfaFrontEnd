import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/views/IndexPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import PersonInfo from '@/views/PersonInfo.vue'
import CounselTest from '@/views/CounselTest.vue'
import {notif} from '@/composable/utils.js'
import { getToken } from '@/composable/auth'
import UniJoinPage from '@/views/UniJoinPage.vue'
import UniInfoPage from '@/views/UniInfoPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'indexPage',
      component:IndexPage,
      // component:UniJoinPage,
      // component:PersonInfo,
      
      meta:{
        title:'优法',
      },
      children:[
        
      ]
    },
    {
      path:'/admin',
      name:'AdminAdd',
      component:CounselTest,
      meta:{
        title:'测评页面'
      },
      children:[]
    },
   {
    
      path:'/university',
      name:'UniRegistry',
      component:UniJoinPage,
      meta:{
        title:'高校入驻'
      },
      children:[
       
      ]
    
   },
   {
    path:'/uniInfoPage',
    name:'UniInfoPage',
    component:UniInfoPage,
    meta:{
      title:'高校信息页',
    },
    children:[],
   },
   {
    path:'/userInfo',
    name:'UserInfoPage',
    component:PersonInfo,
   }
    
  ]
})

router.beforeEach((to,from,next)=>{
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if(to.path=='/admin'){
    if(getToken()==null){
      notif('请先登录','error')
      return
    }

  }
  next()

})

router.beforeEach((to,from,next)=>{
  if(getToken()!=null&&getToken!=''){
    
  }
  next()

})

export default router