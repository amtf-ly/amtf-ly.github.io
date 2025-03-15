<template>
  <div>
    <div>
      <div class="bold">受控单选</div>
      <button class="button-demo" @click="test()">测试</button>
      <br />
      <ve-radio isControlled @on-radio-change="radioChange" :isSelected="radioVal">
        Radio
      </ve-radio>
      <div>{{ radioVal }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 创建响应式数据
const radioVal = ref(false);


// 定义方法
const radioChange = (val) => {
  console.log('radioChange::', val);
  radioVal.value = val
};

function test() {
  radioVal.value = !radioVal.value
}
</script>
