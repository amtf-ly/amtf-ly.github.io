<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <h5>表头固定</h5>
        <h6>
          1、属性`max-height`为表格的最大高度<br>
          2、表格总高度大于`max-height`值时，表格将会出现纵向滚动条<br>
          3、表格总高度小于`max-height`值时，表格将会高度自适应
        </h6>
      </q-card-section>
    </q-card>
    <mr />
  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';
import mr from "./默认.vue";

defineOptions({
  name: '表头固定',
  icon: 'school'
});


</script>
