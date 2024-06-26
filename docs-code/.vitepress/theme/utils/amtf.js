import { useDocStore } from "../layouts/store/index.js"
// import { useQuasar } from "quasar"
// import { useData } from '../composables/data'
import { ref, onMounted, computed } from "vue"
import { useQuasar } from 'quasar'

export function use图标() {
  const $q = useQuasar()
  $q.iconMapFn = (iconName) => {
    if (iconName.startsWith('a4') === true) {
      // 我们删除了 "app:" 部分
      // console.log(`iconName👉`,iconName)
      return {
        // cls: 'aa'+iconName 需要的话可以给最后生成的类，加个前缀什么的
        cls: iconName
      }
    }
  }

}

export function useAmtf() {
    const docStore = useDocStore()

    // const $q = useQuasar()
    // const { isDark, theme } = useData()
    function 添加涟漪(e) {
        // console.log(`添加涟漪ing……docStore.state.value.dark👉`,docStore.state.value.dark)
        const isDark = docStore.state.value.dark
        const 涟漪 = e.target
        // console.log("你点了我");
        const 涟漪容器 = document.createElement("div")
        涟漪容器.className = `涟漪容器 ${isDark ? "dark" : ""}`
        // console.log(`isDark.value👉`, isDark)
        const computedStyle = window.getComputedStyle(涟漪)
        涟漪容器.style.borderRadius = computedStyle.borderRadius
        涟漪容器.style.transform = computedStyle.transform
        涟漪容器.style.top = 涟漪.offsetTop + "px"
        涟漪容器.style.left = 涟漪.offsetLeft + "px"
        涟漪容器.style.width = 涟漪.offsetWidth + "px"
        涟漪容器.style.height = 涟漪.offsetHeight + "px"
        涟漪.insertAdjacentElement("afterend", 涟漪容器)

        // console.log(`涟漪容器.className👉`, 涟漪容器.className)

        // 创建span元素，并设置其位置为鼠标点击的位置
        let span = document.createElement("span")
        span.style.left = e.offsetX + "px"
        span.style.top = e.offsetY + "px"
        // 将span元素添加至按钮标签里
        涟漪容器.appendChild(span)
        // 1秒后删除span元素
        setTimeout(() => {
            涟漪容器.remove()
        }, 1000)
    }
    return {
        添加涟漪,
    }
}


export function 获取所有涟漪类元素添加监听() {
    // 获取所有按钮
    const 涟漪s = document.querySelectorAll(".涟漪")
    // 循环所有按钮，并为每一个按钮添加点击事件
    涟漪s.forEach(涟漪 => {
        涟漪.addEventListener("click", e => {
            添加涟漪(e)
        })
    })
}
