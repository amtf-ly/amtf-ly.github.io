<template>
  <q-page padding class="q-gutter-y-md">
    <div>
      <h2>表格高度</h2>
      <q-card class="my-card">
        <q-card-section>
          1、当列宽不设置时，单元格宽度按照内容自动缩放<br>
          2、当列宽设置百分比，单元格宽度按照百分比缩放<br>
          3、当列宽设置像素值（px），单元格宽度按照像素比缩放<br>
          4、表格的固定宽度，需要设置外层容器宽度
        </q-card-section>
      </q-card>
    </div>
    <q-card class="my-card">
      <!-- columns:{{ columns }} -->
      <q-input v-model="第一列宽" label="第一列宽" />
      <q-card-section>
        <ve-table style="border-radius:50px;" :columns="columns" :table-data="tableData" :border-around="外边框"
          :border-x="横向边框" :border-y="纵向边框" />
      </q-card-section>
    </q-card>
    <px />
  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';
import px from './px.vue';
defineOptions({
  name: 'table高度',
  icon: 'school'
});
const 第一列宽 = ref(20)
const 纵向边框 = ref(true)
const 横向边框 = ref(true)
const 外边框 = ref(true)
const width = ref(80)
const 高度 = ref(200)
const columns = reactive([
  {
    field: "name",
    key: "a",
    title: "Name 40%",
    width: `${第一列宽.value}%`,
  },
  { field: "date", key: "b", title: "Tel 20%", width: "20%" },
  {
    field: "hobby",
    key: "c",
    title: "Hobby 20%",
    width: "20%",
  },
  {
    field: "address",
    key: "d",
    title: "Address 20%",
    width: "20%",
  },
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
