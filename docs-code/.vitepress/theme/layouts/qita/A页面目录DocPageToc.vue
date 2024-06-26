<template>
  <q-list class="doc-page__toc">
    <!-- yyyy{{ docStore.state.value.toc }} -->
    <!-- docStore.state.value.activeToc{{ docStore.state.value.activeToc }} -->
    <q-item
      v-for="tocItem in docStore.state.value.toc"
      :key="tocItem.link"
      :id="`toc--${ tocItem.link }`"
      clickable
      class="doc-layout__item"
      active-class="doc-layout__item--active"
      v-ripple
      :active="docStore.state.value.activeToc === tocItem.link"
      @click="tocItem.onClick"
    >
      <!-- <q-item-section v-if="tocItem.sub === true" side /> -->
      <!-- <q-item-section v-if="tocItem.level > 2" side /> -->
      <q-item-section v-for="i in  Array.from({ length: tocItem.level - 2 }, (_, i) => i)" side />
      <q-item-section>{{ tocItem.title }}</q-item-section>

    </q-item>
  </q-list>
</template>

<script setup>
import { useDocStore } from '../store/index.js'
const docStore = useDocStore()
</script>
