<template>
  <q-card class="q-pa-sm">
    <!-- columns:{{ columns }} -->
    <q-input v-model="第一列宽" label="第一列宽度 ? %" />
    <q-card-section>
      <ve-table style="border-radius:50px;" :columns="columns" :table-data="tableData" :border-around="外边框"
        :border-x="横向边框" :border-y="纵向边框" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
const 第一列宽 = ref(35)
const 纵向边框 = ref(true)
const 横向边框 = ref(true)
const 外边框 = ref(true)
const width = ref(80)
const 高度 = ref(200)
const columns = computed(() => [
  {
    field: "name",
    key: "a",
    title: `第一列宽${第一列宽.value}%`,
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
