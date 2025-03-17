## 表头固定
+ 属性`max-height`为表格的最大高度
+ 表格总高度大于`max-height`值时，表格将会出现纵向滚动条
+ 表格总高度小于`max-height`值时，表格将会高度自适应

## 开启
+ 通过`fixed-header="true"`设置开启表头固定。默认为`true`
+ 通过`max-height`设置表格最大高度
<mr />
<script setup>
import mr from "./默认.vue";

</script>