<template>
  <q-card class="q-gutter-y-md">

    <q-card-section>
      <button class="button-demo" @click="hideColumns(['col1'])">隐藏 col1 列</button>
      <button class="button-demo" @click="hideColumns(['col2'])">隐藏 col2 列</button>
      <button class="button-demo" @click="hideColumns(['col3'])">隐藏 col3 列</button>
      <button class="button-demo" @click="hideColumns(['col1', 'col2', 'col3'])">
        隐藏 col1、col2、col3 列
      </button>
      <br />
      <br />
      <button class="button-demo" @click="showColumns(['col1'])">显示 col1 列</button>
      <button class="button-demo" @click="showColumns(['col2'])">显示 col2 列</button>
      <button class="button-demo" @click="showColumns(['col3'])">显示 col3 列</button>
      <button class="button-demo" @click="showColumns(['col1', 'col2', 'col3'])">
        显示 col1、col2、col3 列
      </button>
      <br />
      <br />
      <ve-table ref="tableRef" border-y :columns="columns" :table-data="tableData"
        :columnHiddenOption="columnHiddenOption" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from 'vue';
const columnHiddenOption = reactive(
  {
    // default hidden column keys
    // default hidden column keys
    defaultHiddenColumnKeys: ["col8"],
  }
)
const columns = reactive([
  { field: "col1", key: "col1", title: "col1", width: "10%" },
  {
    title: "col2-col3",
    children: [
      {
        field: "col2",
        key: "col2",
        title: "col2",
        width: 100,
      },
      {
        field: "col3",
        key: "col3",
        title: "col3",
        width: 110,
      },
    ],
  },
  {
    title: "col4-col5-col6",
    children: [
      {
        title: "col4-col5",
        children: [
          {
            field: "col4",
            key: "col4",
            title: "col4",
            width: 130,
          },
          {
            field: "col5",
            key: "col5",
            title: "col5",
            width: 140,
          },
        ],
      },
      {
        title: "col6",
        field: "col6",
        key: "col6",
        width: 140,
      },
    ],
  },
  { field: "col7", key: "col7", title: "col7", width: 150 },
  { field: "col8", key: "col8", title: "col8", width: 160 },
])

const tableData = reactive([])

function initTableData() {
  let data = [];
  for (let i = 0; i < 3; i++) {
    data.push({
      rowKey: i,
      col1: "col1-" + i,
      col2: "col2-" + i,
      col3: "col3-" + i,
      col4: "col4-" + i,
      col5: "col5-" + i,
      col6: "col6-" + i,
      col7: "col7-" + i,
      col8: "col8-" + i,
    });
  }
  Object.assign(tableData, data)
}
initTableData()
const tableRef = ref()

function hideColumns(keys) {
  // console.log(`tableRef 👉`, tableRef)
  tableRef.value.hideColumnsByKeys(keys);
}
// show cloumns
function showColumns(keys) {
  tableRef.value.showColumnsByKeys(keys);
}
</script>
