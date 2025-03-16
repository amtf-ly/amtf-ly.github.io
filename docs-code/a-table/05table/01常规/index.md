## 宽度
+ 表格宽度可以设置固定值。如：`style="width:900px;"`
+ 表格宽度可以设置动态值。如：`style="width:calc(100vh - 210px)"` 或者 `style="width:80%"`
+ 如果不设置表格宽度，等同于`style="width:100%;"`
<index/>

## 高度
+ 表格高度默认由行数据决定，也可以通过 `max-height`属性设置最大高度
+ 表格高度可以设置固定值。如：`max-height="500"`
+ 表格高度可以设置动态值。如：`max-height="calc(100vh - 210px)"` 或者 `max-height="80%"`
<gaodu/>

## 边框
+ 通过`border-around=true` 设置外边框
+ 通过`border-x=true` 设置横向边框
+ 通过`border-y=true` 设置纵向边框
<biankuang/>

## 列宽
+ 当列宽不设置时，单元格宽度按照内容自动缩放
### 百分比
+ 当列宽设置百分比，单元格宽度按照百分比缩放
<liekuang/>

### 像素值
+ 当列宽设置素值（px），单元格宽度按照像素比缩放。如果不希望缩放，需要设置外层容器宽度
+ 设置像素值，记得不要加单位
<liekuangpx/>

## 长文显示
+ 当单元格文本内容过多时会破坏布局，此时可以通过样式 [word-break](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break) 控制
+ 也可以结合[单元格省略](/a-table/01icon/)功能一起使用
<changwen/>


<script setup>
import changwen from "./长文.vue"
import liekuangpx from "./列宽px.vue"
import liekuang from "./列宽.vue"
import index from "./a.vue"
import gaodu from "./a高度.vue"
import biankuang from "./边框.vue"
</script>