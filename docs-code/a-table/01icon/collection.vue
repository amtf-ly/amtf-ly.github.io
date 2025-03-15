<template>
  <div class="icon-container">
    <div v-for="iconName in iconList" :key="iconName" class="icon-item">
      <div class="icon-item-comp">
        <ve-icon :name="iconName" />
      </div>
      <span class="icon-name">{{ iconName }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 响应式图标列表（自动推导类型）
const icons = ref({
  FILTER: "filter",
  DOUBLE_RIGHT_ARROW: "double-right-arrow",
  DOUBLE_LEFT_ARROW: "double-left-arrow",
  TOP_ARROW: "top-arrow",
  RIGHT_ARROW: "right-arrow",
  BOTTOM_ARROW: "bottom-arrow",
  LEFT_ARROW: "left-arrow",
  SORT_TOP_ARROW: "sort-top-arrow",
  SORT_BOTTOM_ARROW: "sort-bottom-arrow",
  SEARCH: "search",
});

// 计算属性优化遍历（避免每次渲染都执行 Object.values）
const iconList = computed(() => Object.values(icons.value));
</script>

<!-- <style lang="scss" scoped> -->
<style lang="scss">
.icon-container {
  display: flex;
  flex-wrap: wrap;

  .icon-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;

    .icon-item-comp {
      display: inline-flex;
      align-items: center;
      height: 50px;

      >i {
        font-size: 35px;
      }
    }

    .icon-name {
      display: inline-block;
      height: 30px;
      color: #99a9bf;
      margin-top: 8px; // 增加间距更美观
    }

    &:hover {
      color: #2196f3;

      .icon-name {
        color: #2196f3;
      }
    }
  }
}
</style>