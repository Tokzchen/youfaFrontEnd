<template>
    <div class="min-h-screen bg-blue-50 ">
        <Navibars class="fixed  z-50"></Navibars>
        <el-card shadow="never" class="w-3/5 min-h-screen rounded ml-1/5 bg-blue-100" :body-style="{ padding: '20px' }">
            <div class="mt-[65px] flex items-center">
                <el-progress type="dashboard" :stroke-width="12" :percentage="quizProgess">
                    <template #default="{ percentage }">
                        <span class="percentage-value">{{ percentage }}%</span>
                        <span class="percentage-label">测评进度</span>
                    </template>
                </el-progress>
                <div class="text- text-gray-500 ml-5">测评结果均为匿名保存，我们将尽一切努力保护您的信息安全</div>
            </div>
            <div class="min-w-3/5 h-[2px] bg-blue-200 mb-8"></div>

            <div class="flex justify-center items-center pt-8 ">
                <Bubble :radius="160" class="bg-blue-400 hover:bg-blue-300 cursor-pointer transition-all">
                    <div :style="{ textIndent: '1em' }" class="text-light-50 text-xl font-semibold flex items-center p-2">
                        <p>{{ question.content }}</p>
                    </div>
                </Bubble>
                <div class="option_container flex flex-col ml-7 items-center  overflow-y-auto overflow-x-hidden h-60">
                    <el-button v-for="(item, index) in answers" :key="index" class="mb-5 ml-2 w-70 h-15 text-lg"
                        type="primary" size="large" @click="hanleSelectChoice(item.ansId)">{{ item.content }}</el-button>
                </div>
                <div class="ml-3 flex-col sm text-light-50" v-show="false">
                    <div v-show="pageNo > 1" @click="pageNo--" class="pager mb-5">上一页</div>
                    <div v-show="showIfNext" @click="pageNo++" class="pager ">下一页</div>
                </div>
            </div>
        </el-card>
    </div>
    <Dialog ref="dialogRef" class="bg-blue-50">
        <div class="w-full h-full">
            <div class="text-center mb-5">
                <span class="text-xl font-bold">诉求测评结果</span>
            </div>
            <div class="min-h-10 mb-3">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="flex justify-center items-center">
                            <el-icon size="45"
                                class=" rounded-1/2 text-blue-500 hover:bg-blue-200 cursor-pointer transition-all bg-blue-100 ">
                                <CircleCheckFilled />
                            </el-icon>
                            <span class="text-lg font-semibold text-blue-500 ml-3">{{surveyResult.summary}}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="flex justify-center items-center">
                            <el-icon size="50"
                                class=" text-blue-500 rounded-1/2 hover:bg-blue-200 cursor-pointer transition-all bg-blue-100 p-1">
                                <User />
                            </el-icon>
                            <span class="text-lg font-semibold text-gray-500 ml-3">{{surveyResult.area}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="text-center">
                <el-card shadow="never" class="bg-blue-50 mx-6">

                    <div v-for="(item, index) in surveyResult.advice" :key="index" class="flex my-1 items-center ">
                        <!-- <div class="w-1 h-1 ml-1 bg-gray-500 rounded-1/2 mr-2"></div> -->
                        <span class="font-medium text-gray-600 text-left mt-1">&nbsp &nbsp &nbsp &nbsp{{ item }}</span>
                    </div>
                </el-card>

            </div>
            <div class="flex justify-around mt-3 p-0">
                <el-card v-for="(item, index) in recomOptions" :key="index" shadow="hover"
                    class="bg-blue-100 cursor-pointer">
                    <div class="flex items-center">
                        <i v-if="item.name=='优法社区'" class="iconfont icon-group text-xl text-blue-500 font-bold mx-1"></i>
                        <i v-if="item.name=='高校法援'" class="iconfont icon-school text-xl text-blue-500 font-bold mx-1"></i>
                        <i v-if="item.name=='专业律师'" class="iconfont icon-lawyer text-xl text-blue-500 font-bold mx-1"></i>
                        <div class="flex flex-col items-center ml-1">
                            <span class="font-semibold text-gray-500">{{ item.name }}</span>
                            <span class="text-gray-500">{{ item.desc }}</span>
                        </div>
                    </div>

                </el-card>

            </div>
            <div class="h-[1px] bg-gray-300 mt-5 mb-3"></div>
            <div>
                <span class="italic ml-3 text-gray-500">测评结果是根据用户选择得出的初步结论, 与最终结果可能存在出入。</span>
            </div>
        </div>

    </Dialog>
</template>

<script setup>
import Bubble from '../components/Bubble.vue';
import Navibars from '../components/Navibars.vue';
import { ref, reactive, onMounted, computed } from 'vue'
import { notif } from '@/composable/utils.js'
import Dialog from '@/components/Dialog.vue'
import { userStartSurvey, usercontinueSurvey, getUserResult } from '@/api/quiz';
//进度条百分比
const surveyResult=reactive({
    area:'报告生成中',
    advice:['报告生成中'],
    summary:'报告生成中',
})
const surveyCnt = ref(0)
const quizProgess = ref(computed(() => {
    return surveyCnt.value * 10
}))
const question = ref('')
const answers = ref([])
const pageNo = ref(1)//用于答案分页
const Answer = ref(computed(() => {
    const len = answers.value.length
    return answers.value.slice((pageNo.value - 1) * 4, len <= pageNo.value * 4 ? len : pageNo.value * 4)
}))

const showIfNext = ref(computed(() => {
    if (pageNo.value * 4 < answers.value.length) {
        return true
    } else {
        return false
    }
}))

const hanleSelectChoice = (ansId) => {
    console.log('current ansId=' + ansId);
    usercontinueSurvey({
        ansId,
    }).then(res => {
        console.log(res.data)
        if (res.data.flag) {
            question.value = res.data.data.question
            answers.value = res.data.data.answerList
        } else {
            surveyCnt.value = 9
            notif('生成测评报告中', 'success')
            getUserResult()
                .then(res => {
                    //收集收集到的数据弹出测评结果
                    surveyResult.summary=res.data.data.summary
                    surveyResult.area=res.data.data.area
                    surveyResult.advice=res.data.data.advice
                    dialogRef.value.openDialog()
                })
                .catch(err => {
                    notif('似乎发生了一些什么错误啦？', 'error')
                    console.log(err);
                })
        }
    }).catch(err => {
        notif('似乎发生了一点问题', 'error')
    }).finally(() => {
        surveyCnt.value++
    })
}

const dialogRef = ref(null)
//挂载完之后访问服务器获取初始题目
onMounted(() => {
    userStartSurvey()
        .then(res => {
            console.log(res)
            console.log(res.data.data)
            question.value = res.data.data.question
            answers.value = res.data.data.answerList
        })
        .catch(err => {
            notif('似乎发生了一点什么错误?', 'error')
            console.log(err)

        })
})

const reportItems = ['建议1', '建议2', '建议3']
const recomOptions = [{name:'优法社区',desc:'找队友'},{name:'高校法援',desc:'免费求助'}, {name:'专业律师',desc:'一对一解答'}]
</script>

<style  scoped>
.rest_screen {
    height: calc(100vh - 65px);
}

.percentage-value {
    display: block;
    margin-top: 10px;
    font-size: 28px;
}

.percentage-label {
    display: block;
    margin-top: 10px;
    font-size: 12px;
}

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
}

.demo-progress .el-progress--circle {
    margin-right: 15px;
}

.pager {
    @apply bg-blue-400 rounded p-1 cursor-pointer hover: bg-blue-300;
}

:deep(.el-card__body) {
  padding: 13px;
}

</style>
