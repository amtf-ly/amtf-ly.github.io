<template>
  <q-card class="q-gutter-y-md">

    <q-card-section>
      <ve-table :columns="columns" :table-data="tableData" :columnHiddenOption="columnHiddenOption" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
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
