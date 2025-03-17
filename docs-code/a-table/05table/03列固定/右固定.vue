<template>
  <q-card class="q-gutter-y-md">
    <q-card-section>
      <ve-table style="width:900px" :scroll-width="1200" border-y :columns="columns" :table-data="tableData" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
const columns = reactive([
  { field: "col1", key: "a", title: "Title1" },
  { field: "col2", key: "b", title: "Title2" },
  { field: "col3", key: "c", title: "Title3" },
  { field: "col4", key: "d", title: "Title4" },
  { field: "col5", key: "e", title: "Title5" },
  { field: "col6", key: "f", title: "Title6" },
  { field: "col7", key: "g", title: "Title7" },
  { field: "col8", key: "h", title: "Title8" },
  {
    field: "col9",
    key: "i",
    title: "Title9",
    fixed: "right",
  },
  {
    field: "col10",
    key: "j",
    title: "Title10",
    fixed: "right",
  },
])

const tableData = reactive([
  {
    col1: "1",
    col2: "2",
    col3: "3",
    col4: "4",
    col5: "5",
    col6: "6",
    col7: "7",
    col8: "8",
    col9: "9",
    col10: "10",
  },
  {
    col1: "1",
    col2: "2",
    col3: "3",
    col4: "4",
    col5: "5",
    col6: "6",
    col7: "7",
    col8: "8",
    col9: "9",
    col10: "10",
  },
  {
    col1: "1",
    col2: "2",
    col3: "3",
    col4: "4",
    col5: "5",
    col6: "6",
    col7: "7",
    col8: "8",
    col9: "9",
    col10: "10",
  },
  {
    col1: "1",
    col2: "2",
    col3: "3",
    col4: "4",
    col5: "5",
    col6: "6",
    col7: "7",
    col8: "8",
    col9: "9",
    col10: "10",
  },
  {
    col1: "1",
    col2: "2",
    col3: "3",
    col4: "4",
    col5: "5",
    col6: "6",
    col7: "7",
    col8: "8",
    col9: "9",
    col10: "10",
  },
])


</script>
