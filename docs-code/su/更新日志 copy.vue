<template>
  <div class="q-pa-md q-gutter-xs">
    <q-card>
      <q-card-section class="紫色渐变 text-white 表头">
        <div class="text-h5 text-center" id="createTitle2">湖南南腾家居——全屋定制价格表</div>
      </q-card-section>
      <q-card-section class="列表说明">
        <q-list bordered dense class="full-width" separator>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications_active" />
            </q-item-section>
            <q-item-section>本价格包含量尺、设计、基础五金(普通铰链、极简短拉手、极简衣通)、运输、安装费用</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications_active" />
            </q-item-section>
            <q-item-section>需另外加价项：灯带、玻璃门、铣型拉手、倒角拉手、长拉手、品牌铰链、石英石台面等等</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications_active" />
            </q-item-section>
            <q-item-section>悬空电视柜、悬空书桌，按米计价</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications_active" />
            </q-item-section>
            <q-item-section>衣柜深度超出600mm;鞋柜、酒柜、书柜、餐边柜、储物柜超出400mm,需按比例加价</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications_active" />
            </q-item-section>
            <q-item-section>付款比例及流程:10%量尺设计=>70%安排生产=>15%发货=>安装验收后5%</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="notifications_active" />
            </q-item-section>
            <q-item-section>交货周期25~30天(设计图确认后开始计算)</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

    </q-card>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount, onUnmounted, watchEffect } from "vue";
// const 是否弹窗 = ref(false)

const columns = [
  {
    name: "名称",
    label: "名称",
    align: "center",
    field: "名称",
    sortable: true,
  },
  {
    name: "单位",
    label: "单位",
    align: "center",
    field: "单位",
    sortable: true,
  },
  {
    name: "价格",
    label: "价格￥",
    align: "center",
    field: "价格",
    sortable: true,
  },
]
const columns其他 = [
  {
    name: "名称",
    label: "名称",
    align: "center",
    field: "名称",
    sortable: true,
  },
  {
    name: "规格",
    label: "规格",
    align: "center",
    field: "规格",
    sortable: true,
  },
  {
    name: "单位",
    label: "单位",
    align: "center",
    field: "单位",
    sortable: true,
  },
  {
    name: "价格",
    label: "价格￥",
    align: "center",
    field: "价格",
    sortable: true,
  },
]

const rows = [
  {
    名称: "国产多层实木柜体+国产欧松板PET柜门",
    单位: "平方米",
    价格: "680",
  },
  {
    名称: "兔宝宝柜体+国产欧松板PET柜门",
    单位: "平方米",
    价格: "740",
  },
  {
    名称: "兔宝宝柜体+进口博耐克柜门",
    单位: "平方米",
    价格: "800",
  },
]
const 其他rows = [
  {
    名称: "灯带电源",
    规格: "60W",
    单位: "个",
    价格: "60",
    备注: "1米灯带配10w"
  },
  {
    名称: "灯带",
    规格: "10*10",
    单位: "米",
    价格: "45",
  },
  {
    名称: "感应开关",
    规格: "感应、触摸、手扫、门控",
    单位: "个",
    价格: "38",
  },
  {
    名称: "玻璃门",
    单位: "平方米",
    价格: "298",
  },
  {
    名称: "推拉门",
    单位: "平方米",
    价格: "280",
  },
  {
    名称: "铣型长拉手",
    单位: "个",
    价格: "75",
  },
  {
    名称: "铣型短拉手",
    单位: "个",
    价格: "35",
  },
  {
    名称: "45斜边拉手",
    单位: "个",
    价格: "25",
  },
  {
    名称: "抽屉",
    单位: "个",
    价格: "80",
  },
  {
    名称: "品牌铰链",
    单位: "副",
    价格: "12",
  },

]
</script>
<style>
div {
  /* border: 1px solid blue !important; */
}
</style>

