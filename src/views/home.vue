<script lang="ts" setup>
import CalendarDemo from "@/views/calendar-demo.vue";
import fullCalendarDemo from '@/views/full-calendar-demo.vue'
import CalendarMonthDemo from "@/views/calendar-month-demo.vue";
import {computed, ref} from 'vue'
const tab = ref('1')
const comp = computed(() => {
  if (tab.value === '1') return CalendarDemo
  if (tab.value === '2') return CalendarMonthDemo
  if (tab.value === '3') return fullCalendarDemo
})

const tabs = ref([
  {
    title: '我的日志-日历',
    key: '1'
  },
  {
    title: '云签到-头部日历',
    key: '2'
  },
  {
    title: '云签到-底部日历',
    key: '3'
  }
])

</script>

<template>
  <div class="container">
    <bn-tabs v-model:activeKey="tab">
      <bn-tab-pane v-for="item in tabs" :key="item.key" :title="item.title" />
    </bn-tabs>
    <div>
      <component :is="comp" />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 50px;
}
</style>
