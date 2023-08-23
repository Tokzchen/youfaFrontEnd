<template>
    <div>
        <el-timeline>
            <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
                :type="activity.type" :color="activity.color" :size="activity.size" :hollow="activity.hollow"
                :timestamp="activity.timestamp">
                {{ activity.content }}
            </el-timeline-item>
        </el-timeline>
        <NotFound v-for="i in [1, 2]" class="mt-15" v-if="activities.length == 0 || activities == null" fontSize="35">
        </NotFound>
    </div>
</template>
<script setup>
import { ref,watch } from 'vue'
import NotFound from '../NotFound.vue';
import { getLawAidInfoUserById } from '@/api/lawAid.js'
const props = defineProps({
    userId: {
        type: Number,
        default: null
    }
})
const activities = ref([])
watch(() => props.userId, async (newValue, oldValue) => {
    console.log('进来啦进来啦啊啊啊啊啊')
    if (newValue != null) {
        console.log('新USERID:'+newValue)
        const res=await getLawAidInfoUserById(newValue)
        const infoObj = res.data.data
        console.log(infoObj)
        if (res.data.flag) {
            const progress = infoObj.progress
            let newActivity = []
            //遍历progress,根据progress生成activities
            if (progress == null || progress.length == 0) {
                activities.value = []
                return
            } else {
                console.log(progress[0])
                for (let i = 0; i < progress.length; i++) {
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
    }
},
{ immediate: true, deep: true });


</script>
<style lang="">
    
</style>