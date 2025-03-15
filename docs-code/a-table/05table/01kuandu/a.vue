<template>
  <q-page padding class="q-gutter-y-md">
    <div>
      <h2>宽度</h2>
      <q-card class="my-card">
        <q-card-section>
          1、表格宽度可以设置固定值。如：`style="width:900px;"`<br>
          2、表格宽度可以设置动态值。如：`style="width:calc(100vh - 210px)"` 或者 `style="width:80%"`<br>
        </q-card-section>
      </q-card>
    </div>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <q-input v-model="width" label="width" />
        </div>
        <ve-table :style="`width:${width}%`" :columns="columns" :table-data="tableData" />
      </q-card-section>
      <q-card-section>
        <div class="row">
          <q-input v-model="width" label="width" />
        </div>
        <ve-table :style="`width:${width}%`" :columns="columns" :table-data="tableData" />
      </q-card-section>
    </q-card>

  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';
defineOptions({
  name: 'table高度',
  icon: 'school'
});
const width = ref(80)
const 高度 = ref(200)
const columns = reactive([
  { field: "name", key: "a", title: "Name", width: 100 },
  { field: "date", key: "b", title: "Tel", width: 200 },
  { field: "hobby", key: "c", title: "Hobby", width: 300 },
  { field: "address", key: "d", title: "Address", width: 300 },
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
