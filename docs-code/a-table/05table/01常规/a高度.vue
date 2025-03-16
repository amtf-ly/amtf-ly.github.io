<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <q-select outlined v-model="高度" use-input clearable @new-value="createValue" :options="filterOptions" dense>
            <template v-slot:before>
              <div class="text-primary">max-height:</div>
            </template>
          </q-select>
        </div>
        <ve-table :max-height="高度" :columns="columns" :table-data="tableData" />
      </q-card-section>
    </q-card>

  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';

const filterOptions = ref([200, 500, "calc(100vh - 210px)", '80%'])

function createValue(val, done) {
  if (val.length > 0) {
    if (!filterOptions.value.includes(val)) {
      filterOptions.value.push(val)
    }
    done(val, 'toggle')
  }
}


const modelAddUnique = ref(null)
const 高度 = ref(200)
const columns = reactive([
  { field: "name", key: "a", title: "Name", width: 100 },
  { field: "date", key: "b", title: "Tel", width: 200 },
  { field: "hobby", key: "c", title: "Hobby", width: 300 },
  { field: "address", key: "d", title: "Address", width: 300 },
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
