import { defineStore } from "pinia"
import axios from "axios"
import { withBase, useData } from "vitepress"

import { computed, onMounted, onUnmounted, reactive, ref, toRaw, watch } from "vue"

export const a4_store = defineStore("amtf", {
    // 为了完整类型推理，推荐使用箭头函数
    state: () => {
        const a4 = reactive({
            data: { 联系方式: "", 低调广告: [{}] },
            能量表: [{}],
        })

        // https://env-00jxgn6qwtfx.dev-hz.cloudbasefunction.cn/a_admin/getall_nengliang

        axios({
            method: "get",
            url: `https://env-00jxgn6qwtfx.dev-hz.cloudbasefunction.cn/a_admin/getall_nengliang`,
        })
            .then(({ data }) => {
                console.log("data :>> ", data)
                a4.能量表 = data.data
                return data
            })
            .catch(() => {
                // throw "出错……";
            })
            .catch(error => {
                console.error(error)
            })

        // const { page } = useData()
        // const relativePath = page.value.relativePath
        // let 是首页=(currentPath == "index.md")
        const 根路径 = location.origin
        axios({
            method: "get",
            url: `${根路径}/data.json`,
        })
            .then(({ data }) => {
                // console.log('data :>> ', data);
                a4.data = data
                return data
            })
            .catch(error => {
                // 直接开子页面请求路径会出错，忽略掉👉  https://laoyu.xin/su/data.json
                // throw "请在public文件夹下添加data.json配置文件";
                // 错误完全忽略，仅打印日志，不阻塞后续执行
                console.error("data.json 错误详情 👉", error)
                // 无需 throw，catch 捕获后不处理即可继续执行
            })

        axios({
            method: "get",
            url: `${根路径}/更新日志.json`,
        })
            .then(({ data }) => {
                // console.log('data :>> ', data);
                a4.更新日志 = data
            })
            .catch(() => {
                throw "请在public文件夹下添加更新日志.json配置文件"
            })
            .catch(error => {
                console.error(error)
            })

        return {
            a4,
        }
    },
})
