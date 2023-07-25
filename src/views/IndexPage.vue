<template>
  <div>
    <div class="bg-blue-50">
      <el-row>
        <el-col :span="14" :offset="0">
          <div class="min-h-screen flex flex-col justify-center items-center">
            <span class="text-3xl font-bold">
              优法, 有温度的法律社区
            </span>
            <div class="mb-2 mt-10">
              <el-button type="primary" size="large" class="w-60 min-h-10" @click="$router.push('/university')">
                <span class="text-base font-medium">高校入驻</span>
              </el-button>
            </div>
            <el-divider direction="horizontal" class=" w-3/5 " content-position="center"></el-divider>
            <el-form class="flex flex-col items-center" :model="form" ref="loginFormRef" :rules="rules" :inline="false"
              size="normal">
              <el-form-item prop="email">
                <el-input placeholder="邮箱" size="large" class="w-60 min-h-10" v-model="form.email">
                  <template #prefix>
                    <el-icon>
                      <Message />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input type="password" show-password placeholder="密码" size="large" class="w-60 min-h-10"
                  v-model="form.password">
                  <template #prefix>
                    <el-icon>
                      <Lock />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="flex justify-center items-center ">
                  <div class="flex items-center"> <el-image style="width: 95px; height: 47px" :src="checkCodeUrl"
                      :fit="contain" @click="hanlechangeCheckCode" /></div>
                  <div class="flex items-center"> <el-input class="ml-2 w-40 min-h-10" v-model="form.checkCode"
                      placeholder="请输入验证码" size="large" clearable @change=""></el-input></div>
                </div>
              </el-form-item>
              <el-form-item>

                <el-button size="large" type="primary" class="w-60 min-h-10" @click="handleLogin">
                  <span class="text-base font-medium">立即登录</span>
                </el-button>
              </el-form-item>
            </el-form>

            <div class="flex justify-around w-1/3">
              <span class="text-xs hover:bg-gray-200 cursor-pointer rounded text-blue-500"
                @click="hanleRegistry">没有账号?</span>
              <span class="text-xs hover:bg-gray-200 cursor-pointer rounded text-blue-500"
                @click="handleRePassword">忘记密码？</span>
            </div>


          </div>
        </el-col>
        <el-col :span="10" :offset="0">
          <div class="min-h-screen flex flex-col justify-center">
            <FunctionCard @click="$router.push(item.path)" v-for="(item, index) in moduleName" :key=index class="mb-2">
              <el-row :gutter="20">
                <el-col :span="7" :offset="0" class="flex items-center">
                  <div class="h-18  bg-blue-400 rounded flex items-center justify-center">
                    <i :class= "item.icon"></i>
      
                  </div>

                </el-col>
                <el-col :span="17" :offset="0">
                  <div>
                    <span class="text-sm font-semibold">{{ item.name }}</span>
                    <el-divider class="mt-[5px] mb-[5px]"></el-divider>
                    <span class="text-xs">
                      {{ item.desc }}
                    </span>
                  </div>
                </el-col>
              </el-row>
            </FunctionCard>
          </div>
        </el-col>
      </el-row>

    </div>
    <Dialog :title="currentBussiness" ref="DialogRef">
      <div class="flex  items-center">
        <el-form ref="RegistryOrResetFormRef" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="邮箱" prop="email">
            <el-input class="w-70" size="large" v-model="form.email">
              <template #prefix>
                <el-icon>
                  <Message />
                </el-icon>
              </template></el-input>
          </el-form-item>
          <el-form-item :label="currentBussiness == '立即注册' ? '密码' : '新密码'" prop="password">
            <el-input v-if="currentBussiness == '注册'" class="w-70" size="large" type="password" v-model="form.password">
              <template #prefix>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
            <el-input v-else class="w-70" size="large" show-password type="password" v-model="form.password">
              <template #prefix>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="rePassword" label="确认密码">
            <el-input class="w-70" size="large" show-password type="password" v-model="form.rePassword">
              <template #prefix>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <div class="flex items-center justify-between">
              <el-input class="w-40" size="large" v-model="form.emailCode"></el-input>
              <el-button class="ml-3" type="primary" size="large" @click="hanleSendEmailCode">获取邮箱验证码</el-button>
            </div>

          </el-form-item>
          <el-form-item >
            <div class="flex itemsc-center justify-between">
              <el-button class="w-72 h-10 text-sm" type="primary" size="large" @click="handleResetOrRegistry">{{currentBussiness}}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick,onMounted } from 'vue'
