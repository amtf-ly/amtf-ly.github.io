<template>
  <q-card class="q-gutter-y-md">
    <div style="margin:10px 0;line-height:2">
      <div>column:{{ columnResizeInfo.column }}</div>
      <div>differWidth:{{ columnResizeInfo.differWidth }}</div>
      <div>columnWidth:{{ columnResizeInfo.columnWidth }}</div>
    </div>
    <q-card-section>
      <ve-table style="width:100%" :scroll-width="0" :columns="columns" :table-data="tableData" :border-around="true"
        :border-x="true" :border-y="true" :column-width-resize-option="columnWidthResizeOption" />
    </q-card-section>
  </q-card>

</template>

<script setup>
import { ref, reactive } from 'vue';
import Mock from "mockjs";

const columnResizeInfo = reactive({
  column: "",
  differWidth: "",
  columnWidth: "",
  tableWidth: "",
})

const columnWidthResizeOption = reactive({
  // default false
  enable: true,
  // column resize min width
  minWidth: 30,
  // column size change
  sizeChange: ({ column, differWidth, columnWidth }) => {
    columnResizeInfo.column = column;
    columnResizeInfo.differWidth = differWidth;
    columnResizeInfo.columnWidth = columnWidth;
  },
})

const columns = reactive([
  {
    field: "index",
    key: "index",
    title: "#",
    width: 50,
    align: "center",
    fixed: "left",
    renderBodyCell: ({ row, column, rowIndex }, h) => {
      return ++rowIndex;
    },
  },
  { field: "col1", key: "col1", title: "Col1", width: 220 },
  { field: "col2", key: "col2", title: "Col2", width: 220 },
  { field: "col3", key: "col3", title: "Col3", width: 220 },
  { field: "col4", key: "col4", title: "Col4", width: 220 },
  { field: "col5", key: "col5", title: "Col5", width: 220 },
  { field: "col6", key: "col6", title: "Col6", width: 220 },
  { field: "col7", key: "col7", title: "Col7" },
  { field: "col8", key: "col8", title: "Col8" },
])

const tableData = reactive([
])

function initTableData() {
  let data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      rowKey: i,
      col1: `A${i + 1}`,
      col2: Mock.Random.sentence(3, 12),
      col3: `C${i + 1}`,
      col4: `D${i + 1}`,
      col5: `E${i + 1}`,
      col6: `F${i + 1}`,
      col7: `G${i + 1}`,
      col8: `H${i + 1}`,
    });
  }
  Object.assign(tableData, data)
}
initTableData()
</script>
