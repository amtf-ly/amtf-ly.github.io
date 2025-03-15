<template>
  <q-card class="my-card">
    <q-list bordered>
      基础功能
      <q-item clickable v-ripple>
        1、通过`fixed-header="true"`设置开启表头固定。默认为`true`
      </q-item>
      <q-item clickable v-ripple>
        2、通过`max-height`设置表格最大高度
      </q-item>
    </q-list>
    <q-card-section>
      <q-checkbox left-label v-model="固定表头" label="固定表头" />
      <q-checkbox left-label v-model="显隐表头" label="显隐表头" />
    </q-card-section>
    <q-card-section>
      <ve-table :max-height="200" :fixed-header="固定表头" :columns="columns" :table-data="tableData" :show-header="显隐表头" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
const 固定表头 = ref(true)
const 显隐表头 = ref(true)
const columnHiddenOption = reactive(
  {
    // default hidden column keys
    defaultHiddenColumnKeys: ["hobby", "name"],
  }
)
const columns = reactive([
  { field: "name", key: "name", title: "Name" },
  { field: "date", key: "date", title: "Date" },
  { field: "hobby", key: "hobby", title: "Hobby" },
  { field: "address", key: "address", title: "Address" },
])

const tableData = reactive([
  {
    name: "John",
    date: "1900-05-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Shanghai",
  },
  {
    name: "Dickerson",
    date: "1910-06-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Beijing",
  },
  {
    name: "Larsen",
    date: "2000-07-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Chongqing",
  },
  {
    name: "Geneva",
    date: "2010-08-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Xiamen",
  },
  {
    name: "Jami",
    date: "2020-09-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Shenzhen",
  },
])


</script>
