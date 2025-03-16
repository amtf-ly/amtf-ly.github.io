<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <!-- <q-select v-model="width" :options="['width:80%', 'width:50%']" label="Standard" outlined use-input
            new-value-mode="add-unique" /> -->
          <q-select outlined v-model="width" use-input clearable @new-value="createValue" :options="filterOptions"
            dense>
            <template v-slot:before>
              <div class="text-primary">直接设置style:</div>
            </template>
          </q-select>
        </div>
        <ve-table :style="width" :columns="columns" :table-data="tableData" />
      </q-card-section>
    </q-card>

  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';

const filterOptions = ref(['width:80%', 'width:50%', 'width:900px', 'width:calc(55vw - 10px);'])

function createValue(val, done) {
  if (val.length > 0) {
    if (!filterOptions.value.includes(val)) {
      filterOptions.value.push(val)
    }
    done(val, 'toggle')
  }
}

// function filterFn(val, update) {
//   update(() => {
//     if (val === '') {
//       filterOptions.value = stringOptions
//     }
//     else {
//       const needle = val.toLowerCase()
//       filterOptions.value = stringOptions.filter(
//         v => v.toLowerCase().indexOf(needle) > -1
//       )
//     }
//   })
// }

const modelAddUnique = ref(null)
const width = ref('width:80%')
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
