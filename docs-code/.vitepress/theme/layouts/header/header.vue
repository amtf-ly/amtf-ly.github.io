<template>
  <q-header class="doc-header header-toolbar" :class="{
    '主页时头部': docStore.state.value.是主页,
    'q-header--hidden': docStore.state.value.最大化
  }" bordered :height-hint="51" reveal>
    <!-- <q-header :class="['header', $q.dark.isActive ? '' : 'text-dark']" bordered > -->
    <!-- <q-toolbar class="q-pl-lg q-pr-md no-wrap  VPNavBarTitle"> -->
    <q-toolbar class="q-pl-lg q-pr-md  VPNavBarTitle">
      <div 没有我容不下图片 class="">
        <a :href="normalizeLink('/')" :target="void 0"
          class="doc-header__logo row items-center no-wrap cursor-pointer title ">
          <img class="VPImage 无界 logo box阴影" :src="withBase('/amtf-ml128.png')" alt="amtf logo2" @click="添加涟漪" />
        </a>
      </div>
      <!-- {{ withBase('/amtf-ml128.png') }} -->
      <!-- 顶部折叠按钮，用不到了……手机模式需要用 -->
      <q-btn class="q-mx-sm " dense round @click="docStore.toggleMenuDrawer" icon="menu" size="sm"></q-btn>

      <q-btn class="q-ml-xs 顶部 " icon="a4zitifangda" round size="xs" @click="加大字体"></q-btn>
      <q-btn class="q-ml-xs 顶部 " icon="a4zitisuoxiao" round size="xs" @click="减小字体"></q-btn>

      <!-- <div class="doc-header__primary-left-spacer gt-lg" /> -->
      <!-- <doc-header-text-links class="doc-header__links col text-size-16 gt-700" :menu="primaryToolbarLinks" mq-prefix="gt"
        nav-class=" text-size-16 " /> -->
      <q-space />


      <div class="doc-header__links col row items-center 换行 导航栏链接部分">
        <doc-header-text-links :menu="导航栏" nav-class=" letter-spacing-100" mq-prefix="gt" />

      </div>
      <VPNavBarSearch class="search" />

      <q-btn class="header-btn" flat round :icon="主题图标" @click="docStore.toggleDark" />
    </q-toolbar>

  </q-header>
</template>

<script setup>
import { withBase } from 'vitepress'

import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'
function kk() {
  console.log("kkkkkkk");
}

// let 想修改的元素=document.body
let 想修改的元素 = document.documentElement //代表 HTML 文档中的 <html> 元素

const 加大字体 = () => {
  const fontSize = getComputedStyle(想修改的元素).fontSize;
  const currentSize = parseInt(fontSize);
  const newSize = currentSize + 1;
  // console.log(newSize);
  // 想修改的元素.style.fontSize = `$30px !important`;
  // 想修改的元素.setAttribute("style", "cursor: none !important;");
  想修改的元素.style.cssText = `font-size: ${newSize}px !important;`;


};
const 减小字体 = () => {
  const fontSize = getComputedStyle(想修改的元素).fontSize;
  const currentSize = parseInt(fontSize);
  const newSize = currentSize - 1;
  // console.log(newSize);
  // 想修改的元素.style.fontSize = `$30px !important`;
  // 想修改的元素.setAttribute("style", "cursor: none !important;");
  想修改的元素.style.cssText = `font-size: ${newSize}px !important;`;


};

// import { useQuasar } from 'quasar'
// const $q = useQuasar()
// $q.iconMapFn = (iconName) => {
//   if (iconName.startsWith('amtf-i-') === true) {
//     // 我们删除了 "app:" 部分
//     return {
//       cls: iconName
//     }
//   }
// }




import { normalizeLink } from '../../support/utils'
import DocHeaderTextLinks from './DocHeaderTextLinks.vue'

import { computed } from "vue";
import { mdiCompare, mdiFolderPound } from "@quasar/extras/mdi-v6";
// import 导航栏 from './导航栏.js'
import { useData } from 'vitepress'
const { theme } = useData()
const 导航栏 = theme.value.nav

