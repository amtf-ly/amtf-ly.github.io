<template>
  <div class="row items-center">
    <q-btn
      v-for="(item, index) in props.menu"
      :key="index"
      flat
      dense
      class="header-btn doc-header-text-links__item text-weight-bold 按钮icon"
      :class="`${props.mqPrefix}-${item.mq || 'none'} ${props.navClass} ${
        激活(item, page) ? 'text-primary active' : ''
      }`"
      :padding="item.children ? '8px 8px 8px 16px' : '8px 12px'"
      :label="item.text"
      no-caps
      no-wrap
      :icon-right="item.children ? mdiMenuDown : void 0"
      :href="item.link ? normalizeLink(item.link) : undefined"
      :target="item.external ? '_blank' : void 0"
    >
      <doc-header-menu
        v-if="item.children"
        :elements="item.children"
        :mq-prefix="props.mqPrefix"
      />
    </q-btn>
    <!-- <p class="text-primary">aaaaaa</p>
    <a class="text-primary">kkkkkk</a> -->

    <!-- <q-tabs dense class="doc-header__links col text-size-16 gt-700 加粗" active-color="brand-primary">
        <q-tab v-for="(item, index) in  props.menu" :key="index" :href="item.link" :label="item.text" />
      </q-tabs> -->
  </div>
</template>

<script setup>
import { computed } from "vue";
import { isActive } from "../../../shared";
import { useData } from "vitepress";
const { page } = useData();

const 激活 = (item, page) => {
  // console.log(`item👉`, item)
  let kk = isActive(
    page.relativePath,
    item.activeMatch || item.link,
    !!item.activeMatch
  );
  // console.log(`kk👉`, kk)
  return kk;
};

import { normalizeLink } from "../../support/utils";

import { mdiMenuDown } from "@quasar/extras/mdi-v6";

import DocHeaderMenu from "./DocHeaderMenu.js";

const props = defineProps({
  menu: Array,
  mqPrefix: String,
  navClass: String,
});
</script>

<style lang="sass" scoped>
@import "@the/css/quasar.variables.scss"
.active
  border-bottom: 1px solid $primary
</style>


<!-- q-tab relative-position self-stretch flex flex-center text-center q-tab--inactive q-focusable q-hoverable cursor-pointer
q-tab relative-position self-stretch flex flex-center text-center q-tab--active text-brand-primary q-router-link--exact-active q-router-link--active -->