<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <h5>编辑</h5>
        <h6>
          1、通过 `column` 对象的 `filter`属性设置筛选功能<br>
        </h6>
      </q-card-section>
    </q-card>
    <abase />
  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';
import abase from "./base.vue";

defineOptions({
  name: '筛选',
  icon: 'school'
});


</script>
