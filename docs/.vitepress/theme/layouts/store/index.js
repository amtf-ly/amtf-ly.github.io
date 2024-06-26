import { useData } from "vitepress"

// import { useSidebar } from "../../composables/sidebar"
import { useSidebar } from "vitepress/theme"

// import {Router} from 'vitepress/dist/client'
import { useRouter } from "vitepress"

import { computed, inject, provide, ref, watch } from "vue"
import { useQuasar } from "quasar"
// import { useRoute, useRouter } from 'vue-router'
// import { useSSRContext } from 'vue'

import injectToc from "./inject-toc.js"
import injectScroll from "./inject-scroll.js"
// import 总目录 from 'src/assets/menu总目录-程序生成.js'

import { useSidebarControl } from "../../composables/sidebar"

export const docStoreKey = "_q_ds_"

export function useDocStore() {
    return inject(docStoreKey)
}

export function provideDocStore() {
    // console.log("provideDocStore执行了")
    const $q = useQuasar()
    const { route } = useRouter()
    const $route = route

    const { page, frontmatter } = useData()
    //       const $route = {
    //     meta: {
    //         fullscreen: false,
    //     },
    // }
    const { sidebarGroups, hasSidebar, sidebar } = useSidebar()
    // console.log(`侧边栏sidebar👉`, sidebar)

    const { site } = useData()
    // console.log(`useData()👉`,useData())
    // console.log(`site👉`,site.value.base)
    // const $route = useRoute()
    // const $router = useRouter()

    const store = {
        $q,
        $route,
        // $router,
        // $routeKK:{},
        state: {
            isFullscreen: false,
            是主页: true,
            dark: $q.cookies.get("theme") == "dark",
            menuDrawer: false,
            tocDrawer: false,
            总目录: {},
            当前目录: [],
        },

        toggleDark(e) {
            // if (!e || !isAppearanceTransition()) {
            //   _toggleDark()
            //   return
            // }
            // console.log(`toggleDark执行了👉`)
            const x = e.clientX
            const y = e.clientY
            const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
            const transition = document.startViewTransition(() => {
                _toggleDark()
            })
            transition.ready.then(() => {
                const isDark = $q.dark.isActive

                // console.log("开始动画")
                // console.log("isDark", isDark)
                const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
                document.documentElement.animate(
                    {
                        clipPath: isDark ? [...clipPath].reverse() : clipPath,
                    },
                    {
                        duration: 500,
                        easing: "ease-in",
                        pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
                    }
                )
            })
        },

        toggleMenuDrawer() {
            store.state.value.menuDrawer = store.state.value.menuDrawer === false
        },

        toggleTocDrawer() {
            store.state.value.tocDrawer = store.state.value.tocDrawer === false
        },
    }

    function _toggleDark() {
        setHtmlDarkClass设置htmldark类(!$q.dark.isActive)
        const val = (store.state.value.dark = store.state.value.dark === false)
        // console.log(`_toggleDark ing……store.state.value.dark👉`,store.state.value.dark)
        $q.cookies.set("theme", val ? "dark" : "light", { path: "/", sameSite: "Strict" })
    }

    function setHtmlDarkClass设置htmldark类(dark) {
        // console.log("setHtmlDarkClass设置htmldark类  ing")
        // console.log("dark👉", dark)

        const classList = document.querySelector("html").classList
        dark ? classList.add("dark") : classList.remove("dark")
    }

    injectToc(store)
    injectScroll(store)

    store.state = ref(store.state)
    // console.log("$route.meta",$route);
    // store.dark = computed(() => (store.state.value.dark || $route.meta.dark))
    store.dark = computed(() => store.state.value.dark)

    // 除了设置$q ,同时也要立即执行一次设置html dark 类
    watch(
        store.dark,
        val => {
            $q.dark.set(val)
            setHtmlDarkClass设置htmldark类(val)
        },
        { immediate: true }
    )

    // let's auto-close the drawer when we're starting to show
    // the left menu on the page...
    watch(
        () => $q.screen.width < 1301,
        () => {
            store.state.value.menuDrawer = false
        }
    )

    // let's auto-close the drawer when we're starting to show
    // the toc on the page...
    watch(
        () => $q.screen.lt.md,
        () => {
            store.state.value.tocDrawer = false
        }
    )

    watch(
        () => $route.path,
        val => {
            // console.log("$route.path👉", $route.path)
            // console.log("val👉", val)
            // console.log(`site.value.base👉`,site.value.base)
            if (val === site.value.base) {
                store.state.value.menuDrawer = false
                store.state.value.是主页 = true
                // store.state.value.当前目录 = 当前目录
            } else {
                store.state.value.是主页 = false
                store.state.value.menuDrawer = true

                // // 获取图片和模态窗口元素
                // var modal = document.getElementById("modal")
                // var modalImg = document.getElementById("img01")
                // var captionText = document.getElementById("caption")
                // var imgs = document.querySelectorAll("img")
                // // var img = document.getElementById("myImg");
                // console.log("imgs :>> ", imgs.length)
                // // 遍历所有图像并添加点击事件监听器
                // if (imgs.length > 0) {
                //     imgs.forEach(function (img) {
                //         console.log('img :>> ', img);
                //         img.onclick = function () {
                //             // 显示模态窗口的代码...
                //             modal.style.display = "block"
                //             modalImg.src = this.src
                //             captionText.innerHTML = this.alt
                //         }
                //     })
                // }


            }
            // let reg = new RegExp(`/([^/]+)`, "i");
            // let match = reg.exec(val)
            // if (match) {
            //   let kk = match[1]
            //   console.log("match了",kk);

            //   // let yy = 总目录.filter((item) => item.一级分类 == kk);

            //   //如果为空要清空目录
            //   // store.state.value.当前目录 = yy ? yy : []

            //   // console.log(kk);
            //   store.state.value.menuDrawer = true
            // }
        },
        {
            // 选项对象
            immediate: true, // 设置为 true 以在初始化时立即执行回调函数
        }
    )

    provide(docStoreKey, store)
    return store
}
