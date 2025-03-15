<template>
  <q-page padding class="q-gutter-y-md">
    <div>
      <h2>表格高度</h2>
      <q-card class="my-card">
        <q-card-section>
          1、表格高度默认由行数据决定，也可以通过 `max-height`属性设置最大高度<br>
          2、表格高度可以设置固定值。如：`:max-height="500"`<br>
          3、表格高度可以设置动态值。如：`max-height="calc(100vh - 210px)"` 或者 `max-height="80%"`<br>
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
    </q-card>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <q-input v-model="width" label="width" />
          <q-input v-model="高度" label="高度" />
        </div>
        <ve-table :style="`width:${width}%`" :columns="columns" :table-data="tableData" :max-height="高度" />
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
