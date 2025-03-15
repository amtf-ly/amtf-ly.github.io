<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <h5>列隐藏</h5>
        <h6>
          1、通过 `columnHiddenOption` 实现列隐藏功能<br>
          2、你也可以通过实例方法控制列的隐藏与显示
        </h6>
      </q-card-section>
    </q-card>
    <mr />
    <dongtai />
  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';
import mr from "./默认.vue";
import dongtai from "./动态.vue";

defineOptions({
  name: '列隐藏',
  icon: 'school'
});


</script>
