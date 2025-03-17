<template>
  <q-card class="q-pa-sm">
    <q-card-section>
      word-break：
      <el-radio-group size="small" v-model="wordBreak">
        <el-radio-button value="normal">normal</el-radio-button>
        <el-radio-button value="keep-all">keep-all</el-radio-button>
        <el-radio-button value="break-all">break-all</el-radio-button>
        <el-radio-button value="break-word">break-word</el-radio-button>
      </el-radio-group>
    </q-card-section>
    <q-card-section>
      <ve-table :style="{ 'word-break': wordBreak }" :columns="columns" :table-data="tableData" :border-around="true"
        :border-x="true" :border-y="true" />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';

// 定义响应式数据
const wordBreak = ref('normal');
const columns = ref([
  {
    field: 'name',
    key: 'a',
    title: 'Name 40%',
    width: '40%',
  },
  { field: 'date', key: 'b', title: 'Tel 20%', width: '20%' },
  {
    field: 'hobby',
    key: 'c',
    title: 'Hobby 20%',
    width: '20%',
  },
  {
    field: 'address',
    key: 'd',
    title: 'Address 20%',
    width: '20%',
  },
]);
const tableData = ref([
  {
    name: 'John',
    date: '1900-05-20',
    hobby: 'Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu 大江东去浪淘尽千古风流人物故垒西边人道是三国周郎赤壁乱石穿空惊涛拍岸卷起千堆雪江山如画一时多少豪杰',
    address: 'No.1 Century Avenue, Xiamen',
  },
  {
    name: 'Dickerson',
    date: '1910-06-20',
    hobby: 'coding and coding repeat',
    address: 'No.1 Century Avenue, Beijing',
  },
  {
    name: 'Larsen',
    date: '2000-07-20',
    hobby: 'coding and coding repeat',
    address: 'No.1 Century Avenue, Chongqing',
  },
  {
    name: 'Geneva',
    date: '2010-08-20',
    hobby: 'coding and coding repeat',
    address: 'No.1 Century Avenue, Xiamen',
  },
  {
    name: 'Jami',
    date: '2020-09-20',
    hobby: 'coding and coding repeat',
    address: 'No.1 Century Avenue, Shenzhen',
  },
]);
</script>