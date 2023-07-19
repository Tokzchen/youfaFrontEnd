<template >
    <div class="bg-blue-50 min-h-screen min-w-screen flex items-center justify-around">
        <div class="min-w-1/2">
            <el-card shadow="never" :body-style="{ padding: '20px' }">
                <div class="pageHeader flex">
                    <el-avatar icon="el-icon-user-solid" size="large" shape="circle" :src="src" fit="fill"></el-avatar>

                    <div class="flex flex-col justify-center ml-3">
                        <div class="flex items-center">
                            <div class="text-lg font-semibold">{{ userInfo.username }}</div>
                            <el-icon v-if="userInfo.gender=='male'" class="text-blue-500 text-lg ml-1"><Male /></el-icon>
                            <el-icon v-if="userInfo.gender=='female'" class="text-pink-500 text-lg ml-1"><Female /></el-icon>
                        </div>
                        <div class="text-xs">好友 {{userInfo.friendsCnt}} &nbsp; &nbsp;粉丝 {{userInfo.fansCnt}}</div>
                    </div>

                </div>
                <div class="sec-Header flex justify-between items-center mt-8">
                    <div>
                        <div class="text-xl font-semibold">{{userInfo.area}}</div>
                        <div class="text-center text-sm">求助领域</div>
                    </div>
                    <div>
                        <div class="text-xl font-semibold">{{userInfo.collageInTouch}}</div>
                        <div class="text-center text-sm">关联大学</div>
                    </div>
                    <div>
                        <div class="text-3xl font-semibold text-center">{{userInfo.helpsCnt}}</div>
                        <div class="text-center text-sm">我的求助</div>
                    </div>
                    <div>
                        <div class="text-3xl font-semibold text-center">{{userInfo.postCnt}}</div>
                        <div class="text-center text-sm">我的帖子</div>
                    </div>

                </div>

            </el-card>
            <el-card shadow="hover" :body-style="{ padding: '20px' }">

                this space is reserved for ads...
            </el-card>
            <div class="flex justify-between bg-white">
                <el-card shadow="hover" class="cursor-pointer bg-blue-100" v-for="(item, index) in items" :key="index" :body-style="{ padding: '20px' }">
                    <div class="flex items-center  ">
                        <i v-if="item.name == '优法社区'" class="iconfont icon-group text-4xl text-blue-500 font-bold mx-1"></i>
                        <i v-if="item.name == '高校法援'" class="iconfont icon-school text-2xl text-blue-500 font-bold mx-1"></i>
                        <i v-if="item.name == '专业律师'" class="iconfont icon-lawyer text-3xl text-blue-500 font-bold mx-1"></i>
                        <i v-if="item.name == '诉求测评'" class="iconfont icon-quiz-slim text-3xl text-blue-500 font-bold mx-1"></i>
                        <div class="flex flex-col items-center ml-1">
                            <span class="font-semibold text-gray-500">{{ item.name }}</span>
                            <span class="text-gray-500">{{ item.desc }}</span>
                        </div>
                    </div>

                    <!-- card body -->
                </el-card>

            </div>

            <el-card shadow="always" :body-style="{ padding: '20px' }">
                
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
            </el-card>





        </div>
        
    </div>
</template>
<script setup>
import { ref,reactive } from 'vue'
import { MoreFilled ,WarningFilled} from '@element-plus/icons-vue'

const userInfo=reactive({
    username:'默认用户',
    friendsCnt:18,
    fansCnt:18,
    gender:'male',
    helpsCnt:2,
    collageInTouch:'山河大学',
    postCnt:3,
    area:'民间借贷'

})
const items = [
    { name: '优法社区', desc: '找队友' },
    { name: '高校法援', desc: '免费求助' },
    { name: '专业律师', desc: '一对一解答' },
    { name: '诉求测评', desc: '了解维权进度' }]


const activities = [
    {
        content: '目前所处位置',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        hollow:true,
        type:'primary',
    },
    {
        content: '维权过程发生意外',
        timestamp: '2018-04-03 20:46',
        size:'large',
        color: '#DC143C',
        icon:WarningFilled,
    },
    {
        content: '一般维权过程',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        color:'#0bbd87',
    },
    {
        content: '一般维权过程',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        color:'#0bbd87'
    },
    {
        content: '一般维权过程',
        timestamp: '2018-04-03 20:46',
        size: 'large',
        color:'#0bbd87'
    },
]


</script>
<style ></style>