<template>
  <div>
    <LawAidHeader></LawAidHeader>
    <LawAidMain ref="lawAidMainRef" class="mt-5"></LawAidMain>
  </div>
</template>

<script setup>
import LawAidHeader from '@/components/lawAid/LawAidHeader.vue'
import LawAidMain from '@/components/lawAid/LawAidMain.vue'
import { onMounted } from 'vue';
import {signCurrentUserLocation}from '@/api/location.js'
import Utils from '@/composable/geoUtils';
import {setLoginLocation,getLoginLocation} from '@/composable/auth.js'
import {getRecommendUni} from '@/api/lawAid.js'
import {ref} from 'vue'

const uniList=ref([])
const lawAidMainRef=ref(null)

onMounted(async()=>{
 const res=await Utils.getCurrentPosition()
 const locationInfo={
  lng:res.position.lng,
  lat:res.position.lat
 }
 //向后端登记位置信息
 const result=await signCurrentUserLocation(locationInfo)
 console.log(result)
 if(result.data.flag){
  console.log('后端登记位置信息成功')
  console.log(locationInfo)
  //然后获取推荐的高校列表
 const universities= await getRecommendUni()
 console.log('获取推荐高校成功')
 console.log(universities)
 lawAidMainRef.value.changeUniversity(universities.data)
 uniList.value=universities.data

 //向cookie存储位置信息
 setLoginLocation(locationInfo)
 const obj=getLoginLocation()
 }


})
</script>

<style  scoped>
</style>
