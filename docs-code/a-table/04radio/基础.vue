<template>
  <div>
    <div>
      <div class="bold">单选</div>
      <ve-radio @on-radio-change="radioChange" v-model="radioVal">Radio</ve-radio>
      <div>{{ radioVal }}</div>
    </div>

    <div>
      <div class="bold">单选禁用</div>
      <ve-radio disabled v-model="radioVal2">Radio</ve-radio>
      <div>{{ radioVal2 }}</div>
    </div>

    <div>
      <div class="bold">单选禁用</div>
      <ve-radio disabled v-model="radioVal3">Radio</ve-radio>
      <div>{{ radioVal3 }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 创建响应式数据
const radioVal = ref(false);
const radioVal2 = ref(false);
const radioVal3 = ref(true);

// 定义方法
const radioChange = (val) => {
  console.log('radioChange::', val);
  // radioVal.value = val
};
</script>
