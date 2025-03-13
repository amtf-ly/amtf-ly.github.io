// .vitepress/theme/index.js
// summary的定义和vitepress定义的display: list-item;冲突，优先引入让后面的覆盖
// summary {
//     display: block;
//   }
import Layout from "./layouts/Layout.vue"

// import Layout from "./layout.vue"

// import { h } from "vue"
// import { useData } from "vitepress"
import axios from "axios"
// import store from '../../../src/stores'


// import "./css/base.css"
// import "./css/amtf.css"
import "./css/rainbow.css"

// import "./css/amtf.scss"
import "./font9/iconfont.css"
import "quasar/src/css/index.sass"
// import "quasar/dist/quasar.css"
import "./css/app.sass"
import "./css/amtf自定义.scss"
import "./font/iconfont.css"

// import InstantSearch from 'vue-instantsearch/vue3/es/index.js'
// import { initQuasar } from "./composables/quasar"
import { initRouter } from "./composables/store"
import { createPinia } from 'pinia'
// import {EnhanceAppContext} from 'vitepress'
// import DefaultTheme from 'vitepress/theme'

import installQuasar from '@/amtf/install-quasar';
import installTable from '@/amtf/install-table';

// import ElementPlus from 'element-plus'
export default {
    // ...DefaultTheme,
    enhanceApp({ app, router, siteData }) {
        // app is the Vue 3 app instance from createApp()
        // router is VitePress' custom router (see `lib/app/router.js`)
        // siteData is a ref of current site-level metadata.
        // initQuasar(app)
        initRouter(router)
        app.use(installQuasar)
        app.use(installTable)
        // app.use(InstantSearch)
        // app.use(ElementPlus)
        app.use(createPinia())
        // app.provide("$axios", axios)
        // app.use(store)
        // app.use(Antd)
    },
    // extends: DefaultTheme,
    // 自定义布局配置
    Layout,
}
// export default DefaultTheme
