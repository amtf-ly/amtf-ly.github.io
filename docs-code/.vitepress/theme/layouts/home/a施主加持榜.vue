<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut absolute-top">
    <div>
      <q-banner :class="[' text-center 上圆角', 'q-list--bordered']">
        <span class="小字">{{ 标题 }} </span>
      </q-banner>

      <q-list bordered separator>
        <q-item v-ripple v-for="i in data" :class="背景色[i.名称]" :key="i.名称" clickable tag="label">
          <q-item-section side>
            <q-checkbox v-model="i.完成" />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="i.名称"></q-item-label>
          </q-item-section>
          <q-item-section>
            <A进度条 :item="i" />
          </q-item-section>
          <q-item-section side>
            <div class="row">
              <q-btn flat round dense color="primary" label="🚀" :href="withBase(i.to)"></q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>

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
