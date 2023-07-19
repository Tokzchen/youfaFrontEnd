<template>
    <div class="h-screen w-screen flex justify-center items-center bg-light-50">

        <el-card class="bg-blue-50 w-3/5 h-4/5 flex justify-center" shadow="never" :body-style="{ padding: '20px' }">
            <div class="text-center text-2xl font-semibold">通过简单的三步，完成高校入驻并认证，轻松加入优法</div>
            <div class="h-5/8 mb-4">
                <el-form v-if="curActive == 0" ref="RegistryOrResetFormRef" size="large"
                    class="flex h-3/4 flex-col items-center mt-12 " :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="学校名称" prop="uniName">
                        <el-input class="w-70" size="large" v-model="form.uniName">
                            <template #prefix>
                                <el-icon>
                                    <Message />
                                </el-icon>
                            </template></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input class="w-70" size="large" v-model="form.email">
                            <template #prefix>
                                <el-icon>
                                    <Message />
                                </el-icon>
                            </template></el-input>
                    </el-form-item>
                    <el-form-item label='密码' prop="password">
                        <el-input class="w-70" size="large" show-password type="password" v-model="form.password">
                            <template #prefix>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="rePassword" label="确认密码">
                        <el-input class="w-70" size='large' show-password type="password" v-model="form.rePassword">
                            <template #prefix>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="验证码">

                        <el-row>
                            <el-col :span="12" :offset="0"><el-input class="w-40" size="large"
                                    v-model="form.emailCode"></el-input></el-col>
                            <el-col :span="12" :offset="0"> <el-button class="ml-3" type="primary" size="large"
                                    @click="hanleSendEmailCode">获取邮箱验证码</el-button></el-col>
                        </el-row>


                    </el-form-item>
                    <el-form-item>
                        <div class="flex itemsc-center justify-between">
                            <el-button class="w-72 h-10 text-sm" type="primary" size="large"
                                @click="handleUniRegistry">下一步</el-button>
                        </div>
                    </el-form-item>
                </el-form>

                <el-upload v-if="curActive == 1" class="upload-demo bg-blue-100 mt-12" drag
                    ref="uploadRef"
                    :headers="headerObj"
                    action="http://127.0.0.1:7071/api/lawAid/verify"
                    :auto-upload="false"
                    :on-success="onUploadSuccess"
                    :on-error="onUploadError"
                     multiple>
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        拖拽或 <em>点击上传</em>
                        <div>上传材料可以是带学院印章的文件，或其他公信材料均可</div>
                    </div>
                </el-upload>
                <div v-if="curActive == 1" class="flex justify-center"><el-button type="primary" size="large"
                        @click="handleUploadSubmit">上传完毕</el-button></div>

                <el-card v-if="curActive == 2" class="flex justify-center items-center h-3/4 mt-12 bg-blue-100" shadow="never"
                    :body-style="{ padding: '20px' }">

                    <div class="flex flex-col justify-center items-center">
                        <el-icon class="text-6xl text-blue-800">
                            <Loading />
                        </el-icon>
                        <span class="mt-4 text-lg font-semibold">目前贵校已可登录，但尚且不能与用户接触</span>
                        <span class="text-lg font-semibold">审核通常需要2-3个工作日，待人工审核完成，会以邮件或电话的形式通知您</span>                        
                    </div>
                </el-card>

                <div v-if="curActive == 2" class="flex justify-center mt-2"><el-button type="primary" size="large"
                        @click="handleLoginAsNonverifiedSchool">以普通用户身份登录</el-button></div>




            </div>
            <div>
                <el-steps class="pl-4" :active="curActive" finish-status="wait" process-status="finish">
                    <el-step v-for="(item, index) in modules" :key="index">
                        <template #icon><el-icon class="text-5xl">
                                <component :is="item.icon"></component>
                            </el-icon></template>
                        <template #title><span class="text-lg">{{ item.name }}</span></template>
                        <template #description><span>{{ item.desc }}</span></template>

                    </el-step>
                </el-steps>
            </div>
        </el-card>


    </div>
</template>

<script setup>
import { Edit, Loading, Upload, UploadFilled } from '@element-plus/icons-vue'
import{useRouter} from 'vue-router'
import{notif} from '@/composable/utils.js'
import{getToken,setToken} from '@/composable/auth.js'
import { reactive, ref } from 'vue'
import {sendEmailCode,uniRegistry} from '@/api/account.js'
import Verfify from '@/composable/verify.js'
const router=useRouter()
//用于上传时使用的请求头
const headerObj=reactive({
    token:getToken(),
})
const curActive = ref(0)
const modules = [
    { name: '申请普通账号', desc: '完成后，您将得到一个普通账户', icon: 'Edit' },
    { name: '上传材料', desc: '完成后，你将获得高校认证', icon: 'UploadFilled' },
    { name: '人工审核', desc: '通常需要2-3个工作日', icon: 'Loading' },
]

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

const form = reactive({
    uniName: '',
    email: '',
    password: '',
    rePassword: '',
    checkCode: '',
    emailcode: '',
})

const hanleSendEmailCode=()=>{
    sendEmailCode(form)
        .then(res=>{
            if(res.data.flag){
                notif('发送验证码成功，可能会有延迟','success')
            }else{
                notif('似乎发生了一些问题','error')
            }

        })
        .catch(err=>{
            notif('似乎发生了一些问题','error')

        })
}
const RegistryOrResetFormRef=ref(null)
const handleUniRegistry=()=>{
    RegistryOrResetFormRef.value.validate(value=>{
        if(value){
            uniRegistry(form)
        .then(res=>{
            if(res.data.flag){
                notif('注册成功','success')
                //注册成功，将token存入本地，并且跳转到下一步
                console.log(res)
                setToken(res.data.data)
                curActive.value++

            }else{
                notif('注册失败，似乎发生了什么问题','error')
            }

        })
        .catch(err=>{
            notif('注册失败，似乎发生了什么问题','error')

        })


        }
    })
    
}

const rules = {
    uniName:[{
       required: true,
       message:'请输入大学名称',
       trigger: 'blur', 
    }],
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
    
    rePassword: [
        {
            validator: check2password,
            message: '新旧密码不一致',
            trigger: 'blur',
        }
    ]
}
const uploadRef=ref(null)
const handleUploadSubmit=()=>{
    uploadRef.value.submit()
}

const onUploadSuccess=(res,file,fileList)=>{
    if(res.flag){
        notif('上传成功','success')
        curActive.value++
    }else{
        
    }

}

const onUploadError=(res,file,fileList)=>{
    notif('上传失败,请联系人工客服解决','error')

}

const handleLoginAsNonverifiedSchool=()=>{
    router.push('/uniInfoPage')

}



</script>

<style  scoped>
:deep(.el-step__icon) {
    @apply bg-blue-50 !important;

}

:deep(.el-card__body) {
    @apply w-9/10;
}

:deep(.el-upload-dragger) {
    @apply bg-blue-100;
}</style>
