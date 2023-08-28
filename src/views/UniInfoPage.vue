<template>
    <div class="h-screen w-screen flex items-center justify-center">
        <div class="infoBox pb-8 h-11/12 w-3/4 flex flex-col items-center rounded bg-light-50 rounded">
            <div class="w-full mt-3 mb-5">
                <el-row>
                    <el-col :span="8" :offset="0">
                        <div class="flex flex-col h- full items-center justify-center">
                            <PersonAvatar :pathApi="updateUniInfo" size="100px" />
                            <span class="text-2xl font-semibold mt-3"> {{ lawAidInfoPageUni.uniName }}</span>
                        </div>
                    </el-col>
                    <el-col :span="16" :offset="0">
                        <div class="flex justify-around item-center h-40">
                            <el-card shadow="hover" :body-style="{ padding: '20px' }"
                                class="flex items-center justify-center min-w-35 min-h-35 bg-blue-100">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span class="text-4xl">{{ lawAidInfoPageUni.userConfirmed.length }}</span>
                                    <span>正在处理法援案量</span>
                                </div>
                            </el-card>
                            <el-card shadow="hover" :body-style="{ padding: '20px' }"
                                class="flex items-center justify-center min-w-35  min-h-35 bg-blue-300">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span class="text-4xl">{{ lawAidInfoPageUni.usersToConfirm.length }}</span>
                                    <span>待确认法援申请</span>
                                </div>
                            </el-card>
                            <el-card shadow="hover" :body-style="{ padding: '20px' }"
                                class="flex items-center  justify-center min-w-35  min-h-35 bg-blue-200">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span class="text-4xl">{{ lawAidInfoPageUni.totalLawAids.length }}</span>
                                    <span>历史完成法援案量</span>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="w-full bg-light-50">
                <div class="recommendBox flex items-center justify-around mt-10">
                    <div v-for="(item, index) in lawAidInfoPageUni.usersToConfirm" :key="index"
                        class="singleRecommend flex flex-col items-center">
                        <el-card class="cursor-pointer min-w-80 bg-blue-50 " shadow="hover">
                            <div class="flex justify-around items-center">
                                <el-avatar icon="el-icon-user-solid" class="h-20 w-20" shape="square" :src="item.avatar"
                                    fit="fill">
                                </el-avatar>
                                <div class="flex flex-col items-center">
                                    <div class="text-xl font-semibold">{{ item.username }}</div>
                                    <div class="mt-2">{{ item.area }}</div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="flex">
                                    <span class="w-40">省份：{{ item.province }}</span>
                                    <span class="ml-7">城市：{{ item.city }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-40">电话：<span class="text-xs">{{ item.phone }}</span></span>
                                    <span class="ml-7">邮箱：<span class="text-xs">{{ item.email }}</span></span>
                                </div>
                                <div>
                                    申请日期：<span class="text-xs">{{ item.createTime }}</span>
                                </div>
                                <div class="flex justify-around mt-2">
                                    <el-button type="warning" size="default" @click="handleRejectLawAid">拒绝</el-button>
                                    <el-button type="success" size="default"
                                        @click="handleAcceptLawAid(item)">同意</el-button>
                                </div>

                            </div>
                        </el-card>
                    </div>
                </div>
                <div class="w-full mt-5">
                    <el-button class="float-right mr-7" type="primary" size="default" @click="">
                        <el-icon>
                            <Refresh />
                        </el-icon>
                        <span>换一换</span>
                    </el-button>
                    <el-button class="float-right mr-7" type="primary" size="default" @click="">
                        <el-icon>
                            <MoreFilled />
                        </el-icon>
                        <span>更多</span>
                    </el-button>


                </div>
            </div>
            <div class="mt-3">
                <div class="h-[1px] bg-blue-400 mb-5"></div>
                <div class="text-sm my-3">正在处理法律援助</div>
                <el-table class="bg-blue-100" :data="progress" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="username" label="姓名" width="180" />
                    <el-table-column prop="area" label="援助类型" width="180" />
                    <el-table-column prop="province" label="省份" width="180" />
                    <el-table-column prop="city" label="城市" width="180" />
                    <el-table-column prop="email" label="邮箱" width="180" />
                    <el-table-column prop="status" label="操作" width="180">
                        <template #default="scope">
                            <el-button link type="primary" size="small"
                                @click="handleLawAidDetailed(scope.$index)">详情</el-button>
                            <el-button link type="primary" size="small" @click="handleLawAidOperation(scope.$index)">处理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <Dialog ref="lawAidDialogRef" title="援助进度">
            <div class="w-full h-full">
                <AidProcess :userId="inputUserId" />
            </div>
        </Dialog>
        <Dialog @close="handleDialogClose" ref="lawAidOperationRef" title="处理法律援助">
            <div v-if="!isRouterView" class="flex flex-col items-center justify-center">
                <div class="flex justify-between">
                    <el-button type="primary" size="large" @click="isRouterView=true;routerOption=0">开始电话联系</el-button>
                    <el-button type="primary" size="large" @click="isRouterView=true;routerOption=1">交换联系方式</el-button>
                    <el-button type="primary" size="large" @click="isRouterView=true;routerOption=2">请求交换资料</el-button>
                </div>
                <div  class="mt-7 w-4/5 flex justify-between items-center">
                    <el-input class="w-full" v-model="textarea"
                     :rows="2" type="textarea" 
                     size="large"
                     placeholder="其他操作请在此输入。" />
                     <el-button class="ml-3" type="primary" size="large" @click="">提交其他操作</el-button>                    
                </div>
            </div>
            <el-button class="my-3" v-if="isRouterView" type="primary" size="small" @click="isRouterView=false;routerOption=-1">返回</el-button>
            
            <div v-if="isRouterView">
                <div v-if="routerOption==0">
                    <div class="text-lg font-semibold">
                        &nbsp;&nbsp;{{ computedPhone }}
                    </div>
                </div>
                <div class="text-lg font-semibold" v-if="routerOption==1">
                    &nbsp;&nbsp;已经向用户申请交换联系方式，请留意系统邮箱。
                </div>
                <div class="text-lg font-semibold" v-if="routerOption==2">
                    &nbsp;&nbsp;已经要求用户提交相关资料及进一步说明情况，请留意系统邮箱。
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import PersonAvatar from '@/components/account/PersonAvatar.vue';
import { ref, reactive, computed, onMounted,watch } from 'vue'
import { confirmDec, notif } from '@/composable/utils.js'
import { getToken } from '@/composable/auth.js'
import { getAvatar } from '@/api/university';
import { updateUniInfo } from '@/api/university.js'
import { getUniLawAidInfo, uniAcceptLawAid } from '@/api/lawAid.js'
import Dialog from '@/components/Dialog.vue';
import AidProcess from '@/components/lawAid/AidProcess.vue';
import { remindUser } from '@/api/lawAid.js';
import router from '@/router';
import { Console } from 'windicss/utils';
const lawAidDialogRef = ref(null)
const lawAidOperationRef = ref(null)
const inputUserId = ref(null)
const textarea=ref('')
const isRouterView=ref(false)
const routerOption=ref(-1)
const scopeIndex=ref(-1)
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

watch(()=>routerOption.value,async (newValue,oldValue)=>{
    let youfaMail={
        sender:null,
        receiver:lawAidInfoPageUni.userConfirmed[scopeIndex.value].userId,
        content:null,
        sendTime:formatDate(new Date()),
    }
    if(newValue==0){
        //提醒用户完善资料
        youfaMail.content=
        '你申请的法律援助高校提醒你完善个人资料，\n请在个人信息页面进行资料的填写，\n否则将影响高校联系您'


    }else if(newValue==1){
        youfaMail.content='你申请的高校请求与您交换联系方式，请在聊天页面进行确认。\n确认完毕后将为你与高校生成会话窗口'

    }else if(newValue==2){
        youfaMail.content='你申请的高校需要进一步的资料，请先通过高校联系方式交换，然后向对方发送资料'
    }

   if(newValue!=-1){
    const sendRes=await remindUser(youfaMail)
   if(sendRes.data.flag){
    notif('发送成功','success')
   }else{
    console.log(sendRes)
    notif('连接服务器异常，请联系管理员','error')
   }
}

})
const computedPhone=computed(()=>{
    if(!lawAidInfoPageUni.userConfirmed[scopeIndex.value].phone){
        return '   用户未提交电话信息，待用户填写后将通知您，请留意系统邮箱。'
    }else{
        return lawAidInfoPageUni.userConfirmed[scopeIndex.value].phone
    }
})


const headerObj = reactive({
    token: getToken(),
})

const lawAidInfoPageUni = reactive({
    uniId: null,
    uniName: null,
    totalLawAids: [],
    usersToConfirm: [],
    userConfirmed: [],
    recommendUsers: [],
})

const hasNoAvatar = ref(true)
const infoList = ['1', '2', '3', '4', '5', '6']
const recommendList = [1, 2, 3]
const avatarUrl = ref(null)

const rows = ref(computed(() => {
    let result = []
    for (let i = 0; i < infoList.length; i = i + 2) {
        result.push(infoList.slice(i, i + 2))
    }

    return result
}))

//上传的两个钩子
const onUploadSuccess = (res, file, fileList) => {
    console.log(res)
    if (res.flag) {
        notif('上传成功', 'success')
        //更新avatar和相关信息
        hasNoAvatar.value = false
        avatarUrl.value = res.data
    } else {
        notif('上传失败，请联系人工客服解决', 'error')
    }

}
const onUploadError = (res, file, fileList) => {
    notif('上传失败,请联系人工客服解决', 'error')

}


const progress = ref([])


const tableRowClassName = ({
    row,
    rowIndex,
}) => {
    if (row.status == 'urgent') {

        return 'urgent-row'
    }
    return ''
}

const handleAcceptLawAid = (obj) => {
    confirmDec('确定接受法律援助申请吗?', 'warning', '提示')
        .then(async (res) => {
            const acceptOk = await uniAcceptLawAid(obj)
            if (acceptOk.data.flag) {
                notif('接受成功，请尽快与用户联系', 'success')
            } else {
                notif('ooops', 'error')
                console.log(acceptOk)
            }
        })
}

const handleLawAidDetailed = (index) => {
    scopeIndex.value=index
    lawAidDialogRef.value.openDialog()
    console.log('well...')
    console.log(progress.value[index].userId)
    inputUserId.value = progress.value[index].userId
}

const handleLawAidOperation = (index) => {
    scopeIndex.value=index
    lawAidOperationRef.value.openDialog()
}

const handleDialogClose=()=>{
    routerOption.value=-1
}



onMounted(async () => {
    //挂载完之后，获取头像
    getAvatar()
        .then(res => {
            console.log(res)
            if (res.data.flag) {
                avatarUrl.value = res.data.data

            }
        })

    //获取个人lawAid
    const res1 = await getUniLawAidInfo()
    const realO = res1.data.data
    console.log(realO)
    Object.assign(lawAidInfoPageUni, realO)
    progress.value = realO.userConfirmed
})
</script>

<style  scoped>
:deep(.el-table .urgent-row) {
    @apply bg-red-50;
}

:deep(.el-table) {
    @apply bg-light-50;
}
</style>
