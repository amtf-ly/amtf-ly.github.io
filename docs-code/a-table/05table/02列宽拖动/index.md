## 设置
+ 通过`columnWidthResizeOption`设置列宽拖动功能
+ 建议设置`scroll-width=0`，那么当列宽总和大于容器宽度时，将会出横向滚动条
+ 通过`column.width` 设置列的默认宽度，如果所有列宽总和小于容器宽度，列宽度将会自适应
+ 通过 `minWidth`设置列拖动的最小宽度
+ 通过`sizeChange({ column, differWidth, columnWidth })`获取列拖动变化的回调信息
<index/>

## 禁用
以下示例，列 Col1、Col2、Col3 列宽拖动通过 `disableResizing`被禁用了
  <JY />


<script setup>
import index from "./a.vue"
import JY from "./禁用.vue";

</script>