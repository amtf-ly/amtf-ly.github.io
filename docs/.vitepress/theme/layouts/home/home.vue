<template>
  <!-- <doc-stars /> -->
  <VPHero></VPHero>

  <div class="q-pa-md row flex-center q-gutter-md">
    <q-card class="放大显影 金牌赞助">
      <q-card-section class="紫色渐变 text-white">
        <div class="小字">
          辣椒
          <q-badge color="amber" text-color="black" floating class="小字">
            <q-icon name="a4lianhuafo" class="q-mr-sm 中字" />
            金牌赞助
          </q-badge>
        </div>
      </q-card-section>
      <q-card-section>
        <q-img src="imgs/辣椒.jpg" height="250px" fit="scale-down">
          <div class="absolute-bottom 小字 transparent text-center">
            姐只是个传说……
          </div>
        </q-img>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat :href="withBase('/')" dense>传说……</q-btn>
      </q-card-actions>
    </q-card>

    <A广告 :data="a4.data.低调广告[0]" />
    <A三仙湖 />
    <A裕民机械 />

    <q-card class="放大显影 德林">
      <q-card-section class="紫色渐变2 text-white">
        <div class="小字">
          德林机械
          <q-badge color="amber-3" text-color="black" floating class="小字">
            <q-icon name="a4laba" class="q-mr-sm 中字" />
            低调广告
          </q-badge>
        </div>
      </q-card-section>
      <q-card-section>
        <q-img src="imgs/德林机械.jpg" height="250px" fit="cover">
          <div class="absolute-bottom 小字">为现代农业提供智能科技解决方案</div>
        </q-img>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-field dense color="purple-12" label="服务热线" stack-label>
          <template v-slot:prepend>
            <q-icon name="phone" />
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              0737-2220268
            </div>
          </template>
        </q-field>

        <q-btn flat dense href="http://www.yydljx.cn/home" target="blank"
          >中文官网</q-btn
        >
      </q-card-actions>
    </q-card>

    <q-card class="放大显影 jing空大师">
      <q-card-section class="紫色渐变 text-white">
        <div class="小字">
          jing空大师
          <q-badge color="amber-3" text-color="black" floating class="小字">
            <q-icon name="a4laba" class="q-mr-sm 中字" />
            低调广告
          </q-badge>
        </div>
      </q-card-section>
      <q-card-section>
        <q-img src="imgs/jingkongdashi.jpg" height="250px" fit="scale-down">
          <div class="absolute-bottom 小字">
            人生难得，fo法难闻，百千万劫难遭遇
          </div>
        </q-img>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat dense href="https://www.amtb.cn/" target="blank"
          >中文官网</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import A广告 from "./A广告.vue";
import A三仙湖 from "./A三仙湖.vue";
import A裕民机械 from "./A裕民机械.vue";
import vDraggable from "../../components/draggable";
import { ref, onMounted } from "vue";
import axios from "axios";

import { a4_store } from '@the/stores/amtf_store'
const {
		a4
	} = a4_store()

// const 低调广告 = ref([{}]);

// onMounted(() => {
//   axios({
//     method: "get",
//     url: `${withBase("data.json")}`,
//   })
//     .then(({ data }) => {
//       console.log("data.低调广告 :>> ", data.低调广告);
//       低调广告.value = data.低调广告;
//     })
//     .catch(() => {
//       throw "请在public文件夹下添加platform-config.json配置文件";
//     });
// });

function 变化了(params) {
  // console.log("变化了", params)
}
const 项目列表 = { 怡海星城: 7, 明发阅江悦府: 13, 雍景府: 9, 阳光城溪山悦: 5 };
const slide = ref("怡海星城1");
const fullscreen = ref(false);
const autoplay = ref(true);
const fabPos = ref([180, 18]);
const draggingFab = ref(false);
function moveFab(ev) {
  draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;
  // fabPos.value = [fabPos.value[0] + ev.delta.x, fabPos.value[1] + ev.delta.y]
}

import { withBase } from "vitepress";
import VPHero from "./VPHero.vue";
</script>
<style>
.q-carousel__slide {
  background-size: auto 100% !important;
  background-repeat: no-repeat;
}

.kk {
  left: 50%;
  top: 8px;
  transform: translate(-50%, 0);
}
</style>

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
.紫色渐变2 {
  background: -webkit-linear-gradient(120deg, #bd43fe80 35%, #42d0ff80);
  background: linear-gradient(120deg, #bd43fe80 35%, #42d0ff80);
}
</style>
