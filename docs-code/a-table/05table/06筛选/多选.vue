<template>
  <q-card class="q-gutter-y-md">

    <q-card-section>
      <ve-table :max-height="300" :fixed-header="true" :columns="columns" :table-data="tableData" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
const columns = reactive([
  {
    field: "name",
    key: "a",
    title: "Name",
    align: "left",
    width: "15%",
    // filter
    filter: {
      filterList: [
        { value: 0, label: "John", selected: false },
        {
          value: 1,
          label: "Dickerson",
          selected: false,
        },
        { value: 2, label: "Larsen", selected: false },
        { value: 3, label: "Geneva", selected: false },
        { value: 4, label: "Jami", selected: false },
      ],
      isMultiple: true,
      // filter confirm hook
      filterConfirm: (filterList) => {
        const labels = filterList
          .filter((x) => x.selected)
          .map((x) => x.label);
        searchByNameField(labels);
      },
      // filter reset hook
      filterReset: (filterList) => {
        searchByNameField([]);
      },
      // max height
      maxHeight: 900,
    },
  },
  {
    field: "date",
    key: "b",
    title: "Date",
    align: "left",
    width: "15%",
  },
  {
    field: "hobby",
    key: "c",
    title: "Hobby",
    align: "center",
    width: "30%",
  },
  {
    field: "address",
    key: "d",
    title: "Address",
    align: "left",
    width: "40%",
  },
])

const tableData = reactive([])
const sourceData = [
  {
    name: "John",
    date: "1900-05-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Shanghai",
    rowKey: 0,
  },
  {
    name: "Dickerson",
    date: "1910-06-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Beijing",
    rowKey: 1,
  },
  {
    name: "Larsen",
    date: "2000-07-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Chongqing",
    rowKey: 2,
  },
  {
    name: "Geneva",
    date: "2010-08-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Xiamen",
    rowKey: 3,
  },
  {
    name: "Jami",
    date: "2020-09-20",
    hobby: "coding and coding repeat",
    address: "No.1 Century Avenue, Shenzhen",
    rowKey: 4,
  },
]

function searchByNameField(labels) {
  console.log(`labels 👉`, labels)
  let data = [];
  data = sourceData.filter(
    (x) => labels.length === 0 || labels.includes(x.name),
  );
  tableData.length = []
  Object.assign(tableData, data)
}

Object.assign(tableData, sourceData.slice(0))

</script>
