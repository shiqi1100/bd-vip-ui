<template>
<div>
  <full-calendar :data="signData" :time="calendar" :workday="workDay"/>
</div>
</template>

<script setup>
import fullCalendar from "@/components/fullCalendar.vue";
import {ref} from "vue";
const signData = ref({})
const calendar = ref({})
const workDay = ref([])

</script>

<style scoped>

</style>
