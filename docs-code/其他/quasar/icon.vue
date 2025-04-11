<template>
    <div class="row">
        <q-input v-model="filterKey" label="Filter" outlined clearable class="col-6" />
        <div class="col-12">
            <q-btn class="col-auto" v-for="(item) in 图标名" :icon="item" @click="copyIcon(item)">
                <q-tooltip anchor="top middle" self="center middle">
                    {{ item }}
                </q-tooltip>
            </q-btn>
        </div>

        <!-- <q-card-actions align="center">
          <q-pagination v-model="pagination.page" :max="pagination.max" />
      </q-card-actions> -->
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { copyToClipboard, useQuasar } from 'quasar'
import * as materialIcons from '@quasar/extras/material-icons'

const $q = useQuasar();
const filterKey = ref('')
const iconSet = materialIcons

// 下面是针对 material 和 fontawesome-v5 图标集的修改
// 驼峰转 - 连接,并且添加' fa-'前缀
function toLowerLine(str) {
    if (str.substr(0, 3) === 'mat') {
        let res = str.replace(/([A-Z]|\d+)/g, (a, l) => `_${l.toLowerCase()}`)
        res = res.substring(4)
        // if (res == 'r_mobiledata') {
        //     res = 'RMobiledata'
        // }
        return res
    }
    if (str.substr(0, 2) === 'fa') {
        return str.replace(/([A-Z]|\d+)/g, (a, l) => `-${l.toLowerCase()}`).replace(/-/, ' fa-')
    }
}

const 图标名 = computed(() => {
    let arr = []
    Object.keys(iconSet).map((key) => {
        let 图标名 = toLowerLine(key)
        if (filterKey.value !== "" && filterKey.value) {
            if (key.toLowerCase().includes('rmobiledata')) {
                console.log(`key 👉`, key)
            }
            let kk = key.toLowerCase().includes(filterKey.value.toLowerCase())
            if (kk) arr.push(图标名)
        } else {
            arr.push(图标名)
        }
        // return 图标名
    })
    return arr

    if (filterKey.value !== "" && filterKey.value) {
        dataList = dataList.filter(item => item.toLowerCase().includes(filterKey.value.toLowerCase()))
    }
    pagination.value = {
        page: pagination.value.page,
        max: Math.ceil(dataList.length / itemsPerPage.value)
    }
    const keyArray = dataList.slice((pagination.value.page - 1) * itemsPerPage.value, (pagination.value.page - 1) * itemsPerPage.value + itemsPerPage.value - 1)
    return filterObj(iconSet.value, keyArray)



})

const copyIcon = (key) => {
    if (key) {
        copyToClipboard(key).then(() => {
            $q.notify({
                type: 'positive',
                message: '复制' + ' ' + '成功' + ': ' + key,
            })
        }).catch(() => {
            $q.notify({
                type: 'negative',
                message: '复制' + ' ' + '成功',
            })
        })
    }
}

</script>