<template>
  <div class="flex justify-center">
    <el-table :header-cell-class-name="headerRowClassName" :data="universities" border style="width: 630px" :row-style="{
      height: '80px',
      fontSize: '17px',
      fontWeight: 600,
    }">
      <el-table-column prop="uniName" label="校名" width="150" />
      <el-table-column prop="province" label="省份" width="100" />
      <el-table-column prop="city" label="城市" width="100" />
      <el-table-column prop="lawLevel" label="学科评估" width="100" />
      <el-table-column prop="operation" label="操作" width="200">
        <template #default="scope">
          <el-button type="success" size="default" @click.prevent="handleCampusWebsite(scope.$index)">
            详情
          </el-button>

          <el-button type="primary" size="normal" @click.prevent="handleCampusSelect(scope.$index)">
            选择
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userApplyUniLawAid } from '@/api/lawAid.js'
import { notif, confirmDec } from '@/composable/utils.js'
const headerRowClassName = () => {
  return 'custom-header-row'
}

const universities = ref([
  {
    uniName: '山河大学',
    province: '广东省',
    city: '广州',
    lawLevel: 'A+',
    hotness: '火爆',
  },
  {
    uniName: '山河大学',
    province: '广东省',
    city: '广州',
    lawLevel: 'A+',
    hotness: '火爆',
  },
  {
    uniName: '山河大学',
    province: '广东省',
    city: '广州',
    lawLevel: 'A+',
    hotness: '火爆',
  },
  {
    uniName: '山河大学',
    province: '广东省',
    city: '广州',
    lawLevel: 'A+',
    hotness: '火爆',
  },
  {
    uniName: '山河大学',
    province: '广东省',
    city: '广州',
    lawLevel: 'A+',
    hotness: '火爆',
  }
])

const changeUniversity = (obj) => {
  universities.value = obj
}

const handleCampusWebsite = (index) => {
  //跳转到学院的首页
  window.location.assign(universities.value[index].website)
}

const handleCampusSelect = (index) => {
  //法律援助
  confirmDec('最多同时向3个高校提交申请，确认申请吗?', 'success','提示').then(async (res1) => {
    const res = await userApplyUniLawAid(universities.value[index])
    console.log(res)
    if (res.data.flag) {
      notif('申请成功，高校法律援助会在三个工作日内联系你', 'success')
    }else{
      notif(res.data.msg,'error')
    }

  })

}

defineProps({
  uni: {
    type: Array,
    default: [
      {
        uniName: '山河大学',
        province: '广东省',
        city: '广州',
        lawLevel: 'A+',
        hotness: '火爆',
      },
      {
        uniName: '山河大学',
        province: '广东省',
        city: '广州',
        lawLevel: 'A+',
        hotness: '火爆',
      },
      {
        uniName: '山河大学',
        province: '广东省',
        city: '广州',
        lawLevel: 'A+',
        hotness: '火爆',
      },
      {
        uniName: '山河大学',
        province: '广东省',
        city: '广州',
        lawLevel: 'A+',
        hotness: '火爆',
      },
      {
        uniName: '山河大学',
        province: '广东省',
        city: '广州',
        lawLevel: 'A+',
        hotness: '火爆',
      }
    ]
  }
})

defineExpose({
  changeUniversity
})
</script>

<style  scoped>
.custom-header-row {
  background-color: #1989fa !important;
  color: #fff;
  font-weight: 400;
}
</style>
