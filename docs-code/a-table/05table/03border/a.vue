<template>
  <q-page padding class="q-gutter-y-md">
    <div>
      <h2>表格高度</h2>
      <q-card class="my-card">
        <q-card-section>
          1、通过`border-around=true` 设置外边框<br>
          2、通过`border-x=true` 设置横向边框<br>
          3、通过`border-y=true` 设置纵向边框
        </q-card-section>
      </q-card>
    </div>
    <q-card class="my-card">
      <q-checkbox left-label v-model="横向边框" label="横向边框" />
      <q-checkbox left-label v-model="纵向边框" label="纵向边框" />
      <q-checkbox left-label v-model="外边框" label="外边框" />
      <q-card-section>
        <ve-table style="border-radius:50px;" :columns="columns" :table-data="tableData" :border-around="外边框"
          :border-x="横向边框" :border-y="纵向边框" />
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
const 纵向边框 = ref(false)
const 横向边框 = ref(false)
const 外边框 = ref(true)
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
