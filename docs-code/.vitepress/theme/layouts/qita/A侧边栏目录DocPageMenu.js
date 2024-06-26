import { isActive } from "../../../shared"
import { useData } from "vitepress"

import { normalizeLink } from "../../support/utils"

// import { useSidebar } from "../../composables/sidebar"
import { useSidebar } from "vitepress/theme"

// import {Router} from 'vitepress/dist/client'
import { useRouter } from "vitepress"

import { QExpansionItem, QList, QItem, QItemSection, QIcon, QBadge, Ripple } from "quasar"

import { mdiMenuDown } from "@quasar/extras/mdi-v6"
import { h, ref, watch, onBeforeUpdate, withDirectives } from "vue"
// import { useRoute } from "vue-router"

// import Menu from 'assets/menu.js'
import "./DocPageMenu.sass"
import { useDocStore } from "../store/index.js"

import { computed } from "vue"
import { useSidebarControl } from "../../composables/sidebar"
// import { useSidebarControl } from 'vitepress/theme'

// import { 目录obj } from "../../composables/sidebar"

import { reactive } from "vue"

function getParentProxy(proxy) {
    if (Object(proxy.$parent) === proxy.$parent) {
        return proxy.$parent
    }

    let { parent } = proxy.$

    while (Object(parent) === parent) {
        if (Object(parent.proxy) === parent.proxy) {
            return parent.proxy
        }

        parent = parent.parent
    }
}

