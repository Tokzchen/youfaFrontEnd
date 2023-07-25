<template>
    <div class="h-screen w-screen flex items-center justify-center">
        <div class="infoBox pb-8 min-h-11/12 w-3/4 flex flex-col items-center rounded bg-light-50 rounded">
            <div class="w-full mt-3 mb-5">
                <el-row>
                    <el-col :span="8" :offset="0">
                        <div class="flex flex-col h-full items-center justify-center">
                            <el-upload v-if="hasNoAvatar"
                             ref="uploadRef"
                              class="upload-demo"
                              :headers="headerObj"
                              :on-success="onUploadSuccess"
                              :on-error="onUploadError"
                                action="http://127.0.0.1:7071/api/university/avatarUpload" :auto-upload="true">
                                <el-tooltip v-if="hasNoAvatar" class="box-item" effect="dark" content="点击上传头像" placement="right-end">
                                    <el-avatar icon="el-icon-user-solid"
                                        class="w-35 h-35 mt-15 cursor-pointer hover:bg-gray-400" shape="circle" :src="avatarUrl"
                                        fit="fill">
                                    </el-avatar>
                                </el-tooltip>
                            </el-upload>
                            <span class="text-2xl font-semibold mt-3">山河大学</span>
                        </div>
                    </el-col>
                    <el-col :span="16" :offset="0">
                        <div class="flex justify-around item-center h-40">
                            <el-card shadow="never" :body-style="{ padding: '20px' }"
                                class="flex items-center justify-center min-w-35 mt-20 min-h-30 bg-blue-100">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span>Num</span>
                                    <span>desc</span>
                                </div>
                            </el-card>
                            <el-card shadow="never" :body-style="{ padding: '20px' }"
                                class="flex items-center justify-center min-w-35 mt-20 min-h-30 bg-blue-300">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span>Num</span>
                                    <span>desc</span>
                                </div>
                            </el-card>
                            <el-card shadow="never" :body-style="{ padding: '20px' }"
                                class="flex items-center  justify-center min-w-35 mt-20 min-h-30 bg-blue-200">
                                <div class="flex flex-col justify-center items-center h-full">
                                    <span>Num</span>
                                    <span>desc</span>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="w-full bg-light-50">
                <div class="recommendBox flex items-center justify-around mt-10">
                    <div v-for="(item, index) in recommendList" :key="index"
                        class="singleRecommend flex flex-col items-center">
                        <el-card class="cursor-pointer w-80 bg-blue-100 " shadow="hover">
                            <div class="flex justify-center"><el-avatar icon="el-icon-user-solid" class="h-20 w-20"
                                    shape="square" :src="null" fit="fill"></el-avatar></div>
                            <div v-for="(item, index) in rows" :key="index" class="w-full flex items-center justify-around">
                                <div class="text-lg font-medium" v-for="(a, index) in item" :key="index">
                                    info
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
import { ref, reactive,computed,onMounted } from 'vue'
import {notif} from '@/composable/utils.js'
import {getToken} from '@/composable/auth.js'
import { getAvatar } from '@/api/university';
const headerObj=reactive({
    token:getToken(),
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
