<template>
  <div class="row justify-between">
    <div>
      <div class="bold">多选</div>
      <ve-checkbox-group v-model="checkboxGroupDefaultValue1">
        <ve-checkbox label="南瓜" />
        <ve-checkbox disabled label="西红柿" />
        <ve-checkbox label="哈密瓜" />
        <ve-checkbox label="水蜜桃" />
      </ve-checkbox-group>
      [{{ checkboxGroupDefaultValue1.join() }}]
    </div>
    <div>
      <div class="bold">全选</div>
      <div>
        <ve-checkbox @checked-change="handleCheckAll" :indeterminate="indeterminate" v-model="checkedAllModel"
          label="全选" />
        <br />
        <br />
      </div>

      <!-- <ve-checkbox-group v-model="checkboxGroupDefaultValue2" @on-checked-change="handleCheckGroupChange"> -->
      <ve-checkbox-group v-model="checkboxGroupDefaultValue2" @checked-change="handleCheckGroupChange">
        <ve-checkbox @checked-change="checkedChange" v-for="(item, index) in checkboxGroupInitValues"
          :disabled="item.disabled" :label="item.label" :key="index"></ve-checkbox>
      </ve-checkbox-group>
      <br />
      [{{ checkboxGroupDefaultValue2.join() }}]
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';

const checkboxGroupDefaultValue1 = ref(["西红柿", "哈密瓜"]);
const checkboxGroupInitValues = ref([
  { disabled: false, label: "南瓜" },
  { disabled: false, label: "西红柿" },
  { disabled: false, label: "哈密瓜" },
  { disabled: false, label: "水蜜桃" },
]);
const checkboxGroupDefaultValue2 = ref(["南瓜", "哈密瓜", "水蜜桃"]);
const indeterminate = ref(true);
const checkedAllModel = ref(false);

const hasAllChecked = computed(() => {
  return checkboxGroupInitValues.value.every((x) => {
    return checkboxGroupDefaultValue2.value.indexOf(x.label) > -1;
  });
});

const hasPartChecked = computed(() => {
  return checkboxGroupInitValues.value.some((x) => {
    return checkboxGroupDefaultValue2.value.indexOf(x.label) > -1;
  });
});

const checkAll = () => {
  console.log(`checkAll ing👇`)
  let all = checkboxGroupInitValues.value.map((item) => {
    return item.label;
  });
  checkboxGroupDefaultValue2.value = all;
};

const unCheckAll = () => {
  checkboxGroupDefaultValue2.value = [];
};

const handleCheckAll = () => {
  if (checkedAllModel.value) {
    checkAll();
  } else {
    unCheckAll();
  }
  indeterminate.value = false;
};

const handleCheckGroupChange = (val) => {
  console.log("handleCheckGroupChange  val", val);
  if (hasAllChecked.value) {
    checkedAllModel.value = true;
    indeterminate.value = false;
  } else if (hasPartChecked.value) {
    indeterminate.value = true;
  } else {
    indeterminate.value = false;
    checkedAllModel.value = false;
  }
};

const checkedChange = (val) => {
  console.log("子组件 checkedChange1::", val);
};
</script>
