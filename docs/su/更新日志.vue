<template>
  <q-list bordered separator>
    <q-item v-ripple v-for="i in a4.更新日志" :key="i.名称" clickable tag="label">
      <q-item-section side>
        <q-checkbox v-model="i.完成" />
      </q-item-section>
      <q-item-section>
        <q-item-label v-html="i.名称"></q-item-label>
      </q-item-section>
      <q-item-section v-if="i.链接">
        <q-btn flat round dense color="primary" label="链接🚀" :href="i.链接" target="_blank"></q-btn>
      </q-item-section>


      <q-item-section side>
        <div class="row">
          <q-btn flat round dense color="primary" :label="i.日期"></q-btn>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { a4_store } from '@the/stores/amtf_store'
const {
  a4
} = a4_store()
// console.log('a4 :>> ', a4);
</script>
