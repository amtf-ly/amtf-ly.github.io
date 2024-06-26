import { hashRef } from "../../composables/hash"

import { onContentUpdated } from "vitepress"
import { ref, shallowRef } from "vue"
// import { useData } from '../composables/data'
import { useData } from "vitepress"

import { getHeaders, resolveTitle, useActiveAnchor } from "../../composables/outline"

// 这里是为了找到 激活目录、设置样式，不是为了滚动页面，前面已经滚动过了
function updateActiveToc(position, state) {
    // console.log(`updateActiveToc执行了👉`)
    // console.log(`position👉`, position)
    // console.log(`state.value👉`, state.value)
    // console.log(`state.value.toc👉`, state.value.toc)
    if (position === void 0) {
        // console.log(`position === void 0👉`, position === void 0)
        position = document.documentElement.scrollTop || document.body.scrollTop
        // console.log(`position👉`, position)
        // return
    }

    // 点击了 开头 目录
    if (position === 0) {
        state.value.activeToc = "#introduction"
        return
    }

    let last
    for (const section of state.value.toc) {
        // console.log(`section.link👉`,section.link)
        const item = document.getElementById(section.link.replace(/^#/, ""))

        // console.log(`item👉`,item)
        if (item === null) {
            continue
        }
        // console.log(`item👉`, item)

        const offset = section.deep === true ? item.offsetTop + item.offsetParent.offsetTop : item.offsetTop

        if (offset >= position + 155) {
            if (last === void 0) {
                last = section.link
            }
            break
        } else {
            last = section.link
        }
    }

    if (last !== void 0) {
        state.value.activeToc = last
    }
}

export default function injectToc(store) {
    let toc = []
    let 页面标题 = ""
    Object.assign(store.state, {
        toc,
        activeToc: hashRef,
    })

    const { frontmatter, theme } = useData()
    const headers = shallowRef([])
    onContentUpdated(() => {
        // console.log(`frontmatter.value.outline👉`, frontmatter.value.outline)
        // console.log(`theme.value.outline👉`, theme.value.outline)
        headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
        // console.log(`headers.value👉`, headers.value)
        const 展平后toc = []
        展平toc(headers.value, 1, 展平后toc)

        // console.log(`onContentUpdated  toc👉`, toc)

        页面标题 = resolveTitle(theme)
        // console.log(`标题👉`,页面标题)
        store.setToc(展平后toc)
    })

    const onClick = () => {
        store.scrollTo("introduction")
    }

    store.setToc = toc => {
        //   console.log(`store.setToc 执行👉`,toc)
        store.state.value.toc =
            toc !== void 0
                ? [
                      {
                          link: "#introduction",
                          title: `1. ${页面标题}`,
                          onClick,
                      },
                      ...toc.map(entry => ({
                          ...entry,
                          onClick: () => {
                              store.state.value.tocDrawer = false
                              store.scrollTo(entry.link)
                          },
                      })),
                  ]
                : []
    }

    store.setActiveToc = pos => {
        updateActiveToc(pos, store.state)
    }
}

function 展平toc(toc, 上级序号, 展平后toc) {
    let 本级序号 = 1

    toc.map(e => {
        if (e.children != void 0) {
            本级序号 += 1
            let 组合序号 = 上级序号 === 1 ? `${本级序号}` : `${上级序号}.${本级序号}`
            展平后toc.push({
                link: e.link,
                level: e.level,
                title: `${组合序号}. ${e.title}`,
            })

            展平toc(e.children, `${组合序号}`, 展平后toc)
        } else {
            本级序号 += 1
            let 组合序号 = 上级序号 === 1 ? `${本级序号}` : `${上级序号}.${本级序号-1}`
            展平后toc.push({
                link: e.link,
                level: e.level,
                title: `${组合序号}. ${e.title}`,
            })
        }
    })
}

function parseToc(toc) {
    // console.log(`toc👉`,toc)
    let wasHeader = true // Introduction is auto prepended
    let headerIndex = 1 // Introduction is auto prepended
    let subheaderIndex

    const list = toc.map(entry => {
        if (entry.sub === true) {
            if (wasHeader === true) {
                subheaderIndex = 1
            } else {
                subheaderIndex++
            }

            wasHeader = false
        } else {
            wasHeader = true
            headerIndex++
        }

        return {
            ...entry,
            title: entry.sub === true ? `${headerIndex}.${subheaderIndex}. ${entry.title}` : `${headerIndex}. ${entry.title}`,
        }
    })

    return list
    // return JSON.stringify(list)
}
