<template>
  <div class="VPDoc doc-page__content">
    <div v-if="props.overline" class="doc-page__overline text-brand-primary">{{ props.overline }}</div>

    <!-- <div class="doc-heading doc-h1" id="introduction" v-if="props.heading">
      <div class="row items-center q-gutter-sm">
        <div>{{ props.title }}</div>
        <q-badge v-if="props.badge" :label="props.badge" />
      </div>

      <q-space />

      <q-btn
        v-if="props.editLink"
        class="self-start q-ml-sm"
        :href="editHref" target="_blank" rel="noopener noreferrer"
        flat
        round
        color="brand-primary"
        :icon="mdiPencil"
      >
        <q-tooltip class="row no-wrap items-center">
          <span>Caught a mistake? Edit page in browser</span>
          <q-icon class="q-ml-xs" :name="mdiFlash" size="2em" />
        </q-tooltip>
      </q-btn>
    </div> -->

    <Content class="vp-doc" />
    <slot />

    <div class="doc-page__nav doc-page__nav--footer" v-if="control.prev?.link || control.next?.link">
      <div class="q-gutter-sm flex">
        <VPLink v-if="control.prev?.link" :href="control.prev.link"
          class="q-link doc-page__related rounded-borders cursor-pointer column justify-center"
          :class="'doc-page__related--left'">
          <div class="doc-page__nav-categ">{{ theme.docFooter?.prev || '上一页' }}</div>
          <div class="doc-page__nav-name text-weight-bold">{{ control.prev.text }}</div>
        </VPLink>
        <VPLink v-if="control.next?.link" :href="control.next.link"
          class="q-link doc-page__related rounded-borders cursor-pointer column justify-center"
          :class="'doc-page__related--right'">
          <div class="doc-page__nav-categ">{{ theme.docFooter?.next || '下一页' }}</div>
          <div class="doc-page__nav-name text-weight-bold">{{ control.next.text }}</div>
        </VPLink>
      </div>
    </div>

    <q-separator class="q-mt-lg" />
    <div class=" row" v-if="hasEditLink || hasLastUpdated">
      <div v-if="hasLastUpdated" class="last-updated">
        <VPDocFooterLastUpdated />
      </div>

      <div class="q-ml-lg" v-if="hasEditLink">
        <span>发现错误了?……</span>
        <doc-link class="q-ml-xs" :to="editLink.url">{{ editLink.text }}</doc-link>
      </div>
    </div>
  </div>
  <!-- aaaaa{{docStore.state.value.toc}} -->
  <!-- aaaaa{{tocClass}} -->
  <div class="doc-page__toc-container col-grow row justify-center gt-sm" :class="tocClass">
    <q-scroll-area class="doc-page__toc-area">
      <A页面目录DocPageToc />
    </q-scroll-area>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useEditLink } from '../../composables/edit-link'
import { usePrevNext } from '../../composables/prev-next'
import VPLink from '../../components/VPLink.vue'
import VPDocFooterLastUpdated from '../../components/VPDocFooterLastUpdated.vue'

const { theme, page, frontmatter } = useData()

const editLink = useEditLink()
const control = usePrevNext()
// console.log(`control👉`, control)

const hasEditLink = computed(() => {
  return theme.value.editLink && frontmatter.value.editLink !== false
})
const hasLastUpdated = computed(() => {
  return page.value.lastUpdated && frontmatter.value.lastUpdated !== false
})
const showFooter = computed(() => {
  return hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next
})



import { useMeta } from 'quasar'

import {
  mdiPencil,
  mdiFlash,
  mdiLaunch
} from '@quasar/extras/mdi-v6'

import DocLink from '../../components/DocLink.vue'
import A页面目录DocPageToc from './A页面目录DocPageToc.vue'

import getMeta from '../../assets/get-meta.js'
import { useDocStore } from '../store/index.js'

const props = defineProps({
  title: String,
  desc: String,
  overline: String,
  badge: String,

  heading: Boolean,
  editLink: String,

  toc: Array,
  related: Array,
  nav: Array,

  scope: Object
})

useMeta(
  props.desc !== void 0
    ? { title: props.title, meta: getMeta(props.title + ' | Quasar Framework', props.desc) }
    : { title: props.title }
)

const docStore = useDocStore()
// docStore.setToc(props.toc)

const tocClass = computed(() => {
  // console.log(`docStore.state.value.toc👉`, docStore.state.value.toc)
  // console.log(`docStore.state.value.toc !== void 0👉`, docStore.state.value.toc !== void 0)
  return `doc-page__toc-container--${docStore.state.value.toc !== void 0 ? 'fixed' : 'flowing'}`

}

)

import { onMounted } from 'vue'
import 监听图片点击 from '../监听图片点击';
onMounted(() => {

  // var links = document.head.getElementsByTagName('link');

  // // 遍历每个link元素
  // for (var i = 0; i < links.length; i++) {
  //   var link = links[i];

  //   // 检查link元素是否有href属性且包含'/amtf-laoyu/'
  //   if (link.href && link.href.includes('/amtf-laoyu/')) {
  //     // 替换href属性值
  //     link.href = link.href.replace('/amtf-laoyu/', '/');
  //   }
  // }

  try {
    监听图片点击()
  } catch (error) {
  }
})
</script>

<style lang="sass">
@import "@the/css/quasar.variables.scss"
// @import "@the/css/app.sass"

.doc-page
  &__content
    padding: 50px 25px
    line-height: 1.5em

    @media (max-width: 1300px)
      padding: 32px
    @media (max-width: 850px)
      padding: 32px 16px

    > .q-btn
      background: $brand-accent
      color: #fff
      font-weight: 700
      font-size: $font-size
      letter-spacing: $letter-spacing-brand
      padding: 8px 16px
      text-transform: none
      .on-right
        margin-left: 8px
      .on-left
        margin-right: 8px

  &__toc-container
    position: sticky
    top: $header-height
    height: calc(100vh - #{$header-height})

    &--fixed
      .doc-page__toc
        padding: 32px 16px 32px 0 // page top padding

  &__toc-container
    min-width: 300px !important
  &__toc-area
    width: 300px

  // 页面目录
  &__toc
    font-size: ($小字*0.8)

  &__overline
    letter-spacing: $letter-spacing-brand
    margin-bottom: 0 !important
    & + h1
      margin-top: 0 !important
      padding-top: 0 !important

  &__related
    transition: color $header-transition
    word-break: break-word
    line-height: 1.4em
    padding: 16px 20px

    &:hover
      color: $brand-primary !important

    &--left
      justify-content: flex-start
      text-align: left
      .doc-page__nav-name:before
        content: '« '
        font-size: 1.2em

    &--right
      justify-content: flex-end
      text-align: right
      .doc-page__nav-name:after
        content: ' »'
        font-size: 1.2em

  &__nav
    color: $brand-primary

    &--footer
      margin: 68px 0 0
      margin-bottom: 0 !important

    & + &
      margin-top: 0

    &-categ
      font-size: .9em

    &-name
      letter-spacing: $letter-spacing-brand

body.body--light .doc-page
  &__related
    color: $light-text
    background: $void-suit
    border: 1px solid $void-suit // match dark to avoid page reflow

  &__toc-container .q-item
    color: $header-btn-color--light

body.body--dark .doc-page
  &__related
    color: $dark-text
    background: $dark-pill
    border: 1px solid $brand-primary

  &__nav-name
    color: $brand-primary

  &__toc-container .q-item
    color: $header-btn-color--dark
</style>
