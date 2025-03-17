<template>
  <q-card class="q-gutter-y-md">
    <q-card-section>
      <ve-table :max-height="900" :fixed-header="true" :columns="columns" :table-data="tableData" />
    </q-card-section>
    <q-card-section>
      <!-- {{ tableData }} -->
      <ve-icon name="search" />
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
  },
  {
    field: "date",
    key: "b",
    title: "Date",
    align: "left",
    width: "15%",
    // filter
    filter: {
      filterList: [
        {
          modelValue: 0,
          label: "1900-05-20",
          selected: false,
        },
        {
          modelValue: 1,
          label: "1910-06-20",
          selected: false,
        },
        {
          modelValue: 2,
          label: "2000-07-20",
          selected: false,
        },
        {
          modelValue: 3,
          label: "2010-08-20",
          selected: false,
        },
        {
          modelValue: 4,
          label: "2020-09-20",
          selected: false,
        },
      ],
      // filter confirm hook
      filterConfirm: (filterList) => {
        console.log(`页面filterConfirm执行 ing👇`)
        const labels = filterList
          .filter((x) => x.selected)
          .map((x) => x.label);
        searchByDateField(labels);
      },
      // filter reset hook
      filterReset: (filterList) => {
        searchByDateField([]);
      },
      // filterIcon: () => {
      //   // return <ve-icon name="search" />;
      // },
    },
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

function searchByDateField(labels) {
  console.log(`labels 👉`, labels)
  let data = [];
  data = sourceData.filter(
    (x) => labels.length === 0 || labels.includes(x.date),
  );
  tableData.length = []
  Object.assign(tableData, data)
}

Object.assign(tableData, sourceData.slice(0))

</script>
