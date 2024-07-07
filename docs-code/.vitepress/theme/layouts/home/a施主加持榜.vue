<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut absolute-top">
    <div>
      <!-- {{ data }} -->
      <q-table class="表头色" title="" :rows="data" :columns="columns" row-key="_id" :rows-per-page-options="[10,20,100]">
        <template v-slot:top>
          <div class="text-center q-table__title full-width text-primary">{{ 标题 }}</div>
          <!-- <q-space></q-space> -->
          <!-- <q-btn color="positive " icon="add" dense size="sm" label="新增" @click="store.add()" outline /> -->
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <!-- {{ props.cols }} -->
            <!-- <q-th auto-width /> -->
            <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-primary">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">

            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <!-- {{ col }} -->
              <template v-if="col.name == '充电金额'">
                <q-badge color="orange" class="a4">
                  {{ col.value }}
                </q-badge>
              </template>
              <template v-else>
                {{ col.value }}
              </template>
            </q-td>
          </q-tr>
        </template>

      </q-table>

    </div>
  </transition>
</template>

<script setup>
import { withBase } from 'vitepress'
import { date } from 'quasar'
const props = defineProps(['data', "标题"])
// console.log('props.data :>> ', props.data);
// const kk= props
import { computed } from 'vue';

// import { useDocStore } from "../store/index.js";
// const docStore = useDocStore();

const columns = [
  {
    name: "用户",
    label: "用户",
    align: "center",
    field: row => row.user_id?.[0]?.username,
    sortable: true,
  },
  {
    name: "充电金额",
    label: "充电金额",
    align: "center",
    field: row => row.chongdianjine / 100,
    sortable: true,
  },
  {
    name: "注册日期",
    label: "注册日期",
    align: "center",
    field: row => date.formatDate(row.user_id?.[0].register_date, 'YYYY-MM-DD'),
    sortable: true,
  },
  {
    name: "使用的程序",
    label: "使用的程序",
    align: "center",
    field: row => {
      const apps = row.appid_id?.map(item => {
        return item.appname
      })
      return apps?.join(',')
    },
    sortable: true,
  },

  // {
  //   name: "单位",
  //   label: "单位",
  //   align: "center",
  //   field: "单位",
  //   sortable: true,
  // },
  // {
  //   name: "价格",
  //   label: "价格￥",
  //   align: "center",
  //   field: "价格",
  //   sortable: true,
  // },
]
</script>

<style lang="scss" scoped>
.a4{
  font-size: 16px;
}
</style>