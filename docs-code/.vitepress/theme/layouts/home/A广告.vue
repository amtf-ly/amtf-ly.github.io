<template>
  <q-card class="放大显影">
    <q-card-section class="紫色渐变2 text-white">
      <div class="小字">
        {{ data.标题 }}
        <q-badge color="amber-3" text-color="black" floating class="小字">
          <q-icon name="a4laba" class="q-mr-sm 中字" />
          低调广告
        </q-badge>
      </div>
    </q-card-section>
    <q-card-section>
      <q-img
        :src="data.图片"
        height="250px"
        :fit="data.填充方式"
        @click="显示详情 = true"
      >
        <!-- <div class="absolute-bottom  小字">
            字幕……
          </div> -->
      </q-img>
    </q-card-section>
    <q-separator />
    <!-- {{data.按钮标题}} -->
    <q-card-actions align="right">
      <q-btn flat dense :href="withBase('/')" :label="data.按钮标题"/>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="显示详情">
    <q-card style="width: 80vw; max-width: 80vw">
      <q-btn class="fixed-right " icon="close" flat round dense v-close-popup color="primary"  />
      <q-img :src="data.图片" />
    </q-card>
  </q-dialog>

</template>

<script setup>
import { withBase } from "vitepress";
const props = defineProps(["data"]);
import { ref } from "vue";
const 显示详情 = ref(false);
</script>
