<template>
    <div class="h-screen w-screen flex items-center justify-center">
        <div class="infoBox pb-8 h-11/12 w-3/4 flex flex-col items-center rounded bg-light-50 rounded">
            <div class="w-full mt-3 mb-5">
                <el-row>
                    <el-col :span="8" :offset="0">
                        <div class="flex flex-col h- full items-center justify-center">
                            <PersonAvatar :pathApi="updateUniInfo" size="100px"/>
                            <span class="text-2xl font-semibold mt-3">山河大学</span>
                        </div>
                    </el-col>
                    <el-col :span="16" :offset="0">
                        <div class="flex justify-around item-center h-40">
                            <el-card shadow="hover" :body-style="{ padding: '20px' }"
                                class="flex items-center justify-center min-w-35 min-h-35 bg-blue-100">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span class="text-4xl">{{lawAidInfoPageUni.curLawAid}}</span>
                                    <span>正在处理法援案量</span>
                                </div>
                            </el-card>
                            <el-card shadow="hover" :body-style="{ padding: '20px' }"
                                class="flex items-center justify-center min-w-35  min-h-35 bg-blue-300">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span class="text-4xl">{{lawAidInfoPageUni.lawAidToConfirm}}</span>
                                    <span>待确认法援申请</span>
                                </div>
                            </el-card>
                            <el-card shadow="hover" :body-style="{ padding: '20px' }"
                                class="flex items-center  justify-center min-w-35  min-h-35 bg-blue-200">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span class="text-4xl">{{lawAidInfoPageUni.totalLawAid}}</span>
                                    <span>历史完成法援案量</span>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="w-full bg-light-50">
                <div class="recommendBox flex items-center justify-around mt-10">
                    <div  v-for="(item, index) in recommendList" :key="index"
                        class="singleRecommend flex flex-col items-center">
                        <el-card class="cursor-pointer min-w-80 bg-blue-50 " shadow="hover">
                            <div class="flex justify-around items-center">
                                <el-avatar icon="el-icon-user-solid" class="h-20 w-20"
                                    shape="square" :src="null" fit="fill">
                                </el-avatar>
                                <div class="flex flex-col items-center">
                                    <div class="text-xl font-semibold">陈得柱</div>
                                    <div class="mt-2">民间借贷纠纷</div>
                                </div>
                            </div>
                            <div class="mt-2">
                                <div class="flex">
                                    <span class="w-40">省份：广东</span>
                                    <span class="ml-7">城市：广州</span>
                                </div>
                                <div class="flex">
                                    <span class="w-40">电话：<span class="text-xs">12345678912</span></span>
                                    <span class="ml-7">邮箱：<span class="text-xs">test@qq.com</span></span>
                                </div>
                                <div>
                                    申请日期：<span class="text-xs">2023-8-18</span>
                                </div>
                                <div class="flex justify-around mt-2">
                                    <el-button type="primary" size="default" @click="">详情</el-button>
                                    <el-button type="success" size="default" @click="">选择</el-button>             
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
                <el-table class="bg-blue-100" :data="progress" style="width: 100%" :row-class-name="tableRowClassName">
                    <el-table-column prop="name" label="姓名" width="180" />
                    <el-table-column prop="area" label="援助类型" width="180" />
                    <el-table-column prop="latestOperation" label="最近处理" width="180" />
                    <el-table-column prop="latestOperationTime" label="最近处理时间" width="180" />
                    <el-table-column prop="status" label="状态" width="180" />
                    <el-table-column prop="status" label="操作" width="180">
                        <template #default>
                            <el-button link type="primary" size="small" @click="handleClick">详情</el-button>
                            <el-button link type="primary" size="small">处理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup>
import PersonAvatar from '@/components/account/PersonAvatar.vue';
import { ref, reactive,computed,onMounted } from 'vue'
import {notif} from '@/composable/utils.js'
import {getToken} from '@/composable/auth.js'
import { getAvatar } from '@/api/university';
import {updateUniInfo} from '@/api/university.js'
const headerObj=reactive({
    token:getToken(),
})

const lawAidInfoPageUni=reactive({
    curLawAid:2,
    lawAidToConfirm:4,
    totalLawAid:13
})

const hasNoAvatar=ref(true)
const infoList = ['1', '2', '3', '4', '5', '6']
const recommendList = [1, 2, 3]
const avatarUrl=ref(null)

const rows = ref(computed(() => {
    let result = []
    for (let i = 0; i < infoList.length; i = i + 2) {
        result.push(infoList.slice(i, i + 2))
    }

    return result
}))

//上传的两个钩子
const onUploadSuccess=(res,file,fileList)=>{
    console.log(res)
    if(res.flag){
        notif('上传成功','success')
        //更新avatar和相关信息
        hasNoAvatar.value=false
        avatarUrl.value=res.data
    }else{
        notif('上传失败，请联系人工客服解决','error')      
    }

}
const onUploadError=(res,file,fileList)=>{
    notif('上传失败,请联系人工客服解决','error')

}


const progress = [
    {
        name: 'testUser1',
        latestOperation: '与求助人完成第1次电话通话',
        area: '民间借贷',
        latestOperationTime: '07-03 15:33',
        status: 'normal',

    },
    {
        name: 'testUser2',
        latestOperation: '与求助人完成第1次线上见面',
        area: '民间借贷',
        latestOperationTime: '07-03 15:33',
        status: 'urgent',


    },
    {
        name: 'testUser3',
        latestOperation: '与求助人完成第1次视频通话',
        area: '民间借贷',
        latestOperationTime: '07-03 15:33',
        status: 'normal',
    },
]


const tableRowClassName = ({
    row,
    rowIndex,
}) => {
    if (row.status == 'urgent') {

        return 'urgent-row'
    }
    return ''
}

onMounted(() => {
  //挂载完之后，获取头像
  getAvatar()
     .then(res=>{
        console.log(res)
        if(res.data.flag){
            avatarUrl.value=res.data.data
            
        }
     })

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