import { useAmtf } from '../../utils/amtf.js'
const { 添加涟漪 } = useAmtf()

import { useDocStore } from "../store/index.js";
import { fasMoon } from "@quasar/extras/fontawesome-v6";
import { matWbSunny } from "@quasar/extras/material-icons";
const 主题图标 = computed(() =>
  docStore.$q.dark.isActive === false ? matWbSunny : fasMoon
);
const docStore = useDocStore();

// const logo = computed(() => {
//   const opt = docStore.$q.dark.isActive === true ? '-dark' : ''
//   return {
//     img: `/erpnext-biji/icons/amtf-ml128.png`,
//     // text: `https://cdn.quasar.dev/logo-v2/svg/logotype${opt}.svg`
//     text: `https://cdn.quasar.dev/logo-v2/svg/logotype${opt}.svg`
//   }
// })
const showThemeChanger = computed(() => docStore.$route.meta.dark !== true);
const hasToc = computed(
  () =>
    docStore.$route.meta.fullwidth !== true &&
    docStore.$route.meta.fullscreen !== true &&
    docStore.state.value.toc.length !== 0
);

</script>
<style scoped>
.主页时头部 {
  background: transparent !important;
  border-bottom: none;
}
</style>
<style lang="sass">
@import "@the/css/quasar.variables.scss"

.doc-header
  transition: none

  &__primary
    height: 72px
    border-bottom: 1px solid $separator-color

  &__secondary
    height: 55px


  &__logo-img
    border-radius: 50%

    &:hover
      // !important needed when used with flat cards
      box-shadow: 0 6px 6px 0 rgba($brand-primary, 0.28) !important
      transform: scale(1.03)

  &__logo
    padding-right: 24px

    &:hover
      // box-shadow: 0 8px 8px 0 rgba($dark, 0.2) !important
      // transform: scale(1.03)

  &__version
    color: #000
    border: 1px solid $brand-primary
    transition: none
    .q-focus-helper
      color: $brand-primary

  &__leftmost
    margin-left: -8px

  /**
    Spacers are used to align the links dead center
   */
  &__primary-left-spacer
    width: 198px
  &__secondary-left-spacer
    width: 296px

  @media (max-width: 320px)
    .q-btn
      font-size: 12px
    .q-btn--rectangle
      padding: 8px 2px 8px 10px !important

  @media (max-width: 1059px)
    &__logo-text
      display: none

  @media (max-width: 699px)
    .q-toolbar
      padding-left: 16px
      padding-right: 8px
    &__logo
      padding-right: 16px
    .doc-search
      width: 100%
  @media (min-width: 700px)
    .doc-search
      margin-left: 8px
      .doc-search__logo
        display: none

  &__links
    justify-content: end
    @media (min-width: 1921px)
      justify-content: center

.doc-header-menu
  letter-spacing: $letter-spacing-brand
  border: 1px solid $separator-color
  // font-size: ($font-size - 2px)
  box-shadow: none !important
  background-color: #fff

  .q-item
    height: 36px

  .q-item__label--header
    color: $brand-accent
    padding: 16px
    &:first-child
      padding-top: 8px
  .q-item__section--side .q-icon
    color: $brand-primary

  &__arrow
    margin-right: -8px

.doc-header-text-links__item
  .q-icon
    margin-left: 0

body.body--dark
  .doc-header__primary
    border-bottom-color: $separator-dark-color
  .doc-header-menu
    background: $dark-bg
    border-color: $separator-dark-color

  .doc-header
    &__version
      color: #fff

  .doc-header-icon-links
    color: $brand-primary

$mq-list: 510, 600, 750, 860, 910, 1000, 1060, 1130, 1190, 1300 /* drawer */, 1310, 1400
@each $query in $mq-list
  @media (min-width: #{$query}px)
    .lt-#{$query}
      display: none

  @media (max-width: #{$query - 1}px)
    .gt-#{$query}
      display: none
</style>
