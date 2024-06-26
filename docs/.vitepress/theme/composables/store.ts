// import { useSidebar } from "vitepress/theme"

import { ref } from "vue"
import { Router } from "vitepress/dist/client"
// 全局状态，创建在模块作用域下
import 监听图片点击 from '../layouts/监听图片点击';
export const isPost = ref<boolean>(false)
// 加载进度条
export const progress = ref(false)

export function initRouter(router: Router) {
    router.onBeforeRouteChange = () => {
        progress.value = true
    }
    router.onAfterRouteChanged = () => {
        // console.log(`router👉`, router)
        progress.value = false
        // const { sidebarGroups, hasSidebar } = useSidebar()
        // console.log(`sidebarGroups👉`, sidebarGroups)
        try {
            监听图片点击()
        } catch (error) {
            
        }
    }
}

// 是否展示大纲
export const outlineDrawer = ref(null)

// 是否展示为mini状态
export const miniState = ref(true)

function normalMode(e: Event) {
    // if in "mini" state and user
    // click on drawer, we switch it to "normal" mode
    if (miniState.value) {
        miniState.value = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
    }
}

function miniMode() {
    miniState.value = true
}

export function toggleMiniDrawer(e: Event) {
    if (outlineDrawer.value) {
        miniState.value ? normalMode(e) : miniMode()
    } else {
        outlineDrawer.value = !outlineDrawer.value
    }
}

// 搜索框是否关闭
export const searchClose = ref(true)

/**
 * 计算阅读大概时间
 * @param el 文章所在的html元素
 */
export function readingTime(el: HTMLElement) {
    const text = el.innerText
    const wpm = 75
    const words = text.trim().split(/\s+/).length
    return Math.ceil(words / wpm)
}
