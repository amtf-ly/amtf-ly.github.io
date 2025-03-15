<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <jc />
      </q-card-section>
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <shouk />
      </q-card-section>
    </q-card>
  </q-page>

</template>
<script setup>
import { ref } from 'vue';
import jc from './基础.vue';
import shouk from './受控.vue';

defineOptions({
  name: '单选',
  icon: 'school'
});


</script>
