import { createRequire } from "module"
import { defineConfig, type DefaultTheme } from "vitepress"
// import AutoSidebar from "amtf-vitepress-auto-sidebar"
import AutoSidebar from "./插件/index"
import { fileURLToPath, URL } from "node:url"
import path from "node:path"

import { quasar, transformAssetUrls } from "@quasar/vite-plugin"
import vue from "@vitejs/plugin-vue"

import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

import erpnext目录 from "../ERPNext/1.0 介绍/00目录"
// import ElementPlus from 'unplugin-element-plus/vite'

const require = createRequire(import.meta.url)

export default defineConfig({
    ignoreDeadLinks: true,
    title: "amtf~~",
    description: "amtf~~",
    lastUpdated: true,
    cleanUrls: true,
    lang: "zh",
    markdown: {
        math: true,
    },
    vue: {
        template: { transformAssetUrls },
    },
    base: "/",
    vite: {
        server: {
            // open: true, //自动打开浏览器
            port: 5188,
            proxy: {
                "/api": {
                    target: "https://yiguxianyun.gitee.io/amtf-sj", //目标网站,服务端地址
                    changeOrigin: true,
                    rewrite(path) {
                        return path.replace(/^\/api/, "")
                    },
                },
            },
        },
        plugins: [
            // ElementPlus()

            //dev的时候可以用， build的时候会报错……
            // AutoImport({
            //     resolvers: [ElementPlusResolver()],
            // }),
            // Components({
            //     resolvers: [ElementPlusResolver()],
            // }),

            // add plugin collapsed: true折叠目录
            // AutoSidebar({ prefix: ".", collapsed: true, 忽略后缀名: [".vue", ".js"] }),
            AutoSidebar({
                collapsed: true,
                忽略后缀名: [".vue", ".js"],
                ignoreList: ["images", "zh", "snippets", "public"],
            }),
            // vue({
            //     template: { transformAssetUrls }
            //   }),
            // 这里用quasar build的时候会报错
            // quasar({
            //     sassVariables: './theme/css/quasar.variables.scss'
            //   })
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("../../", import.meta.url)),
                "@the": fileURLToPath(new URL("./theme/", import.meta.url)),
            },
            // alias: [
            //     {
            //         find: "@the",
            //         replacement: path.resolve(__dirname, "./theme/"),
            //     },
            //     {
            //         find: "@",
            //         replacement: path.resolve(__dirname, "../../"),
            //     },
            // ],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    /* 自动引入全局scss文件 */
                    // additionalData: '@import "@the/css/quasar.variables.scss";',
                },
            },
        },
    },
    // sitemap: {
    //   hostname: 'https://vitepress.dev',
    //   transformItems(items) {
    //     return items.filter((item) => !item.url.includes('migration'))
    //   }
    // },

    /* prettier-ignore */
    head: [
        ['meta', { name: 'viewport', content: 'user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width' }],
        
    //将 favicon.ico 放在公共目录中，如果设置了 base(部署在网站子路径时)，则使用 /base/favicon.ico
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'text/plain', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: "128x128", href: '/icons/amtf-ml128.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: "96x96", href: '/icons/amtf-ml96.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: "32x32", href: '/icons/amtf-ml32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: "16x16", href: '/icons/amtf-m16.png' }],
    ['link', { rel: 'icon', type: 'image/ico', sizes: "16x16", href: '/amtf.ico' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'amtf' }],
    ['meta', { name: 'og:image', content: '/icons/amtf-ml128.png' }],
    ['script', { src: 'https://cdn.usefathom.com/script.js', 'data-site': 'AZBRSFGG', 'data-spa': 'auto', defer: '' }]
  ],
    themeConfig: {
        // siteTitle: '😄',
        siteTitle: "",
        // siteTitle: "📝erpnext&frappe学习笔记",
        logo: { src: "/icons/amtf-ml128.png" },
        outline: "deep",
        nav: nav(),
        sidebar: {
            // "/ERPNext/": { base: "/ERPNext/", items: erpnext目录() },
            // "/zh/guide/": { base: "/zh/guide/", items: sidebarGuide() },
            // "/zh/reference/": { base: "/zh/reference/", items: sidebarReference() },
        },

        editLink: {
            pattern: "https://github.com/amtf-ly/edit/master/docs-code/:path",
            text: "去改正",
        },

        // socialLinks: [
        //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        // ],
        outlineTitle: "本页目录",
        footer: {
            message: "大肚能容，笑口常开 <br>到底了~~",
            // copyright: 'Copyright © 2019-present Evan You'
        },

        search: {
            provider: "local",
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: "搜索",
                                buttonAriaLabel: "搜索按钮",
                            },
                            modal: {
                                displayDetails: "显示详情",
                                resetButtonTitle: "清空",
                                backButtonTitle: "返回搜索结果",
                                noResultsText: "没有找到结果",
                                footer: {
                                    selectText: "选择",
                                    selectKeyAriaLabel: "回车键",
                                    navigateText: "切换",
                                    navigateUpKeyAriaLabel: "上方向键",
                                    navigateDownKeyAriaLabel: "下方向键",
                                    closeText: "关闭",
                                    closeKeyAriaLabel: "ESC键",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: "SketchUp",
            activeMatch: "/su/",
            link: "/su/01.介绍",
        },
        {
            text: "ERPNext",
            activeMatch: "/ERPNext入坑笔记/",
            link: "/ERPNext入坑笔记/01.介绍",
        },
        // {
        //     text: "ERPNext",
        //     activeMatch: "/ERPNext/",
        //     children: [
        //         { text: "入坑笔记", link: "/ERPNext入坑笔记/01介绍"},
        //         { text: "官网文档搬运", link: "/ERPNext/01 介绍/1.1 介绍" },
        //     ],
        // },
        {
            text: "多元文化",
            link: "/多元文化/叮叮当当",
            activeMatch: "/多元文化/",
        },
        {
            text: "vue-easytable-laoyu",
            link: "/vue-easytable-laoyu/叮叮当当",
            activeMatch: "/vue-easytable-laoyu/",
        },
        // {
        //     text: "指南",
        //     link: "/zh/guide/what-is-vitepress",
        //     activeMatch: "/zh/guide/",
        // },
        // {
        //     text: "参考",
        //     link: "/zh/reference/site-config",
        //     activeMatch: "/zh/reference/",
        // },
    ]
}
