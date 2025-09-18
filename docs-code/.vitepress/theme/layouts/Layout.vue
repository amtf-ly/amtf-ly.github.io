<template>
  <q-layout class="doc-layout doc-technical" view="hHh LpR lff" @scroll="docStore.onPageScroll">
    <doc-stars />
    <Header />

    <q-page-container>
      <q-page :class="pageClass" key="q-page">
        <Page404 v-if="page.isNotFound" />
        <Home v-if="frontmatter.layout === 'home'" />

        <div id="页面顶层div" v-else :class="pageContentClass" key="page-standard">
          <Page />
          <!-- <Content /> -->
        </div>

        <div class="col" />
        <doc-page-footer :fullscreen="docStore.state.value.isFullscreen" />

        <!-- Modal -->
        <div class="zoom-overlay">
          <img id="zoomed-image" src="" alt="Zoomed Image">
        </div>

      </q-page>
    </q-page-container>

    <q-page-scroller>
      <q-btn fab-mini color="brand-accent" :icon="mdiArrowUp" />
    </q-page-scroller>

    <q-no-ssr>
      <A侧边栏DocDrawerMenu />
      <doc-drawer-toc />
    </q-no-ssr>
  </q-layout>
</template>

<script setup>
// console.log(`process👉`,process)
import { use图标 } from '@the/utils/amtf'
use图标()

import Home from './home/home.vue'
// import Page404 from './Page404.vue'
// import Page from './qita/DocPage.vue'
import { defineAsyncComponent } from 'vue'
const Page = defineAsyncComponent(() => import('./qita/DocPage.vue'))
const Page404 = defineAsyncComponent(() => import('./Page404.vue'))

import { useData } from 'vitepress'
const { page, frontmatter } = useData()

import DocStars from '@the/components/DocStars.vue'

import { computed, watch, onMounted } from 'vue'
import { mdiArrowUp } from '@quasar/extras/mdi-v6'

import { provideDocStore } from './store/index.js'
const docStore = provideDocStore()

// 不应该是use吗？ @scroll="docStore.onPageScroll"为什么会报错？
// import { useDocStore } from './store/index.js'
// const docStore = useDocStore()

import Header from './header/header.vue'
import A侧边栏DocDrawerMenu from './qita/A侧边栏DocDrawerMenu.vue'
import DocDrawerToc from './qita/DocDrawerToc.vue'
// import DocPageMenu from './qita/DocPageMenu.js'
import DocPageFooter from './qita/DocPageFooter.vue'


// const isFullscreen = computed(() => docStore.$route.meta.fullscreen === true)
// const isFullscreen = computed(() => true)
const pageClass = computed(() => `doc-layout__page-el--${docStore.state.value.isFullscreen === true ? 'fullscreen' : 'standard'}`)
const pageContentClass = computed(() =>
  'doc-layout__page row no-wrap justify-start ' +
  `doc-layout__page--${docStore.state.value.isFullscreen === true ? 'fullwidth' : 'standard'}`
)

// watch(isFullscreen, val => {
//   console.log("isFullscreen",val);
//   docStore.state.value.menuDrawer = false
// })
// import 监听图片点击 from './监听图片点击';
// onMounted(() => {
//   // console.log('onmouted :>> ');
//   // 获取图片和模态窗口元素
//   try {
//     监听图片点击()
//   } catch (error) {
//   }
// })


</script>
<style>
.zoom-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  text-align: center;
  overflow: auto;
}

.zoom-overlay img {
  max-width: 98%;
  padding: 20px 0px;
  height: auto;
  cursor: zoom-out;
  margin:0 auto
}

</style>

<style lang="sass">
@import "@the/css/quasar.variables.scss"
.doc-layout

  .q-page-container :target
    scroll-margin-top: $header-height

  // keep the button on top of sticky in examples
  .q-page-scroller > .q-page-sticky
    z-index: 1

  &__page
    width: 100%

    &--standard
      /**
          16px  - left menu margin
        + 330px - left menu
        + 1200px - page content
        + 300px - toc menu
       */
      max-width: 2500px

      .doc-page__content
        width: auto
        min-width: 0
        flex: 10000 1 0%
        max-width: 1200px

        > div, > pre
          margin-bottom: 22px

      @media (max-width: 1845px)
        justify-content: start
        .doc-page__toc-container--flowing
          display: none
      @media (min-width: 1846px)
        .doc-layout__menu-container
          flex: 1 0 auto
          width: auto
          min-width: 0
          max-width: 100%

    &--fullwidth

      .doc-page__content
        width: 100%

      .doc-page__toc-container
        display: none

  &__page-el--standard
    display: flex
    flex-direction: column
    align-items: center

  &__menu
    position: sticky
    top: $header-height
    height: calc(100vh - #{$header-height})
    width: 330px
    min-width: 330px
    border-right: 1px solid $separator-color

    .doc-page-menu
      padding: 32px 16px 32px 0 // page top padding

  &__item.q-item,
  &__item .q-item
    letter-spacing: $letter-spacing-brand
    border-radius: 10px
    margin-top: 2px
    min-height: 30px
    padding: 0 4px 0 6px
    color: $light-text
    transition: none
    &:hover
      color: #000 !important // $header-btn-hover-color--light makes little difference

    .q-item__section
      padding-top: 2px
      padding-bottom: 2px
    &.q-item--dark
      color: $dark-text
      &:hover
        color: $header-btn-hover-color--dark !important

    .q-item__section--main ~ .q-item__section--side
      padding-left: 4px

  &__item .q-expansion-item > .q-expansion-item__container > .q-item .q-item__label
    padding-left: 8.5px

  &__item--active
    color: $brand-primary !important
    background: scale-color($primary, $lightness: 90%)
    &.q-item--dark
      background: scale-color($primary, $lightness: -50%)

@media (max-width: 1300px)
  .doc-layout__menu,
  .doc-page__toc-container--flowing
    // let's position them off-screen
    // instead of "display: none"
    // so that QScrollArea won't compute the size uselessly
    position: fixed
    left: -1000px
    top: 0

.doc-drawer
  // only show the shadow when the drawer is open
  .q-drawer:not(.q-layout--prevent-focus) &
    box-shadow: 0 0 6px 3px $separator-color

  &__header
    position: sticky
    top: 0
    z-index: 1
    background: linear-gradient(to bottom, #fff 0%, #fff 75%, transparent)

body.body--dark
  .doc-layout__menu
    border-right-color: $separator-dark-color

  // only show the shadow when the drawer is open
  .q-drawer:not(.q-layout--prevent-focus) .doc-drawer
    box-shadow: 0 0 6px 3px $brand-primary
  .doc-drawer__header
    background: linear-gradient(to bottom, $dark 0%, $dark 75%, transparent)
</style>
