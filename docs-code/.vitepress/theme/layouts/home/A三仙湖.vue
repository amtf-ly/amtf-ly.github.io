<template>
    <q-card class="放大显影 长沙三仙湖饭店">
      <q-card-section class="紫色渐变2 text-white">
        <div class="小字">长沙三仙湖饭店 <q-badge color="amber-3" text-color="black" floating class="小字">
            <q-icon name="a4laba" class="q-mr-sm 中字" />
            低调广告
          </q-badge></div>
      </q-card-section>
      <q-card-section >
        <q-carousel swipeable navigation arrows v-model="slide" v-model:fullscreen="fullscreen" infinite height="250px"
          control-color="primary" :autoplay="autoplay" animated transition-prev="slide-right"
          transition-next="slide-left" @mouseenter="autoplay = false" @mouseleave="autoplay = true" @update:model-value="val => {
          变化了(val)
        }
          " navigation-icon="radio_button_unchecked">
          <template v-for="index in [1, 2, 3, 4, 5]" :key="index">
            <q-carousel-slide :name="`${index}`" :img-src="`imgs/饭店/${index}.jpg`" @click="fullscreen = !fullscreen" />
          </template>

          <template v-slot:control>
            <div class="absolute-top  text-center 黑底白字 小字" >
              潜心烹饪经典湘菜，笑脸喜迎十方贵客
            </div>
          </template>
        </q-carousel>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat :href="withBase('/')" dense >
          <q-icon name="location_on" class="中字" />
           长沙市长沙县新安路18号</q-btn>
      </q-card-actions>
    </q-card>
</template>
<script setup>

import { ref } from "vue"
function 变化了(params) {
  // console.log("变化了", params)
}
const slide = ref("slide")
const fullscreen = ref(false)
const autoplay = ref(true)
const fabPos = ref([180, 18])
const draggingFab = ref(false)
function moveFab(ev) {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true
  // fabPos.value = [fabPos.value[0] + ev.delta.x, fabPos.value[1] + ev.delta.y]
}


import { withBase } from 'vitepress'

</script>