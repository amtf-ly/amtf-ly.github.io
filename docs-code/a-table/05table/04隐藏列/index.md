# 列隐藏
+ 通过 `columnHiddenOption` 实现列隐藏功能
+ 你也可以通过实例方法控制列的隐藏与显示


## 默认隐藏 hobby 和 name 列
通过 `defaultHiddenColumnKeys`属性设置默认隐藏的列
<mr/>

## 实例方法
+ 通过实例方法 `hideColumnsByKeys(keys)`将列隐藏
+ 通过实例方法 `showColumnsByKeys(keys)`将隐藏的列显示
<dongtai/>


<script setup>
import mr from "./默认.vue";
import dongtai from "./动态.vue";

</script>