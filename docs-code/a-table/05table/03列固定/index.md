## 列固定
+ 属性`scroll-width`为滚动区域的宽度
+ 当外层容器宽度小于`scroll-width`值时，将会出现横向滚动条；当外层容器宽度大于`scroll-width`值时，将会跟随容器自适应；当`scroll-width=0`时，滚动条将根据你的列宽度决定
+ 列宽可以不设置、或者设置为百分比、或者为像素值（px）
+ 如果设置了`scroll-width`属性，列宽单位一定要`保持一致`

## 左列固定
+ 通过`scroll-width="1200"`设置滚动区域宽度，通过`style="width:900px"`设置外层容器宽度
+ 通过`fixed:"left"`设置需要固定的左列
    <zgd />

## 右列固定
+ 通过`scroll-width="1200"`设置滚动区域宽度，通过`style="width:900px"`设置外层容器宽度
+ 通过`fixed:"right"`设置需要固定的右列
    <ygd />

## 左右列固定
结合上面的
    <zygd />




<script setup>
import zgd from "./左固定.vue";
import ygd from "./右固定.vue";
import zygd from "./左右固定.vue";

</script>