<template>
<div>
  <full-calendar :data="signData" :time="calendar" :workday="workDay"/>
</div>
</template>

<script setup>
import fullCalendar from "@/components/fullCalendar.vue";
import {onMounted, ref} from "vue";
import dataList from '@/api/data.js'
import moment from "moment";
const signData = ref({})
const calendar = ref({
  year: '23',
  month: '12'
})
const workDay = ref(['1','2','3','4','5'])

function signChart(cavoList) {
  let data = {};
  let totalDay = 0;
  cavoList.forEach(item => {
    let day = moment(item.createdTime).format('DD');
    if (item.cusrList.length) {
      data[day] = item.cusrList;
      totalDay += 1;
    }
  })
  signData.value = data;
  console.log(signData.value, 'signData.value')
  // totalDay = totalDay;
}

signChart(dataList)

onMounted(() => {
})
</script>

<style scoped>

</style>
