<template>
  <q-card class="my-card">
    <h6>
      1、通过`scroll-width="1200"`设置滚动区域宽度，通过`style="width:900px"`设置外层容器宽度<br>2、通过`fixed:"left"`设置需要固定的左列
    </h6>
    <q-card-section>
      <ve-table style="width:900px" :scroll-width="1200" border-y :columns="columns" :table-data="tableData" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
const columns = reactive([
  { field: "col1", key: "a", title: "Title1", fixed: "left" },
  { field: "col2", key: "b", title: "Title2", fixed: "left" },
  { field: "col3", key: "c", title: "Title3" },
  { field: "col4", key: "d", title: "Title4" },
  { field: "col5", key: "e", title: "Title5" },
  { field: "col6", key: "f", title: "Title6" },
  { field: "col7", key: "g", title: "Title7" },
  { field: "col8", key: "h", title: "Title8" },
  { field: "col9", key: "i", title: "Title9" },
  { field: "col10", key: "j", title: "Title10" },
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
