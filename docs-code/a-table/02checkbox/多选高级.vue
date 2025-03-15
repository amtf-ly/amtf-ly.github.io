<template>
  <div>
    <div class="bold">全选</div>

    <div>
      <ve-checkbox @on-checked-change="handleCheckAll" :indeterminate="dt.indeterminate" v-model="dt.checkedAllModel"
        label="全选"></ve-checkbox>
      <br />
      <br />
    </div>

    <ve-checkbox-group v-model="dt.checkboxGroupDefaultValue" @on-checked-change="handleCheckGroupChange">
      <ve-checkbox v-for="(item, index) in dt.checkboxGroupInitValues" :disabled="item.disabled" :label="item.label"
        :key="index"></ve-checkbox>
    </ve-checkbox-group>
    <br />
    [{{ dt.checkboxGroupDefaultValue.join() }}]
  </div>
</template>
<script setup>
import { reactive, computed } from 'vue';

const dt = reactive({
  checkboxGroupInitValues: [
    { disabled: false, label: "南瓜" },
    { disabled: true, label: "西红柿" },
    { disabled: false, label: "哈密瓜" },
    { disabled: false, label: "水蜜桃" },
    { disabled: true, label: "哈密瓜2" },
    { disabled: false, label: "水蜜桃2" },
  ],
  checkboxGroupDefaultValue: ["南瓜", "哈密瓜", "水蜜桃", "哈密瓜2"],
  indeterminate: true,
  checkedAllModel: false,
});

const hasAllChecked = computed(() => {
  return dt.checkboxGroupInitValues.every((x) => {
    return dt.checkboxGroupDefaultValue.indexOf(x.label) > -1;
  });
});

const hasPartChecked = computed(() => {
  return dt.checkboxGroupInitValues.some((x) => {
    return dt.checkboxGroupDefaultValue.indexOf(x.label) > -1;
  });
});

const disabledChecked = computed(() => {
  let result = [];
  dt.checkboxGroupInitValues.filter((x) => {
    if (x.disabled && dt.checkboxGroupDefaultValue.indexOf(x.label) > -1) {
      result.push(x.label);
    }
  });
  return result;
});

const disabledUnChecked = computed(() => {
  let result = [];
  dt.checkboxGroupInitValues.filter((x) => {
    if (x.disabled && dt.checkboxGroupDefaultValue.indexOf(x.label) === -1) {
      result.push(x.label);
    }
  });
  return result;
});

function checkAll() {
  let all = dt.checkboxGroupInitValues.map((item) => {
    return item.label;
  });
  if (disabledUnChecked.value.length > 0) {
    all = all.filter((x) => {
      return disabledUnChecked.value.indexOf(x) === -1;
    });
    dt.indeterminate = true;
    dt.checkedAllModel = false;
  } else {
    dt.indeterminate = false;
    dt.checkedAllModel = true;
  }
  dt.checkboxGroupDefaultValue = all;
}

function unCheckAll() {
  dt.checkboxGroupDefaultValue = disabledChecked.value;
  if (disabledChecked.value.length > 0) {
    dt.indeterminate = true;
  } else {
    dt.indeterminate = false;
  }
  dt.checkedAllModel = false;
}

function handleCheckAll() {
  if (dt.checkedAllModel) {
    checkAll();
  } else {
    unCheckAll();
  }
}

function handleCheckGroupChange() {
  console.log(1111);
  if (hasAllChecked.value) {
    dt.checkedAllModel = true;
    dt.indeterminate = false;
  } else if (hasPartChecked.value) {
    dt.indeterminate = true;
  } else {
    dt.indeterminate = false;
    dt.checkedAllModel = false;
  }
}
</script>
