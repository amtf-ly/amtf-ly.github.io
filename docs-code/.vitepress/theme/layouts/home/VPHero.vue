<template>
  <div class="VPHero has-image VPHomeHero">
    <div class="container">
      <div class="main">
        <h1 class="clip动态渐变文字 文字放大显影 flex-center">大驾光临，蓬荜生辉</h1><!--v-if-->
        <div class="text-h2 my-10">欢迎来到Wellcome
          <span class="text-紫磨真金">老鱼客栈~~</span>
        </div>
        <div class="text-h4">主营业务:
          <span class="text-紫磨真金">鄙人从事软件开发工作，属于游击队形式，相对于正规军,技术和服务会差点，但是价格应该会低点，君请自酌~~具体可服务项目、价格，请移步👉<a
              href="https://sc.laoyu.xin" target="_blank" rel="noopener noreferrer">老鱼商城</a></span>
        </div>
        <div class="text-h4">莲手传递美好:
          <span class="text-紫磨真金">诚邀销售人才帮忙推广，提成5%~20%</span>
        </div>
        <!-- <q-list class="q-mb-lg a4.data.简介" bordered separator>
          <q-item clickable v-ripple dense v-for="i in a4.data.简介" :key="i.内容">
            <q-item-section avatar>
              <q-icon :name="i.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="i.内容"></q-item-label>
            </q-item-section>
          </q-item>
        </q-list> -->

        <!-- <a未完待续 :data="a4.data.未完待续项目" 标题="未完待续👇……" class="q-mb-lg" /> -->

        <!-- <q-btn-group push dense class="联系方式">
          <q-btn color="orange-2" glossy dense text-color="black" push :label="`微信群`" 
          @click="alert=!alert" 
          icon-right="a4weixin">
          </q-btn>
          <q-btn color="orange-4" glossy dense text-color="black" push :label="`bili`" :href="a4.data.联系方式.bili"
            target="_blank" />
        </q-btn-group> -->

        <q-btn-group push dense class="联系方式">
          <q-btn color="orange-5" glossy dense text-color="black" push :label="`商务洽谈-微信号:${a4.data.联系方式.微信}`"
            @click="复制(a4.data.联系方式.微信)" />
          <q-btn color="orange-8" glossy dense text-color="black" push :label="`B站主页-操作演示`" :href="a4.data.联系方式.bili"
            target="_blank" />
        </q-btn-group>

        <q-dialog v-model="alert" auto-close>
          <q-img src="wx.jpg" width="350px">
          </q-img>
        </q-dialog>
        <!-- <a收费服务 :data="收费服务项目" 标题="收费服务项目" /> -->
      </div>
      <div class="image 隐藏鼠标">
        <div class="image-container">
          <div class="image-bg"></div><img class="VPImage 无界 image-src " src="amtf-无量寿.png" alt="amtf图片不见了"
            @click="添加涟漪" @mousemove="鼠标移动">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { copyToClipboard } from 'quasar'
import { Notify } from 'quasar'

function 复制(params) {
  copyToClipboard(params)
    .then(() => {
      // 成功!
      Notify.create({
        message: params + '    已复制',
        position: 'center',
        closeBtn: true,
        timeout: 1000,
        type: "positive",
      })
    })
    .catch(() => {
      // 失败
    })

}

const active = ref(true)
import { ref, reactive, onMounted } from 'vue';
import { useAmtf } from '../../utils/amtf.js'
// import { 收费服务项目 } from '/data.js?url';

import a未完待续 from './未完待续.vue'
// import a收费服务 from './收费服务.vue'
const { 添加涟漪 } = useAmtf()
const alert = ref(false)

let throttleTimeout;
function 鼠标移动(e) {
  // 添加涟漪(e)
  // 清除之前设置的定时器，确保不会在短时间内连续触发
  clearTimeout(throttleTimeout);
  // 设置新的定时器，0.2秒后执行处理函数
  throttleTimeout = setTimeout(function () {
    添加涟漪(e)
  }, 12); // 200毫秒 = 0.2秒
}


