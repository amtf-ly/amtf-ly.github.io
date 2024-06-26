import { hashRef } from "../../composables/hash"
import { useRouter } from "vitepress"

import { scroll } from "quasar"
import { watch, onMounted, onBeforeUnmount, ref } from "vue"

const { setVerticalScrollPosition, getVerticalScrollPosition } = scroll

let scrollTimer
const scrollDuration = 500

export default function injectScroll(store) {
    // let preventTocUpdate = store.$route.hash.length > 1
    // console.log(`hashRef👉`, hashRef.value)

    let preventTocUpdate = hashRef.value.length > 1
    const { route } = useRouter()

    // watch(() => store.$route.fullPath, (newRoute, oldRoute) => {
    // watch(
    //     () => route.path,
    //     (newRoute, oldRoute) => {
    //         console.log(`newRoute👉`, newRoute)
    //         setTimeout(() => {
    //             scrollToCurrentAnchor(newRoute.path !== oldRoute.path)
    //         })
    //     }
    // )

    const 目标hash = ref("")

    function changeRouterHash(hash) {
        // console.log(`changeRouterHash hashRef.value👉`, hashRef.value)
        // console.log(`route👉`, route)
        // if (store.$route.hash !== hash) {
        //   store.$router.replace({ hash }).catch(() => {})
        // }
        if (hashRef.value !== hash) {
            // console.log(`hash👉`, hash)
            // if (hash == "introduction") {
            //     目标hash.value = ""
            //     scrollPage({}, true, true)
            // } else {
            //     目标hash.value = hash
            //     setTimeout(() => {
            //         scrollToCurrentAnchor(false)
            //     })
            // }
            目标hash.value = hash
            setTimeout(() => {
                scrollToCurrentAnchor(false)
            })
        } else {
            scrollToCurrentAnchor()
        }
    }

    function scrollPage(el, delay) {
        // console.log(`scrollPage滚动页面ing el👉`,el )
        // top 表示元素上边缘距离视口上边的距离
        const { top } = el.getBoundingClientRect()
        const offset = Math.max(0, top + getVerticalScrollPosition(window) - 166) // TODO dynamic header

        clearTimeout(scrollTimer)

        preventTocUpdate = true
        setVerticalScrollPosition(window, offset, delay)

        scrollTimer = setTimeout(() => {
            preventTocUpdate = false
        }, delay + 10)

        // 滚动完成后，再修改标题栏的路由地址
        // console.log(`目标hash.value👉`, 目标hash.value)
        window.location.hash = 目标hash.value
    }

    // 用户主动点击的时候执行
    function scrollTo(id) {
        // console.log(`scrollTo 执行了 id👉`, id)
        clearTimeout(scrollTimer)
        // changeRouterHash("#" + id)
        changeRouterHash(id)

        setTimeout(() => {
            store.setActiveToc(getVerticalScrollPosition(window))
        }, scrollDuration + 50)
    }

    function onPageScroll({ position }) {
        // TODO
        // store.state.value.page.scrollTop = position
        // console.log(`position👉`,position)
        if (
            preventTocUpdate !== true &&
            // (drawers.rightDrawerOnLayout.value === true || drawers.rightDrawerState.value !== true) &&
            document.qScrollPrevented !== true
        ) {
            store.setActiveToc(position)
        }
    }

    function scrollToCurrentAnchor(immediate) {
        // console.log(`scrollToCurrentAnchor执行了👉 只在刷新页面的时候执行？`)

        // const hash = window.location.hash
        const hash = 目标hash.value

        let el = hash.length > 1 ? document.getElementById(hash.substring(1)) : null

        // console.log(`hash👉`, hash)
        if (hash == "introduction") {
            目标hash.value = ""
            el = document.getElementById("页面顶层div")
        }

        // console.log(`hash.substring(1)👉`, hash.substring(1))
        // console.log(`el👉`, el)

        if (el !== null) {
            // console.log(`immediate👉`, immediate)
            if (immediate === true) {
                let anchorEl = el
                while (anchorEl.parentElement !== null && anchorEl.parentElement.classList.contains("q-page") !== true) {
                    anchorEl = anchorEl.parentElement
                }

                document.body.classList.add("q-scroll--lock")
                anchorEl.classList.add("q-scroll--anchor")

                setTimeout(() => {
                    document.body.classList.remove("q-scroll--lock")
                    anchorEl && anchorEl.classList.remove("q-scroll--anchor")
                }, 2000)
            }
            // console.log(`immediate👉`, immediate)
            scrollPage(el, immediate === true ? 0 : scrollDuration)
        } else {
            preventTocUpdate = false
            store.setActiveToc()
        }
    }

    onMounted(() => {
        setTimeout(() => {
            scrollToCurrentAnchor(true)
        })
    })

    onBeforeUnmount(() => {
        clearTimeout(scrollTimer)
    })

    store.scrollTo = scrollTo
    store.onPageScroll = onPageScroll
}