import Dialog from '../components/Dialog.vue';
import FunctionCard from '@/components/FunctionCard.vue'
import { checkCodeApi } from '@/api/quiz.js'
import { useRouter } from 'vue-router'
import { notif } from '@/composable/utils.js'
import { userLogin,sendEmailCode,userRegistry,userResetPwd } from '@/api/account.js';
import Verfify from '@/composable/verify.js'
import { setToken,getToken } from '@/composable/auth';
const checkCodeUrl = ref(checkCodeApi)
const router=useRouter()
const hanlechangeCheckCode = () => {
  checkCodeUrl.value = checkCodeApi + '?time=' + new Date().getTime()
}

const hanleSendEmailCode=()=>{
    sendEmailCode(form)
      .then(res=>{
        if(res.data.flag){
          notif('发送成功','success')
        }else{
          console.log(res.data)
          notif(res.data.msg,'error')
        }
      })
      .catch(err=>{
        console.log(err)
        notif('似乎发生了一些错误','error')
      })
}
const DialogRef = ref(null)
const hanleRegistry = () => {
  currentBussiness.value = '立即注册'
  DialogRef.value.openDialog()

}
const handleRePassword = () => {
  currentBussiness.value = '重置密码'
  DialogRef.value.openDialog()
}
const currentBussiness = ref('')
const handleResetOrRegistry=()=>{
  if(currentBussiness.value=='立即注册'){
    userRegistry(form)
      .then(res=>{
        if(res.data.flag){
          notif('注册成功!','success')
        }else{
          notif(res.data.msg,'error')
        }
      })
      .catch(err=>{
        console.log(err)
        notif('似乎发生了一点错误','error')
      })
      .finally(()=>{
        resetForm()
      })
  }
  else{
    userResetPwd(form)
      .then(res=>{
        if(res.data.flag){
          notif('重置成功!','success')
        }else{
          notif(res.data.msg,'error')
        }
      })
      .catch(err=>{
        console.log(err);
        notif('似乎发生了一点错误','error')
      })
      .finally(()=>{
        resetForm()
      })
  }
}
const form = reactive({
  username: '',
  email: '',
  password: '',
  rePassword: '',
  checkCode: '',
  emailcode: '',
})

const resetForm=()=>{
  form.username=''
  
  form.password=''
  form.rePassword=''
  form.checkCode=''
  form.emailcode=''

}

const loginFormRef=ref(null)

const handleLogin = () => {
  loginFormRef.value.validate(value=>{
    if(value){
      userLogin(form)
    .then(res => {
      if (res.data.flag) {
        notif('登录成功', 'success')
        //将token存储到cookie当中
        console.log('得到的token:'+res.data.data)
        setToken(res.data.data)
        //跳转到测评页
        router.push('/userInfo')
      } else {
        notif(res.data.msg, 'error')
        hanlechangeCheckCode()//刷新验证码
      }
    })
    .catch(err => {
      notif('似乎发生了一些问题', 'error')
      hanlechangeCheckCode()//刷新验证码
    })

    }else{
      return 

    }
  })

}

const functioncard = [1, 2, 3, 4]

const check2password = (rule, value, callback) => {
    if (value) {
        if (value != form.password) {
            callback(new Error(rule.message))
        } else {
            callback()
        }
    }
    else {
        callback()
    }
}


const rules = {
  email: [{
    required: true,
    message: '请输入邮箱',
    trigger: 'blur',
  },
  {
    validator: Verfify.email,
    message: '邮箱的格式不正确哦',
    trigger: 'blur',


  }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      validator: Verfify.password,
      message: '密码至少为8位,包含数字字母和特殊字符',
      trigger: 'blur',
    }

  ],
  rePassword:[
    {
      validator:check2password,
      message:'新旧密码不一致',
      trigger:'blur',
    }
  ]
}

const moduleName=[{
  name:'诉求测评',
  desc:'如果您不知道做些什么，建议先做个测评。',
  path: '/admin',
  icon: "iconfont icon-quiz-slim text-4xl font-bold mx-1",
},{
  name:'高校法援',
  desc:'低成本用法维权，降低您的经济负担。',
  path: '/university',
  icon: "iconfont icon-school text-4xl font-bold mx-1",
},{
  name:'专业律师',
  desc:'一对一咨询帮助，提供最贴心准确的服务。',
  path: '/admin',
  icon: "iconfont icon-lawyer text-4xl font-bold mx-1",
},{
  name:'优法社区',
  desc:'寻找类似经历的伙伴，共同维权。',
  path:'/forum',
  icon: 'iconfont icon-group text-5xl font-bold mx-1'
}]

onMounted(() => {
  if(getToken()!=null&&getToken!=''){
    // router.push('/userInfo')
  }
})

</script>

<style scoped>
:deep(.el-form-item__content) {
  flex: unset
}
</style>
