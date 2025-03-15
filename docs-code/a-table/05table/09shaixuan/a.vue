<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <h5>筛选</h5>
        <h6>
          1、通过 `column` 对象的 `filter`属性设置筛选功能<br>
          2、 `filterList` 设置你的筛选条件。包含`label`、`value`、`selected` 3 个属性<br>
          3、 `isMultiple` 开启筛选项多选，默认为 false<br>
          4、 `filterConfirm` 筛选确认函数<br>
          5、 `filterReset` 筛选重置函数<br>
        </h6>
      </q-card-section>
    </q-card>
    <mr />
    <dx />
  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';
import mr from "./默认.vue";
import dx from "./多选.vue";

defineOptions({
  name: '筛选',
  icon: 'school'
});


</script>