// function 鼠标移动(e) {
//   console.log(`e 👉`,e)

// }

import { withBase, useData } from 'vitepress'
import axios from "axios";

import { a4_store } from '@the/stores/amtf_store'
const {
  a4
} = a4_store()


// const 简介 = ref([{}, {}])
// const 收费服务项目 = ref([])
// const 未完待续项目 = ref([])
// const a4.data.联系方式 = ref({})

// onMounted(() => {
//   axios({
//     method: "get",
//     url: `${withBase('data.json')}`
//   })
//     .then(({ data }) => {
//       // console.log('data :>> ', data);
//       收费服务项目.value = data.收费服务项目
//       未完待续项目.value = data.未完待续项目
//       简介.value = data.简介
//       a4.data.联系方式.value = data.a4.data.联系方式
//       // console.log('简介 :>> ', 简介.value);
//       // console.log('简介 :>> ', 简介.value[0]);
//       return data;
//     })
//     .catch(() => {
//       throw "请在public文件夹下添加platform-config.json配置文件";
//     });
// })


</script>

<style scoped>
.VPHero {
  .my-10 {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .image-src,
  .image-bg {
    max-height: 480px;
  }

  .image-src {
    transition: transform .5s cubic-bezier(0.18, 0.89, 0.32, 1.28);

    &:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
}

.VPHero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
  padding-bottom: 10px !important;
}

@media (min-width: 640px) {
  .VPHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}


@media (min-width: 960px) {
  .VPHero {
    padding: 64px 64px 64px;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .container {
    flex-direction: row;
  }
}

.main {
  position: relative;
  z-index: 10;
  order: 2;
  flex-grow: 1;
  flex-shrink: 0;
}

.VPHero.has-image .container {
  text-align: center;
}

@media (min-width: 960px) {
  .VPHero.has-image .container {
    text-align: left;
  }
}

@media (min-width: 960px) {
  .main {
    order: 1;
    width: calc((100% / 3) * 2);
  }

  /* .VPHero.has-image .main {
    max-width: 592px;
  } */
}

.actions {
  display: flex;
  flex-wrap: wrap;
  margin: -6px;
  padding-top: 24px;
}

.VPHero.has-image .actions {
  justify-content: center;
}

@media (min-width: 640px) {
  .actions {
    padding-top: 32px;
  }
}

@media (min-width: 960px) {
  .VPHero.has-image .actions {
    justify-content: flex-start;
  }
}

.action {
  flex-shrink: 0;
  padding: 6px;
}

.image {
  order: 1;
  margin: -76px -24px -48px;
}

@media (min-width: 640px) {
  .image {
    margin: -108px -24px -48px;
  }
}

@media (min-width: 960px) {
  .image {
    flex-grow: 1;
    order: 2;
    margin: 0;
    min-height: 100%;
  }
}

.image-container {
  position: relative;
  margin: 0 auto;
  width: 380px;
  height: 380px;
}

@media (min-width: 640px) {
  .image-container {
    width: 380px;
    height: 380px;
  }
}

@media (min-width: 960px) {
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 380px;
    /*rtl:ignore*/
    transform: translate(0px, 64px);
  }
}

.image-bg {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  /*rtl:ignore*/
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  .image-bg {
    width: 256px;
    height: 256px;
  }
}

@media (min-width: 960px) {
  .image-bg {
    width: 320px;
    height: 320px;
  }
}

:deep(.image-src) {
  position: absolute;
  top: 50%;
  /*rtl:ignore*/
  left: 50%;
  max-width: 192px;
  max-height: 192px;
  /*rtl:ignore*/
  transform: translate(-50%, -50%);
}

@media (min-width: 640px) {
  :deep(.image-src) {
    max-width: 320px;
    max-height: 320px;
  }
}

@media (min-width: 960px) {
  :deep(.image-src) {
    max-width: 480px;
    max-height: 480px;
  }
}
</style>
