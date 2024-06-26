<template>
  <q-drawer v-model="docStore.state.value.menuDrawer" class="doc-left-drawer" side="left" bordered :width="asideWidth">
    <q-scroll-area style="height: calc(100% - 10px); margin-top: 10px">
      <A侧边栏目录DocPageMenu class="q-mx-xs q-mb-lg" />
    </q-scroll-area>
    <!-- <div class="absolute-top header">
      <NavBarSearch />
    </div> -->
    <div class="absolute-right header">
      <!-- <div class="q-splitter__separator bg-orange" style="width: 3px;">
        <div class="q-splitter__separator-area absolute-full"></div>
      </div> -->
      <div class="分割线" ref="drag">
        <div class="分割线area absolute-full"></div>
        <q-btn class="分割线-button" padding="none" icon="code" flat color="紫磨真金" round @click="折叠展开左侧()"></q-btn>
      </div>
    </div>
  </q-drawer>
</template>

<script setup>
import { useDocStore } from "../store/index.js";
import A侧边栏目录DocPageMenu from "./A侧边栏目录DocPageMenu.js";
const docStore = useDocStore();

import { ref, onMounted } from "vue";
onMounted(() => {
  绑定拖动();
});
function 折叠展开左侧() {
  asideWidth.value = asideWidth.value === 0 ? 250 : 0;
}
const drag = ref(null);
const asideWidth = ref(250);
function 绑定拖动() {
  drag.value.onmousedown = function () {
    document.onmousemove = function (e) {
      // console.log("e.clientX", e.clientX);
      asideWidth.value = e.clientX;
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    return false;
  };
}
</script>
<style  scoped>
:deep(.q-btn .q-icon){
    font-size: 1.2em !important;
}
</style>
<style lang="scss" scoped>
@import "@the/css/quasar.variables.scss";

.分割线area {
  left: -3px;
  right: -3px;
}

.分割线 {
  width: 1px;
  height: 100%;
  position: relative;
  background: $紫磨真金;
  cursor: col-resize;

  &:hover {
    width: 3px;
  }

  &:active {
    width: 3px;
  }
}

.分割线-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  span {
    font-size: 1em !important;
  }
}

.q-btn {
  .q-icon {
    font-size: 1em !important;
  }
}
</style>
<style></style>