export default {
    setup() {
        // console.log("侧边栏 目录 setup执行了")
        // const {isActiveLink} = useSidebarControl(computed(() => props.item))

        const { sidebarGroups, hasSidebar } = useSidebar()
        // console.log(`sidebarGroups👉`, sidebarGroups.value)
        const { sidebar } = useSidebar()
        // console.log(`sidebar.value👉`, sidebar.value)

        // useSidebarControl有onMounted,必须在setup函数中执行，而且不能在watch方法里面
        // sidebar.value.map(menu => {
        //     if (menu.items !== void 0) {
        //         menu.items.map(item => {
        //             const { isActiveLink } = useSidebarControl(computed(() => item))
        //             // console.log(`isActiveLink👉`,isActiveLink.value)
        //             // console.log(`menu👉`,item)
        //             // console.log(`menu.link👉`,item.link)
        //             // 目录obj[item.link]=isActiveLink.value
        //         })
        //     } else {
        //         const { isActiveLink } = useSidebarControl(computed(() => menu))
        //         // 目录obj[menu.link]=isActiveLink.value
        //     }
        // })

        const { route } = useRouter()
        // console.log(`route👉`, route)

        const $route = {
            meta: {
                fullscreen: false,
            },
        }
        // const $route = useRoute()
        const routePath = route.path

        const rootRef = ref(null)
        const docStore = useDocStore()

        // 监听route.path
        watch(
            () => {
                route.path
                // console.log(`监听route.path👉`, route.path)
                // console.log(`sidebarGroups👉`, sidebarGroups.value)
            },
            val => {
                showMenu(childRefs[val])
            }
        )

        const 目录obj = reactive({})
        const { page } = useData()
        watch(
            sidebar,
            val => {
                // console.log(`sidebar变化了👉val`, val)
                val.map(menu => {
                    let isActiveLink = false
                    if (menu.items !== void 0) {
                        menu.items.map(item => {
                            isActiveLink = isActive(page.value.relativePath, item.link)
                            // const { isActiveLink } = useSidebarControl(computed(() => item))
                            // console.log(`isActiveLink👉`,isActiveLink.value)
                            // console.log(`menu👉`,item)
                            目录obj[item.link] = isActiveLink
                            // console.log(`menu.link👉`, item.link)
                            // console.log(`isActiveLink👉`, isActiveLink)
                        })
                    } else {
                        // const { isActiveLink } = useSidebarControl(computed(() => menu))
                        isActiveLink = isActive(page.value.relativePath, menu.link)
                        目录obj[menu.link] = isActiveLink
                    }
                })
            },
            { immediate: true }
        )
        watch(
            [page],
            () => {
                // console.log(`页面更新ing page.value.relativePath`, page.value.relativePath)
                // console.log(`页面更新ing page.value`, page.value)
                // console.log(`目录obj👉`, 目录obj)
                // 目录obj[item.value.link as any]=isActiveLink
                const kk = "/" + page.value.relativePath.replace(/\.[^.]*$/, "")
                // console.log(`kk👉`, kk)
                // console.log(`目录obj[kk]👉`, 目录obj[kk])
                // 目录obj[kk]=true
                for (let key in 目录obj) {
                    目录obj[key] = false
                }
                目录obj[kk] = true
            },
            { immediate: true }
        )

        let childRefs = []

        onBeforeUpdate(() => {
            childRefs = []
        })

        function showMenu(proxy) {
            if (proxy !== void 0 && proxy !== rootRef.value) {
                proxy.show !== void 0 && proxy.show()
                const parent = getParentProxy(proxy)
                if (parent !== void 0) {
                    showMenu(parent)
                }
            }
        }

        function getDrawerMenu(menu, text, level) {
            // console.log("生成侧边栏目录 getDrawerMenu ing")
            // console.log(`menu👉`,menu)
            // console.log(`text👉`,text)
            // console.log(`menu.items👉`,menu.items)
            // console.log(`menu.items !== void 0👉`,menu.items !== void 0)

            if (menu.items !== void 0) {
                // console.log(`text👉`, text)
                // console.log(`menu.items👉`, menu.items)
                // console.log(`menu.items !== void 0👉`, menu.items !== void 0)

                return h(
                    QExpansionItem,
                    {
                        // class: "doc-layout__item non-selectable" + (level !== 0 ? " doc-page-menu__deep-expansion" : ""),
                        class: [
                            `doc-layout__item non-selectable ${level !== 0 ? " doc-page-menu__deep-expansion" : ""}`,
                            { "doc-layout__item--active": 目录obj[menu.link] },
                        ],
                        ref: vm => {
                            if (vm) {
                                childRefs[text] = vm
                            }
                        },
                        key: `${menu.name}-${text}`,
                        label: text,
                        icon: menu.icon,
                        expandIcon: mdiMenuDown,
                        defaultOpened: menu.opened || routePath.startsWith(text),
                        switchToggleSide: level !== 0,
                        denseToggle: level !== 0,
                        activeClass: "doc-layout__item--active",
                    },
                    () =>
                        menu.items.map(item => {
                            // console.log(`item.text👉`,item.text)
                            // return getDrawerMenu(item, text + (item.text !== void 0 ? item.text : ""), level / 2 + 0.1)
                            return getDrawerMenu(item, item.text !== void 0 ? item.text : "", level / 2 + 0.1)
                        })
                )
            }

            const props = {
                ref: vm => {
                    if (vm) {
                        childRefs[text] = vm
                    }
                },
                key: text,
                // class: "doc-layout__item non-selectable",
                // class: `doc-layout__item non-selectable ${isActiveLink.value ? 'doc-layout__item--active' : ''}`,
                class: ["doc-layout__item non-selectable", { "doc-layout__item--active": 目录obj[menu.link] }],

                // to: text,
                href: normalizeLink(menu.link),
                activeClass: "doc-layout__item--active",
            }

            if (level !== 0) {
                props.insetLevel = Math.min(level, 1)
            }

            menu.external === true &&
                Object.assign(props, {
                    to: void 0,
                    clickable: true,
                    tag: "a",
                    href: menu.link,
                    target: "_blank",
                })

            const child = []

            menu.icon !== void 0 &&
                child.push(
                    h(
                        QItemSection,
                        {
                            avatar: true,
                        },
                        () => h(QIcon, { name: menu.icon })
                    )
                )

            child.push(h(QItemSection, () => menu.text))
            // child.push(h("div", `激活？ = ${目录obj[menu.link]}`))
            // child.push(h('div', `${menu.text} == isActiveLink.value = ${是激活链接.value}`))

            menu.badge !== void 0 &&
                child.push(
                    h(
                        QItemSection,
                        {
                            side: true,
                        },
                        () => h(QBadge, { label: menu.badge, class: "header-badge" })
                    )
                )

            return withDirectives(
                h(QItem, props, () => child),
                [[Ripple]]
            )
        }

        return () =>
            h(QList, { ref: rootRef, class: "doc-page-menu", dense: true }, () =>
                // docStore.state.value.当前目录.map(item => getDrawerMenu(item, item.text, 0))
                sidebar.value.map(item => getDrawerMenu(item, item.text, 0))
            )
    },
}
