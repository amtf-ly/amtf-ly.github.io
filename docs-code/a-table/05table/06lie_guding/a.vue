<template>
  <q-page padding class="q-gutter-y-md">
    <q-card class="my-card">
      <q-card-section>
        <h5>列固定</h5>
        <h6>
          1、属性`scroll-width`为滚动区域的宽度<br>
          2、当外层容器宽度小于`scroll-width`值时，将会出现横向滚动条；当外层容器宽度大于`scroll-width`值时，将会跟随容器自适应；当`scroll-width=0`时，滚动条将根据你的列宽度决定<br>
          3、列宽可以不设置、或者设置为百分比、或者为像素值（px）<br>
          4、设置了`scroll-width`属性，列宽单位**强烈建议保持一致！**<br>
        </h6>
      </q-card-section>
    </q-card>
    <zgd />
    <ygd />
    <zygd />
  </q-page>

</template>

<script setup>
import { ref, reactive } from 'vue';
import zgd from "./左固定.vue";
import ygd from "./右固定.vue";
import zygd from "./左右固定.vue";

defineOptions({
  name: '列固定',
  icon: 'school'
});


</script>
