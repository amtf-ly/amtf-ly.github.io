<template>
  <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut absolute-top">
    <div>
      <q-banner :class="[' text-center ', 'q-list--bordered', 'flex-center']">
        <span class="小字">{{ 标题 }}</span>
        <q-icon name="a4woshouaixin" class="text-center text-紫磨真金 中字" />
        <slot></slot>
      </q-banner>

      <q-list bordered separator>
        <q-item v-ripple v-for="i in data" :class="docStore.$q.dark.isActive?'bg-green-5':'bg-green-1'" :key="i.名称" clickable tag="label">
          <q-item-section side>
            <q-icon :name="i.icon" size="18px" class="q-mr-xs" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ i.名称 }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn :label="i.价格" flat round dense color="primary" icon="a4renminbi"></q-btn>
          </q-item-section>

        </q-item>
      </q-list>

    </div>
  </transition>
</template>

<script setup>
defineProps(['data', "标题"])
import { useDocStore } from "../store/index.js";
const docStore = useDocStore();
</script>
<style lang="scss" scoped>
.flex-center {
  .q-banner__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

:deep().q-btn {
  .q-icon {
    font-size: 1.2em ;
  }
}
</style>