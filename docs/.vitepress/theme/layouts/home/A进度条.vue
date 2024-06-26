<template>
  <!-- <q-linear-progress size="25px" :value="item.进度" stripe>
    <div class="absolute-full flex flex-center">
      <q-badge color="white" text-color="accent" :label="进度标签" />
    </div>
  </q-linear-progress> -->

  <!-- <el-progress :text-inside="true" :stroke-width="20" :percentage="item.进度 * 100" striped striped-flow /> -->

  <div class="el-progress el-progress--line el-progress--text-inside" role="progressbar" aria-valuenow="50"
    aria-valuemin="0" aria-valuemax="100">
    <div class="el-progress-bar">
      <div class="el-progress-bar__outer" style="height: 20px;">
        <div class="el-progress-bar__inner el-progress-bar__inner--striped el-progress-bar__inner--striped-flow"
          style="width: 50%; animation-duration: 3s;">
          <div class="el-progress-bar__innerText"><span>50%</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ElProgress } from 'element-plus'

const props = defineProps(['item'])
import { computed } from 'vue';

</script>
<style lang="scss">
@import "@the/css/quasar.variables.scss";

.el-progress {
  align-items: center;
  display: flex;
  line-height: 1;
  position: relative;
}

.el-progress--text-inside .el-progress-bar {
  margin-right: 0;
  padding-right: 0;
}

.el-progress-bar {
  box-sizing: border-box;
  flex-grow: 1;
}

.el-progress-bar__outer {
  background-color: $grey-4;
  border-radius: 100px;
  height: 6px;
  overflow: hidden;
  position: relative;
  vertical-align: middle;
}

.el-progress-bar__inner--striped.el-progress-bar__inner--striped-flow {
  -webkit-animation: striped-flow 3s linear infinite;
  animation: striped-flow 3s linear infinite;
}

.el-progress-bar__inner--striped {
  background-image: linear-gradient(45deg, rgba(0, 0, 0, .1) 25%, transparent 0, transparent 50%, rgba(0, 0, 0, .1) 0, rgba(0, 0, 0, .1) 75%, transparent 0, transparent);
  background-size: 1.25em 1.25em;
}

.el-progress-bar__inner {
  background-color: $primary;
  border-radius: 100px;
  height: 100%;
  left: 0;
  line-height: 1;
  position: absolute;
  text-align: right;
  top: 0;
  transition: width .6s ease;
  white-space: nowrap;
}

.el-progress-bar__innerText {
  color: #ffffff;
  display: inline-block;
  font-size: 12px;
  margin: 0 5px;
  vertical-align: middle;
}

@keyframes striped-flow {

  0% {
    background-position: -100%;
  }

  100% {
    background-position: 100%;
  }
}
</style>