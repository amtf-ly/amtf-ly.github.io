<template>
  <div class="doc-page-footer doc-brand">

    <div class="doc-page-footer__copyright text-center q-pa-lg letter-spacing-100">
      <div>
        大肚能容，笑口常开<br>到底了~~
      </div>
    </div>
  </div>
</template>

<style lang="sass">
@import "@the/css/quasar.variables.scss"
.doc-page-footer
  position: relative
  background-color: $void-suit
  width: 100%
  z-index: 1
  border-top: 1px solid $separator-color

  &__margin
    margin-left: 6px

  .doc-layout__item,
  &__title
    font-size: ($font-size - 2px)

  &__nav
    display: grid
    grid-row-gap: 64px
    grid-column-gap: 32px
    padding: 64px 32px
    grid-template-columns: 1fr

    @media (min-width: 720px)
      padding-left: 64px
      padding-right: 64px
      grid-template-columns: repeat(2, 1fr)

    @media (min-width: 830px)
      grid-column-gap: 64px

    @media (min-width: 1070px)
      padding-top: 100px
      padding-bottom: 100px
      grid-row-gap: 64px
      grid-template-columns: repeat(3, 1fr)

    @media (min-width: 1417px)
      grid-template-columns: repeat(4, 1fr)

    @media (min-width: 2060px)
      grid-template-columns: repeat(5, 1fr)

  &__copyright
    font-size: ($font-size - 2px)

body.body--dark
  .doc-page-footer
    background-color: $floating-rock
    border-top-color: $separator-dark-color
</style>
