<template >
    <div class="bg-blue-50 min-h-screen min-w-screen flex items-center justify-around">
        <div class="min-w-1/2 min-h-screen">
            <el-card shadow="never" :body-style="{ padding: '20px' }">
                <div class="pageHeader flex">
                    <el-upload ref="uploadRef" class="upload-demo" :headers="headerObj" :on-success="onUploadSuccess"
                        :on-error="onUploadError" action="http://127.0.0.1:7071/api/user/avatarUpload" :auto-upload="true">
                        <el-tooltip class="box-item" effect="dark" content="点击上传头像" placement="right-end">
                            <el-avatar size="large" icon="el-icon-user-solid" class=" cursor-pointer hover:bg-gray-400"
                                shape="circle" :src="avatarUrl" fit="fill">
                            </el-avatar>
                        </el-tooltip>
                    </el-upload>

                    <div class="flex flex-col justify-center ml-3">
                        <div class="flex items-center">
                            <div class="text-lg font-semibold cursor-pointer hover:bg-gray-200" @click="handleChangeName" >{{ userInfo.username }}</div>
                            <el-icon v-if="userInfo.gender == 'male'" class="text-blue-500 text-lg ml-1">
                                <Male />
                            </el-icon>
                            <el-icon v-if="userInfo.gender == 'female'" class="text-pink-500 text-lg ml-1">
                                <Female />
                            </el-icon>
                        </div>
                        <div class="text-xs">好友 {{ userInfo.friendsCnt }} &nbsp; &nbsp;粉丝 {{ userInfo.fansCnt }}</div>
                    </div>

                </div>
                <div class="sec-Header flex justify-between items-center mt-8">
                    <div>
                        
                        <el-dropdown  trigger="click">
                        <span class="el-dropdown-link">
                            <span class="text-xl font-semibold">{{ userInfo.area }}</span><el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="(item,index) in areas" @click="handleChangeArea(item)">{{item.content}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                        </el-dropdown>
                        <div class="text-center text-sm">求助领域</div>
                    </div>
                    <div>
                        <div class="text-xl font-semibold">{{ userInfo.collageInTouch }}</div>
                        <div class="text-center text-sm">关联大学</div>
                    </div>
                    <div>
                        <div class="text-3xl font-semibold text-center">{{ userInfo.helpsCnt }}</div>
                        <div class="text-center text-sm">我的求助</div>
                    </div>
                    <div>
                        <div class="text-3xl font-semibold text-center">{{ userInfo.postCnt }}</div>
                        <div class="text-center text-sm">我的帖子</div>
                    </div>

                </div>

            </el-card>
            <el-card shadow="hover" :body-style="{ padding: '20px' }">

                this space is reserved for ads...
            </el-card>
            <div class="flex justify-between bg-white">
                <el-card shadow="hover" class="cursor-pointer bg-blue-100" v-for="(item, index) in items" :key="index"
                    :body-style="{ padding: '20px' }">
                    <div class="flex items-center  ">
                        <i v-if="item.name == '优法社区'" class="iconfont icon-group text-4xl text-blue-500 font-bold mx-1"></i>
                        <i v-if="item.name == '高校法援'"
                            class="iconfont icon-school text-2xl text-blue-500 font-bold mx-1"></i>
                        <i v-if="item.name == '专业律师'"
                            class="iconfont icon-lawyer text-3xl text-blue-500 font-bold mx-1"></i>
                        <i v-if="item.name == '诉求测评'"
                            class="iconfont icon-quiz-slim text-3xl text-blue-500 font-bold mx-1"></i>
                        <div class="flex flex-col items-center ml-1" @click="router.push(item.route)">
                            <span class="font-semibold text-gray-500">{{ item.name }}</span>
                            <span class="text-gray-500">{{ item.desc }}</span>
                        </div>
                    </div>

                    <!-- card body -->
                </el-card>

            </div>

            <el-card class="min-h-97" shadow="always" :body-style="{ padding: '20px' }">

                <div class="h-12 text-lg font-semibold">
                    维权进度
                </div>

                <el-timeline>
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
                        :type="activity.type" :color="activity.color" :size="activity.size" :hollow="activity.hollow"
                        :timestamp="activity.timestamp">
                        {{ activity.content }}
                    </el-timeline-item>
                </el-timeline>
                <NotFound v-for="i in [1, 2]" class="mt-15" v-if="activities.length == 0 || activities == null" fontSize="35">
                </NotFound>
            </el-card>





        </div>

    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { MoreFilled, WarningFilled } from '@element-plus/icons-vue'
import { getToken } from '@/composable/auth.js'
import { getUserInfos,changeUserInfos } from '@/api/account.js'
import { getLawAidInfoUser, getLawAidSocialInfoUser1,getLawAidSocialInfoUser2 } from '@/api/lawAid.js'
import NotFound from '@/components/NotFound.vue'
import { useRouter } from 'vue-router'
import{notif} from '@/composable/utils.js'
import{getLawAidArea} from '@/api/quiz.js'
const router = useRouter()
const userInfo = reactive({
    username: '默认用户',
    friendsCnt: 18,
    fansCnt: 18,
    gender: 'male',
    helpsCnt: 2,
    collageInTouch: '山河大学',
    postCnt: 3,
    area: '民间借贷'

})

const headerObj = reactive({
    token: getToken(),
})

const handleChangeArea=(item)=>{
    changeUserInfos({
        area:item.content
    }).then(res=>{
        if(res.data.flag){
            notif('修改成功','success')
        }else{
            notif('修改失败,建议联系客服','error')
        }
    })


}

const avatarUrl = ref(null)
const items = [
    { name: '优法社区', desc: '找队友' },
    { name: '高校法援', desc: '免费求助' },
    { name: '专业律师', desc: '一对一解答' },
    { name: '诉求测评', desc: '了解维权进度', route: '/admin' }]
const areas=ref([])

const activities = ref([
    {
        content: '目前所处位置',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        hollow: true,
        type: 'primary',
        icon: null,
        color: '',
    },
    {
        content: '维权过程发生意外',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        color: '#DC143C',
        icon: WarningFilled,
        type: '',
    },
    {
        content: '一般维权过程',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        color: '#0bbd87',
    },
    {
        content: '一般维权过程',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        color: '#0bbd87'
    },
    {
        content: '一般维权过程',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        color: '#0bbd87'
    },
])


//上传的两个钩子
const onUploadSuccess = (res, file, fileList) => {
    
    if (res.flag) {
        notif('上传成功', 'success')
        //更新avatar和相关信息
        avatarUrl.value = res.data
    } else {
        notif('上传失败，请联系人工客服解决', 'error')
    }

}
const onUploadError = (res, file, fileList) => {
    notif('上传失败,请联系人工客服解决', 'error')

}

//挂载完后去获取用户头像
onMounted(() => {
    //挂载完之后，获取头像,用户名等其他信息
    getUserInfos()
        .then(res => {
            
            if (res.data.flag) {
                avatarUrl.value = res.data.data.avatar
                userInfo.gender = res.data.data.gender == '0' ? 'male' : female
                userInfo.username = res.data.data.username == '' ? '未命名用户' : username
            }
        })
        .catch(err => {

        })

    getLawAidInfoUser()
        .then(res => {
            
            const infoObj = res.data.data
            if (res.data.flag) {
                userInfo.collageInTouch = infoObj.university == '' || infoObj.university == null ? '尚未选择' : res.data.data.university.uniName
                userInfo.helpsCnt = infoObj.lawAidCnt
                userInfo.area = infoObj.currentArea
                const progress = infoObj.progress
                let newActivity = []
                //遍历progress,根据progress生成activities
                if (progress == null || progress.length == 0) {
                    activities.value = []
                    return
                } else {
                    for (i = 0; i < progress.length; i++) {
                        const step = progress[i]
                        let activity = {
                            content: '目前所处位置',
                            timestamp: '2018-04-12 20:46',
                            size: 'large',
                            hollow: true,
                            type: 'primary',
                            icon: null,
                            color: '',
                        }
                        activity.content = step.content
                        activity.timestamp = step.createTime
                        if (step.state == '0') {
                            activity.color = 'DC143C'
                            activity.icon = WarningFilled
                        } else if (step.state == '1') {
                            //成功状态
                            activity.color = '#0bbd87'
                        } else if (step.state == '2') {
                            //处理中状态
                        } else {

                        }
                        newActivity.push(activity)
                    }
                    

                    activities.value = newActivity

                }


            }

        })
        .catch(err => {

        })


    getLawAidSocialInfoUser1()
        .then(res => {
            userInfo.fansCnt=res.data.data.length
        })
    getLawAidSocialInfoUser2()
        .then(res=>{
            userInfo.friendsCnt=res.data.data.length
        })

    getLawAidArea()
        .then(res=>{
            const areaArr=res.data.data
            areas.value=areaArr
        

        })

})

</script>
<style ></style>