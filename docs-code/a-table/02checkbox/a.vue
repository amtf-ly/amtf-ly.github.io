<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <jc />
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <dxjc />
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <dxgj />
      </q-card-section>
    </q-card>
  </q-page>

</template>

<script setup>
import jc from './基础.vue';
import dxjc from './多选普通.vue';
import dxgj from './多选高级.vue';
import { ref } from 'vue';
defineOptions({
  name: 'che',
  icon: 'school'
});

</script>
