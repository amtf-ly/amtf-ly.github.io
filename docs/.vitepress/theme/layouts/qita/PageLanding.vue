<template>
    <!-- <doc-stars /> -->
  <VPHero></VPHero>

  <div class="q-pa-md row flex-center q-gutter-md">
    <q-card class="放大显影 南腾">
      <q-card-section class="紫色渐变 text-white">
        <div class="text-h6">全屋定制 </div>
        <div class="text-subtitle2">湖南南腾家居有限公司——踩坑越多，越相信菩萨这一法，能避一切定制坑：大肚能容，笑口常开~~</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat href="/全屋定制/一些案例"> 一些案例</q-btn>
        <q-btn flat href="/全屋定制/价格表"> 价格表</q-btn>
        <q-btn flat href="/全屋定制/报价表"> 报价表</q-btn>
      </q-card-actions>
    </q-card>
    <q-card class="放大显影 德林">
      <q-card-section class="紫色渐变 text-white">
        <div class="text-h6">德林拖拉机 </div>
        <div class="text-subtitle2">益阳市德林机械有限公司——为现代农业提供智能科技解决方案~~</div>

      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-field dense color="purple-12" label="服务热线" stack-label>
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">0737-2220268</div>
          </template>
        </q-field>

        <q-btn flat href="http://www.yydljx.cn/home" target="blank">中文官网</q-btn>
      </q-card-actions>
    </q-card>
    <q-card class="放大显影 ERPNext">
      <q-card-section class="紫色渐变 text-white">
        <div class="text-h6">ERPNext </div>
        <div class="text-subtitle2">官网宣传语——The most agile ERP on the planet <br> ERPNext is the world's best free and open
          source ERP</div>
        <q-separator color="orange" spaced="xs" />
        <div class="text-subtitle2">大意是说，敏捷、开源、免费</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat href="ERPNext/00-介绍"> 本站笔记</q-btn>
        <q-btn flat href="https://erpnext.com/" target="blank">英文官网</q-btn>
      </q-card-actions>
    </q-card>
    <q-card class="放大显影 ">
      <q-card-section class="紫色渐变 text-white">
        <div class="text-h6">Quasar</div>
        <div class="text-subtitle2">企业级跨平台 VueJs 框架</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat href="https://www.quasar-cn.cn/" target="blank">中文网</q-btn>
        <q-btn flat href="https://quasar.dev/" target="blank">英文官网</q-btn>
      </q-card-actions>
    </q-card>


    <q-card class="放大显影 ">
      <q-card-section class="紫色渐变 text-white">
        <div class="text-h6">jing空大师</div>
        <div class="text-subtitle2">人生难得，fo法难闻，百千万劫难遭遇</div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat href="https://www.amtb.cn/" target="blank">中文网</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import VPHero from './VPHero.vue'
import DocStars from 'src/components/DocStars.vue'

</script>


<style lang="scss">
.黄色渐变 {
  background: -webkit-linear-gradient(120deg, #86b91a 30%, #edd532);
  background: linear-gradient(120deg, #86b91a 30%, #edd532);
}

.color-green-gradient2 {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background: linear-gradient(315deg, #42d392 25%, #647eff);
}

.color-green-gradient3 {
  background: -webkit-linear-gradient(315deg, #51a256 25%, #f7d336);
  background: linear-gradient(315deg, #51a256 25%, #f7d336);
}

.紫色渐变 {
  background: -webkit-linear-gradient(120deg, #bd44fe 35%, #42d1ff);
  background: linear-gradient(120deg, #bd44fe 35%, #42d1ff);
}
</style>
<style lang="sass">
.放大显影
  width: 100%
  max-width: 350px
  transition: transform $header-quick-transition, box-shadow $header-quick-transition

  &:hover
    // !important needed when used with flat cards
    box-shadow: 0 8px 8px 0 rgba($dark, 0.2) !important
    transform: scale(1.05)
    z-index: 999

.dark
  .放大显影
    &:hover
      box-shadow: 0 4px 8px 0 rgba($brand-primary, 0.8) !important
</style>
<style scoped>
.q-btn {
  font-size: var(--最小字体) !important;
}
</style>
