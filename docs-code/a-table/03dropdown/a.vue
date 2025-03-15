<template>
  <q-page padding>
    <div class="q-gutter-lg">
      <q-card class="my-card">
        <q-card-section>
          <jc />
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-section>
          <dx />
        </q-card-section>
      </q-card>

      <q-card class="my-card">
        <q-card-section>
          <duox />
        </q-card-section>
      </q-card>

    </div>
  </q-page>

</template>

<script setup>
import jc from './基础.vue';
import dx from './单选.vue';
import duox from './多选.vue';
import { ref } from 'vue';
defineOptions({
  name: 'dropdown',
  icon: 'school'
});

</script>
