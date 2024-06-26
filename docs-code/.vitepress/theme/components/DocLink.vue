<template>
  <a
    v-if="internal === true"
    v-bind="$attrs"
    class="doc-link"
    :to="to"
  >
    <slot />
  </a>
  <a
    v-else
    v-bind="$attrs"
    class="doc-link"
    :href="props.to"
    target="_blank"
    rel="noopener"
  >
    <slot />
    <q-icon :name="mdiLaunch" />
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { mdiLaunch } from '@quasar/extras/mdi-v6'

const props = defineProps({ to: String })
const internal = computed(() => props.to.charAt(0) === '/')
</script>

<style lang="sass">
@import "@the/css/quasar.variables.scss"
.doc-link
  color: $brand-primary
  text-decoration: none
  border-bottom: 1px dotted currentColor
  outline: 0
  transition: color $header-quick-transition

  &:hover
    color: inherit !important

  .q-icon
    margin-top: -2px
    margin-left: 4px
</style>
