<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut absolute-top">
    <div>
      <q-banner :class="[' text-center 上圆角', 'q-list--bordered']">
        <span class="小字">{{ 标题 }} </span>
      </q-banner>

      <q-table class="表头色" title="柜体柜门类" :rows="data" :columns="columns" row-key="id" binary-state-sort
          :rows-per-page-options="[0]" separator="cell" hide-bottom>
          <template v-slot:top>
            <div class=" q-table__title">柜体柜门类</div>
            <q-space></q-space>
            <!-- <q-btn color="positive " icon="add" dense size="sm" label="新增" @click="store.add()" outline /> -->

          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <!-- <q-td auto-width class="q-gutter-xs">
                <q-btn color="positive " icon="zoom_in" dense @click="store.update(props.row.id)" size="sm" outline />
                <q-btn color="negative " icon="clear" dense @click="store.删除主表行(props.row.id)" size="sm" outline />
              </q-td> -->
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>

        </q-table>

    </div>
  </transition>
</template>

<script setup>
import { withBase } from 'vitepress'

const props = defineProps(['data', "标题"])
// console.log('props.data :>> ', props.data);
// const kk= props
import A进度条 from './A进度条.vue';
import { computed } from 'vue';
import { useDocStore } from "../store/index.js";
const docStore = useDocStore();
const 背景色 = computed(() => {
  // docStore.$q.dark.isActive === false ? "true" : "false"
  const obj = {}
  // console.log('props :>> ', props);
  // console.log('props.data :>> ', props.data);
  // const kk= props

  // data是axios异步获取的，可能为空
  try {
    (props.data).forEach(currentItem => {
      // console.log('currentItem :>> ', currentItem);
      // obj[currentItem.名称]=currentItem.完成 ? 'bg-green-1' : 'bg-orange-1'
      const 主色 = currentItem.完成 ? 'green' : 'orange'
      const 深度 = docStore.$q.dark.isActive ? "5" : "1"
      obj[currentItem.名称] = `bg-${主色}-${深度}`
    })
  } catch (error) { }

  // console.log('obj :>> ', obj);
  return obj
}

);
</script>
