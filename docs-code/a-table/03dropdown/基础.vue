<template>
  <ve-dropdown hideByItemClick v-model="options">
    <div style="color:blue;cursor: pointer;">点击这里</div>
  </ve-dropdown>
</template>
<script setup>
import { reactive } from 'vue';

const options = reactive([
  { value: 0, label: "张三" },
  { value: 1, label: "李四", selected: true },
  { value: 2, label: "王二" },
])
</script>
