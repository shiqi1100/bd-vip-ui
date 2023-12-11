<template>
<div>
  <calendar-month v-model="calendar"/>
</div>
</template>

<script setup>
import calendarMonth from "@/components/CalendarMonth.vue";
import {ref} from "vue";

const calendar = ref({})

</script>

<style scoped>

</style>
