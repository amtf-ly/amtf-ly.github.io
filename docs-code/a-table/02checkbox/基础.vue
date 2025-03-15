<template>
  <div class="row q-gutter-lg justify-between">
    <div>
      <div class="bold">单选</div>
      <ve-checkbox @on-checked-change="checkedChange" v-model="checkboxValue1" label="哈密瓜" />
      <div>{{ checkboxValue1 }}</div>
    </div>

    <div>
      <div class="bold">单选禁用</div>
      <ve-checkbox disabled v-model="checkboxValue2">哈密瓜</ve-checkbox>
      <div>{{ checkboxValue2 }}</div>

      <ve-checkbox disabled v-model="checkboxValue3">哈密瓜</ve-checkbox>
      <div>{{ checkboxValue3 }}</div>
    </div>

    <div>
      <div class="bold">半选状态</div>
      <ve-checkbox indeterminate>哈密瓜</ve-checkbox>
    </div>

    <div>
      <div class="bold">受控属性</div>
      <ve-checkbox isControlled :isSelected="isSelected" @on-checked-change="checkedChangeControl">
        哈密瓜
      </ve-checkbox>
      <div>{{ isSelected }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineOptions({
  name: 'che',
  icon: 'school'
});
const checkboxValue1 = ref(true)
const checkboxValue2 = ref(false)
const checkboxValue3 = ref(true)
const isSelected = ref(true)
function checkedChange(isChecked) {
  console.log("isChecked::", isChecked);
}
function checkedChangeControl(isChecked) {
  isSelected.value = isChecked;
}
</script>
