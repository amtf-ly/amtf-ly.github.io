// docs-code/.vitepress/config.mts
import { defineConfig } from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/vitepress@1.0.1_@algolia+client-search@4.22.1_async-validator@4.2.5_axios@1.6.8_less@4.2.2_ma_qw4hytuc6bwa4lkfti24fv4gra/node_modules/vitepress/dist/node/index.js";

// amtf/vitepress/成侧栏目录.js
import { join } from "path";
import { readdirSync, statSync } from "fs";

// amtf/vitepress/utils.ts
import { existsSync, readFileSync } from "fs";
var DEFAULT_IGNORE_FOLDER = ["scripts", "components", "assets", ".vitepress"];
function log(...info) {
  console.log("[auto-sidebar]", ...info);
}
function removePrefix(str, identifier) {
  return str.replace(identifier, "");
}
function getTitleFromFile(realFileName) {
  if (!existsSync(realFileName)) {
    return void 0;
  }
  const fileExtension = realFileName.substring(
    realFileName.lastIndexOf(".") + 1
  );
  if (fileExtension !== "md" && fileExtension !== "MD") {
    return void 0;
  }
  const data = readFileSync(realFileName, { encoding: "utf-8" });
  const lines = data.split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith("# ")) {
      return line.substring(2);
    }
  }
  return void 0;
}

// amtf/vitepress/成侧栏目录.js
var option;
function createSideBarItems(targetPath, ...\u6587\u4EF6\u5939\u7EC4) {
  const {
    ignoreIndexItem,
    deletePrefix,
    collapsed = false,
    sideBarItemsResolved,
    beforeCreateSideBarItems,
    ignoreList = [],
    \u5FFD\u7565\u540E\u7F00\u540D = [],
    titleFromFile = false
  } = option;
  const rawNode = readdirSync(join(targetPath, ...\u6587\u4EF6\u5939\u7EC4));
  let node = beforeCreateSideBarItems?.(rawNode) ?? rawNode;
  node = node.filter((item) => {
    return !item.includes("components");
  });
  const currentDir = join(targetPath, ...\u6587\u4EF6\u5939\u7EC4);
  if (ignoreIndexItem && node.length === 1 && node[0] === "index.md") {
    return [];
  }
  const result = [];
  for (const fname of node) {
    if (statSync(join(targetPath, ...\u6587\u4EF6\u5939\u7EC4, fname)).isDirectory()) {
      if (ignoreList.includes(fname)) {
        continue;
      }
      const items = createSideBarItems(join(targetPath), ...\u6587\u4EF6\u5939\u7EC4, fname);
      let text = fname;
      if (titleFromFile) {
        const filenames = [
          join(currentDir, fname, "index.md"),
          join(currentDir, fname, "index.MD"),
          join(currentDir, fname, fname + ".md")
        ];
        for (const filename of filenames) {
          const title = getTitleFromFile(filename);
          if (title) {
            text = title;
            break;
          }
        }
      }
      if (deletePrefix) {
        text = removePrefix(text, deletePrefix);
      }
      if (items.length > 0) {
        const sidebarItem = {
          text,
          items
        };
        sidebarItem.collapsed = collapsed;
        result.push(sidebarItem);
      } else {
        const sidebarItem = {
          text,
          link: "/" + [...\u6587\u4EF6\u5939\u7EC4, `${text}`].join("/") + "/"
        };
        sidebarItem.collapsed = collapsed;
        result.push(sidebarItem);
      }
    } else {
      console.log(`\u662F\u6587\u4EF6 ing\u{1F447}`);
      if (ignoreIndexItem && fname === "index.md" || // 以连字符开头，后面跟着任意字符，然后以.md或.MD结尾
      /^-.*\.(md|MD)$/.test(fname)) {
        continue;
      }
      let \u662F\u5FFD\u7565\u6587\u4EF6 = false;
      for (const e of \u5FFD\u7565\u540E\u7F00\u540D) {
        const pattern = new RegExp(`${e}$`, "i");
        if (pattern.test(fname)) {
          \u662F\u5FFD\u7565\u6587\u4EF6 = true;
          break;
        }
      }
      if (\u662F\u5FFD\u7565\u6587\u4EF6) {
        continue;
      }
      const fileName = fname.replace(/\.md$/, "");
      let text = fileName;
      if (deletePrefix) {
        text = removePrefix(text, deletePrefix);
      }
      const realFileName = join(currentDir, fname);
      if (titleFromFile) {
        const title = getTitleFromFile(realFileName);
        if (title) {
          text = title;
        }
      }
      const item = {
        text,
        // link: "/" + [...文件夹组, `${fileName}.html`].join("/"),
        link: "/" + [...\u6587\u4EF6\u5939\u7EC4, `${fileName}`].join("/")
      };
      result.push(item);
    }
  }
  return sideBarItemsResolved?.(result) ?? result;
}
function createSideBarGroups(targetPath, folder) {
  let items = createSideBarItems(targetPath, folder);
  console.log(`createSideBarGroups items \u{1F449}`, items);
  return {
    items
  };
}
function createSidebarMulti(path) {
  const { ignoreList = [], ignoreIndexItem = false, sideBarResolved } = option;
  const il = [...DEFAULT_IGNORE_FOLDER, ...ignoreList];
  const data = {};
  const node = readdirSync(path).filter((n) => statSync(join(path, n)).isDirectory() && !il.includes(n));
  for (const k of node) {
    data[`/${k}/`] = createSideBarGroups(path, k);
  }
  return sideBarResolved?.(data) ?? data;
}
function \u6210\u4FA7\u680F\u76EE\u5F55(opt = {}) {
  return {
    name: "amtf-vitepress-auto-sidebar",
    configureServer({ watcher, restart }) {
      const fsWatcher = watcher.add("*.md");
      fsWatcher.on("all", async (event, path) => {
        if (event !== "change") {
          log(`${event} ${path}`);
          try {
            await restart();
            log("update sidebar...");
          } catch {
            log(`${event} ${path}`);
            log("update sidebar failed");
          }
        }
      });
    },
    config(config) {
      option = opt;
      const { path } = option;
      const docsPath = join(process.cwd(), path);
      config.vitepress.site.themeConfig.sidebar = createSidebarMulti(docsPath);
      log("injected sidebar data successfully");
      return config;
    }
  };
}

// docs-code/.vitepress/config.mts
import { fileURLToPath, URL } from "node:url";
import { transformAssetUrls } from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/@quasar+vite-plugin@1.6.0_@vitejs+plugin-vue@4.6.2_vite@5.2.3_less@4.2.2_sass@1.70.0__vue@3.4_ja6jko6oiwl7o5tddw34jme3we/node_modules/@quasar/vite-plugin/src/index.js";
import vueJsx from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/@vitejs+plugin-vue-jsx@1.3.10/node_modules/@vitejs/plugin-vue-jsx/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/docs-code/.vitepress/config.mts";
var config_default = defineConfig({
  ignoreDeadLinks: true,
  title: "amtf~~",
  description: "amtf~~",
  lastUpdated: true,
  cleanUrls: true,
  lang: "zh",
  markdown: {
    math: true
  },
  vue: {
    template: { transformAssetUrls }
  },
  base: "/",
  vite: {
    server: {
      // open: true, //自动打开浏览器
      port: 5188,
      proxy: {
        "/api": {
          target: "https://yiguxianyun.gitee.io/amtf-sj",
          //目标网站,服务端地址
          changeOrigin: true,
          rewrite(path) {
            return path.replace(/^\/api/, "");
          }
        }
      }
    },
    plugins: [
      // ElementPlus()
      vueJsx(),
      //dev的时候可以用， build的时候会报错……
      // AutoImport({
      //     resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //     resolvers: [ElementPlusResolver()],
      // }),
      // add plugin collapsed: true折叠目录
      // AutoSidebar({ prefix: ".", collapsed: true, 忽略后缀名: [".vue", ".js"] }),
      \u6210\u4FA7\u680F\u76EE\u5F55({
        path: "/docs-code",
        collapsed: true,
        \u5FFD\u7565\u540E\u7F00\u540D: [".vue", ".js"],
        ignoreIndexItem: true,
        ignoreList: ["images", "img", "zh", "snippets", "public"]
        // ignoreList: ["images", "zh", "snippets", "public", , "ERPNext入坑笔记", "su"],
        // ignoreList: ["images", "zh", "snippets", "public", "多元文化", "ERPNext入坑笔记", "su"],
      })
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
        "@": fileURLToPath(new URL("../../", __vite_injected_original_import_meta_url)),
        "@the": fileURLToPath(new URL("./theme/", __vite_injected_original_import_meta_url))
      }
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
        }
      }
    }
  },
  // sitemap: {
  //   hostname: 'https://vitepress.dev',
  //   transformItems(items) {
  //     return items.filter((item) => !item.url.includes('migration'))
  //   }
  // },
  /* prettier-ignore */
  head: [
    ["meta", { name: "viewport", content: "user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width" }],
    //将 favicon.ico 放在公共目录中，如果设置了 base(部署在网站子路径时)，则使用 /base/favicon.ico
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["link", { rel: "icon", type: "text/plain", href: "/favicon.ico" }],
    ["link", { rel: "icon", type: "image/png", sizes: "128x128", href: "/icons/amtf-ml128.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "96x96", href: "/icons/amtf-ml96.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/amtf-ml32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/amtf-m16.png" }],
    ["link", { rel: "icon", type: "image/ico", sizes: "16x16", href: "/amtf.ico" }],
    ["meta", { name: "theme-color", content: "#5f67ee" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "en" }],
    ["meta", { name: "og:site_name", content: "amtf" }],
    ["meta", { name: "og:image", content: "/icons/amtf-ml128.png" }],
    ["script", { src: "https://cdn.usefathom.com/script.js", "data-site": "AZBRSFGG", "data-spa": "auto", defer: "" }]
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
      text: "\u53BB\u6539\u6B63"
    },
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    // ],
    outlineTitle: "\u672C\u9875\u76EE\u5F55",
    footer: {
      message: "\u5927\u809A\u80FD\u5BB9\uFF0C\u7B11\u53E3\u5E38\u5F00~~"
      // copyright: 'Copyright © 2019-present Evan You'
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "\u641C\u7D22",
                buttonAriaLabel: "\u641C\u7D22\u6309\u94AE"
              },
              modal: {
                displayDetails: "\u663E\u793A\u8BE6\u60C5",
                resetButtonTitle: "\u6E05\u7A7A",
                backButtonTitle: "\u8FD4\u56DE\u641C\u7D22\u7ED3\u679C",
                noResultsText: "\u6CA1\u6709\u627E\u5230\u7ED3\u679C",
                footer: {
                  selectText: "\u9009\u62E9",
                  selectKeyAriaLabel: "\u56DE\u8F66\u952E",
                  navigateText: "\u5207\u6362",
                  navigateUpKeyAriaLabel: "\u4E0A\u65B9\u5411\u952E",
                  navigateDownKeyAriaLabel: "\u4E0B\u65B9\u5411\u952E",
                  closeText: "\u5173\u95ED",
                  closeKeyAriaLabel: "ESC\u952E"
                }
              }
            }
          }
        }
      }
    }
  }
});
function nav() {
  return [
    {
      text: "OA\u{1F431}\u200D\u{1F3CD}",
      activeMatch: "/OA/",
      link: "/OA/1\u4ECB\u7ECD"
    },
    {
      text: "\u5546\u57CE\u{1F431}\u200D\u{1F3CD}",
      activeMatch: "/\u5546\u57CE/",
      link: "/\u5546\u57CE/1\u4ECB\u7ECD"
    },
    {
      text: "SketchUp",
      activeMatch: "/su/",
      link: "/su/01.\u4ECB\u7ECD"
    },
    {
      text: "ERPNext",
      activeMatch: "/ERPNext\u5165\u5751\u7B14\u8BB0/",
      link: "/ERPNext\u5165\u5751\u7B14\u8BB0/01.\u4ECB\u7ECD"
    },
    {
      text: "\u591A\u5143\u6587\u5316",
      link: "/\u591A\u5143\u6587\u5316/\u53EE\u53EE\u5F53\u5F53",
      activeMatch: "/\u591A\u5143\u6587\u5316/"
    },
    {
      text: "\u5176\u4ED6",
      link: "/\u5176\u4ED6/quasar/icon",
      activeMatch: "/\u5176\u4ED6/"
    }
  ];
}
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy1jb2RlLy52aXRlcHJlc3MvY29uZmlnLm10cyIsICJhbXRmL3ZpdGVwcmVzcy9cdTYyMTBcdTRGQTdcdTY4MEZcdTc2RUVcdTVGNTUuanMiLCAiYW10Zi92aXRlcHJlc3MvdXRpbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxhbXRmLWNvZGVcXFxcYW10Zi1sYW95dS12aXRlcHJlc3MtcXVhc2FyXFxcXGRvY3MtY29kZVxcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxhbXRmLWNvZGVcXFxcYW10Zi1sYW95dS12aXRlcHJlc3MtcXVhc2FyXFxcXGRvY3MtY29kZVxcXFwudml0ZXByZXNzXFxcXGNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2FtdGYtY29kZS9hbXRmLWxhb3l1LXZpdGVwcmVzcy1xdWFzYXIvZG9jcy1jb2RlLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlcHJlc3NcIlxyXG4vLyBpbXBvcnQgQXV0b1NpZGViYXIgZnJvbSBcImFtdGYtdml0ZXByZXNzLWF1dG8tc2lkZWJhclwiXHJcbmltcG9ydCBcdTYyMTBcdTRGQTdcdTY4MEZcdTc2RUVcdTVGNTUgZnJvbSBcIi4uLy4uL2FtdGYvdml0ZXByZXNzL1x1NjIxMFx1NEZBN1x1NjgwRlx1NzZFRVx1NUY1NVwiXHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiXHJcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIlxyXG5cclxuaW1wb3J0IHsgcXVhc2FyLCB0cmFuc2Zvcm1Bc3NldFVybHMgfSBmcm9tIFwiQHF1YXNhci92aXRlLXBsdWdpblwiXHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiXHJcblxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tIFwidW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZVwiXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCJcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnNcIlxyXG5cclxuLy8gaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJ3VucGx1Z2luLWVsZW1lbnQtcGx1cy92aXRlJ1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGlnbm9yZURlYWRMaW5rczogdHJ1ZSxcclxuICB0aXRsZTogXCJhbXRmfn5cIixcclxuICBkZXNjcmlwdGlvbjogXCJhbXRmfn5cIixcclxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICBjbGVhblVybHM6IHRydWUsXHJcbiAgbGFuZzogXCJ6aFwiLFxyXG4gIG1hcmtkb3duOiB7XHJcbiAgICBtYXRoOiB0cnVlLFxyXG4gIH0sXHJcbiAgdnVlOiB7XHJcbiAgICB0ZW1wbGF0ZTogeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSxcclxuICB9LFxyXG4gIGJhc2U6IFwiL1wiLFxyXG4gIHZpdGU6IHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAvLyBvcGVuOiB0cnVlLCAvL1x1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxyXG4gICAgICBwb3J0OiA1MTg4LFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cHM6Ly95aWd1eGlhbnl1bi5naXRlZS5pby9hbXRmLXNqXCIsIC8vXHU3NkVFXHU2ODA3XHU3RjUxXHU3QUQ5LFx1NjcwRFx1NTJBMVx1N0FFRlx1NTczMFx1NTc0MFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZShwYXRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgLy8gRWxlbWVudFBsdXMoKVxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgLy9kZXZcdTc2ODRcdTY1RjZcdTUwMTlcdTUzRUZcdTRFRTVcdTc1MjhcdUZGMEMgYnVpbGRcdTc2ODRcdTY1RjZcdTUwMTlcdTRGMUFcdTYyQTVcdTk1MTlcdTIwMjZcdTIwMjZcclxuICAgICAgLy8gQXV0b0ltcG9ydCh7XHJcbiAgICAgIC8vICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAvLyB9KSxcclxuICAgICAgLy8gQ29tcG9uZW50cyh7XHJcbiAgICAgIC8vICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAvLyB9KSxcclxuXHJcbiAgICAgIC8vIGFkZCBwbHVnaW4gY29sbGFwc2VkOiB0cnVlXHU2Mjk4XHU1M0UwXHU3NkVFXHU1RjU1XHJcbiAgICAgIC8vIEF1dG9TaWRlYmFyKHsgcHJlZml4OiBcIi5cIiwgY29sbGFwc2VkOiB0cnVlLCBcdTVGRkRcdTc1NjVcdTU0MEVcdTdGMDBcdTU0MEQ6IFtcIi52dWVcIiwgXCIuanNcIl0gfSksXHJcbiAgICAgIFx1NjIxMFx1NEZBN1x1NjgwRlx1NzZFRVx1NUY1NSh7XHJcbiAgICAgICAgcGF0aDogXCIvZG9jcy1jb2RlXCIsXHJcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgIFx1NUZGRFx1NzU2NVx1NTQwRVx1N0YwMFx1NTQwRDogW1wiLnZ1ZVwiLCBcIi5qc1wiXSxcclxuICAgICAgICBpZ25vcmVJbmRleEl0ZW06IHRydWUsXHJcbiAgICAgICAgaWdub3JlTGlzdDogW1wiaW1hZ2VzXCIsIFwiaW1nXCIsIFwiemhcIiwgXCJzbmlwcGV0c1wiLCBcInB1YmxpY1wiXSxcclxuICAgICAgICAvLyBpZ25vcmVMaXN0OiBbXCJpbWFnZXNcIiwgXCJ6aFwiLCBcInNuaXBwZXRzXCIsIFwicHVibGljXCIsICwgXCJFUlBOZXh0XHU1MTY1XHU1NzUxXHU3QjE0XHU4QkIwXCIsIFwic3VcIl0sXHJcbiAgICAgICAgLy8gaWdub3JlTGlzdDogW1wiaW1hZ2VzXCIsIFwiemhcIiwgXCJzbmlwcGV0c1wiLCBcInB1YmxpY1wiLCBcIlx1NTkxQVx1NTE0M1x1NjU4N1x1NTMxNlwiLCBcIkVSUE5leHRcdTUxNjVcdTU3NTFcdTdCMTRcdThCQjBcIiwgXCJzdVwiXSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIHZ1ZSh7XHJcbiAgICAgIC8vICAgICB0ZW1wbGF0ZTogeyB0cmFuc2Zvcm1Bc3NldFVybHMgfVxyXG4gICAgICAvLyAgIH0pLFxyXG4gICAgICAvLyBcdThGRDlcdTkxQ0NcdTc1MjhxdWFzYXIgYnVpbGRcdTc2ODRcdTY1RjZcdTUwMTlcdTRGMUFcdTYyQTVcdTk1MTlcclxuICAgICAgLy8gcXVhc2FyKHtcclxuICAgICAgLy8gICAgIHNhc3NWYXJpYWJsZXM6ICcuL3RoZW1lL2Nzcy9xdWFzYXIudmFyaWFibGVzLnNjc3MnXHJcbiAgICAgIC8vICAgfSlcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4uLy4uL1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgICBcIkB0aGVcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi90aGVtZS9cIiwgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIGFsaWFzOiBbXHJcbiAgICAgIC8vICAgICB7XHJcbiAgICAgIC8vICAgICAgICAgZmluZDogXCJAdGhlXCIsXHJcbiAgICAgIC8vICAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi90aGVtZS9cIiksXHJcbiAgICAgIC8vICAgICB9LFxyXG4gICAgICAvLyAgICAge1xyXG4gICAgICAvLyAgICAgICAgIGZpbmQ6IFwiQFwiLFxyXG4gICAgICAvLyAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4uLy4uL1wiKSxcclxuICAgICAgLy8gICAgIH0sXHJcbiAgICAgIC8vIF0sXHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICAvKiBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcdTUxNjhcdTVDNDBzY3NzXHU2NTg3XHU0RUY2ICovXHJcbiAgICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCJAdGhlL2Nzcy9xdWFzYXIudmFyaWFibGVzLnNjc3NcIjsnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyBzaXRlbWFwOiB7XHJcbiAgLy8gICBob3N0bmFtZTogJ2h0dHBzOi8vdml0ZXByZXNzLmRldicsXHJcbiAgLy8gICB0cmFuc2Zvcm1JdGVtcyhpdGVtcykge1xyXG4gIC8vICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtKSA9PiAhaXRlbS51cmwuaW5jbHVkZXMoJ21pZ3JhdGlvbicpKVxyXG4gIC8vICAgfVxyXG4gIC8vIH0sXHJcblxyXG4gIC8qIHByZXR0aWVyLWlnbm9yZSAqL1xyXG4gIGhlYWQ6IFtcclxuICAgIFsnbWV0YScsIHsgbmFtZTogJ3ZpZXdwb3J0JywgY29udGVudDogJ3VzZXItc2NhbGFibGU9bm8saW5pdGlhbC1zY2FsZT0xLG1heGltdW0tc2NhbGU9MSxtaW5pbXVtLXNjYWxlPTEsd2lkdGg9ZGV2aWNlLXdpZHRoJyB9XSxcclxuXHJcbiAgICAvL1x1NUMwNiBmYXZpY29uLmljbyBcdTY1M0VcdTU3MjhcdTUxNkNcdTUxNzFcdTc2RUVcdTVGNTVcdTRFMkRcdUZGMENcdTU5ODJcdTY3OUNcdThCQkVcdTdGNkVcdTRFODYgYmFzZShcdTkwRThcdTdGNzJcdTU3MjhcdTdGNTFcdTdBRDlcdTVCNTBcdThERUZcdTVGODRcdTY1RjYpXHVGRjBDXHU1MjE5XHU0RjdGXHU3NTI4IC9iYXNlL2Zhdmljb24uaWNvXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL2Zhdmljb24uaWNvJyB9XSxcclxuICAgIFsnbGluaycsIHsgcmVsOiAnaWNvbicsIHR5cGU6ICd0ZXh0L3BsYWluJywgaHJlZjogJy9mYXZpY29uLmljbycgfV0sXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2UvcG5nJywgc2l6ZXM6IFwiMTI4eDEyOFwiLCBocmVmOiAnL2ljb25zL2FtdGYtbWwxMjgucG5nJyB9XSxcclxuICAgIFsnbGluaycsIHsgcmVsOiAnaWNvbicsIHR5cGU6ICdpbWFnZS9wbmcnLCBzaXplczogXCI5Nng5NlwiLCBocmVmOiAnL2ljb25zL2FtdGYtbWw5Ni5wbmcnIH1dLFxyXG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgdHlwZTogJ2ltYWdlL3BuZycsIHNpemVzOiBcIjMyeDMyXCIsIGhyZWY6ICcvaWNvbnMvYW10Zi1tbDMyLnBuZycgfV0sXHJcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2UvcG5nJywgc2l6ZXM6IFwiMTZ4MTZcIiwgaHJlZjogJy9pY29ucy9hbXRmLW0xNi5wbmcnIH1dLFxyXG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgdHlwZTogJ2ltYWdlL2ljbycsIHNpemVzOiBcIjE2eDE2XCIsIGhyZWY6ICcvYW10Zi5pY28nIH1dLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAndGhlbWUtY29sb3InLCBjb250ZW50OiAnIzVmNjdlZScgfV0sXHJcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICdvZzp0eXBlJywgY29udGVudDogJ3dlYnNpdGUnIH1dLFxyXG4gICAgWydtZXRhJywgeyBuYW1lOiAnb2c6bG9jYWxlJywgY29udGVudDogJ2VuJyB9XSxcclxuICAgIFsnbWV0YScsIHsgbmFtZTogJ29nOnNpdGVfbmFtZScsIGNvbnRlbnQ6ICdhbXRmJyB9XSxcclxuICAgIFsnbWV0YScsIHsgbmFtZTogJ29nOmltYWdlJywgY29udGVudDogJy9pY29ucy9hbXRmLW1sMTI4LnBuZycgfV0sXHJcbiAgICBbJ3NjcmlwdCcsIHsgc3JjOiAnaHR0cHM6Ly9jZG4udXNlZmF0aG9tLmNvbS9zY3JpcHQuanMnLCAnZGF0YS1zaXRlJzogJ0FaQlJTRkdHJywgJ2RhdGEtc3BhJzogJ2F1dG8nLCBkZWZlcjogJycgfV1cclxuICBdLFxyXG4gIHRoZW1lQ29uZmlnOiB7XHJcbiAgICAvLyBzaXRlVGl0bGU6ICdcdUQ4M0RcdURFMDQnLFxyXG4gICAgc2l0ZVRpdGxlOiBcIlwiLFxyXG4gICAgLy8gc2l0ZVRpdGxlOiBcIlx1RDgzRFx1RENERGVycG5leHQmZnJhcHBlXHU1QjY2XHU0RTYwXHU3QjE0XHU4QkIwXCIsXHJcbiAgICBsb2dvOiB7IHNyYzogXCIvaWNvbnMvYW10Zi1tbDEyOC5wbmdcIiB9LFxyXG4gICAgb3V0bGluZTogXCJkZWVwXCIsXHJcbiAgICBuYXY6IG5hdigpLFxyXG4gICAgc2lkZWJhcjoge1xyXG4gICAgICAvLyBcIi9FUlBOZXh0L1wiOiB7IGJhc2U6IFwiL0VSUE5leHQvXCIsIGl0ZW1zOiBlcnBuZXh0XHU3NkVFXHU1RjU1KCkgfSxcclxuICAgICAgLy8gXCIvemgvZ3VpZGUvXCI6IHsgYmFzZTogXCIvemgvZ3VpZGUvXCIsIGl0ZW1zOiBzaWRlYmFyR3VpZGUoKSB9LFxyXG4gICAgICAvLyBcIi96aC9yZWZlcmVuY2UvXCI6IHsgYmFzZTogXCIvemgvcmVmZXJlbmNlL1wiLCBpdGVtczogc2lkZWJhclJlZmVyZW5jZSgpIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIGVkaXRMaW5rOiB7XHJcbiAgICAgIHBhdHRlcm46IFwiaHR0cHM6Ly9naXRodWIuY29tL2FtdGYtbHkvZWRpdC9tYXN0ZXIvZG9jcy1jb2RlLzpwYXRoXCIsXHJcbiAgICAgIHRleHQ6IFwiXHU1M0JCXHU2NTM5XHU2QjYzXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHNvY2lhbExpbmtzOiBbXHJcbiAgICAvLyAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdml0ZXByZXNzJyB9XHJcbiAgICAvLyBdLFxyXG4gICAgb3V0bGluZVRpdGxlOiBcIlx1NjcyQ1x1OTg3NVx1NzZFRVx1NUY1NVwiLFxyXG4gICAgZm9vdGVyOiB7XHJcbiAgICAgIG1lc3NhZ2U6IFwiXHU1OTI3XHU4MDlBXHU4MEZEXHU1QkI5XHVGRjBDXHU3QjExXHU1M0UzXHU1RTM4XHU1RjAwfn5cIixcclxuICAgICAgLy8gY29weXJpZ2h0OiAnQ29weXJpZ2h0IFx1MDBBOSAyMDE5LXByZXNlbnQgRXZhbiBZb3UnXHJcbiAgICB9LFxyXG5cclxuICAgIHNlYXJjaDoge1xyXG4gICAgICBwcm92aWRlcjogXCJsb2NhbFwiLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgbG9jYWxlczoge1xyXG4gICAgICAgICAgcm9vdDoge1xyXG4gICAgICAgICAgICB0cmFuc2xhdGlvbnM6IHtcclxuICAgICAgICAgICAgICBidXR0b246IHtcclxuICAgICAgICAgICAgICAgIGJ1dHRvblRleHQ6IFwiXHU2NDFDXHU3RDIyXCIsXHJcbiAgICAgICAgICAgICAgICBidXR0b25BcmlhTGFiZWw6IFwiXHU2NDFDXHU3RDIyXHU2MzA5XHU5NEFFXCIsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBtb2RhbDoge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheURldGFpbHM6IFwiXHU2NjNFXHU3OTNBXHU4QkU2XHU2MEM1XCIsXHJcbiAgICAgICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiBcIlx1NkUwNVx1N0E3QVwiLFxyXG4gICAgICAgICAgICAgICAgYmFja0J1dHRvblRpdGxlOiBcIlx1OEZENFx1NTZERVx1NjQxQ1x1N0QyMlx1N0VEM1x1Njc5Q1wiLFxyXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogXCJcdTZDQTFcdTY3MDlcdTYyN0VcdTUyMzBcdTdFRDNcdTY3OUNcIixcclxuICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgICAgICBzZWxlY3RUZXh0OiBcIlx1OTAwOVx1NjJFOVwiLFxyXG4gICAgICAgICAgICAgICAgICBzZWxlY3RLZXlBcmlhTGFiZWw6IFwiXHU1NkRFXHU4RjY2XHU5NTJFXCIsXHJcbiAgICAgICAgICAgICAgICAgIG5hdmlnYXRlVGV4dDogXCJcdTUyMDdcdTYzNjJcIixcclxuICAgICAgICAgICAgICAgICAgbmF2aWdhdGVVcEtleUFyaWFMYWJlbDogXCJcdTRFMEFcdTY1QjlcdTU0MTFcdTk1MkVcIixcclxuICAgICAgICAgICAgICAgICAgbmF2aWdhdGVEb3duS2V5QXJpYUxhYmVsOiBcIlx1NEUwQlx1NjVCOVx1NTQxMVx1OTUyRVwiLFxyXG4gICAgICAgICAgICAgICAgICBjbG9zZVRleHQ6IFwiXHU1MTczXHU5NUVEXCIsXHJcbiAgICAgICAgICAgICAgICAgIGNsb3NlS2V5QXJpYUxhYmVsOiBcIkVTQ1x1OTUyRVwiLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG5cclxuZnVuY3Rpb24gbmF2KCkge1xyXG4gIHJldHVybiBbXHJcbiAgICB7XHJcbiAgICAgIHRleHQ6IFwiT0FcdUQ4M0RcdURDMzFcdTIwMERcdUQ4M0NcdURGQ0RcIixcclxuICAgICAgYWN0aXZlTWF0Y2g6IFwiL09BL1wiLFxyXG4gICAgICBsaW5rOiBcIi9PQS8xXHU0RUNCXHU3RUNEXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICB0ZXh0OiBcIlx1NTU0Nlx1NTdDRVx1RDgzRFx1REMzMVx1MjAwRFx1RDgzQ1x1REZDRFwiLFxyXG4gICAgICBhY3RpdmVNYXRjaDogXCIvXHU1NTQ2XHU1N0NFL1wiLFxyXG4gICAgICBsaW5rOiBcIi9cdTU1NDZcdTU3Q0UvMVx1NEVDQlx1N0VDRFwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJTa2V0Y2hVcFwiLFxyXG4gICAgICBhY3RpdmVNYXRjaDogXCIvc3UvXCIsXHJcbiAgICAgIGxpbms6IFwiL3N1LzAxLlx1NEVDQlx1N0VDRFwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJFUlBOZXh0XCIsXHJcbiAgICAgIGFjdGl2ZU1hdGNoOiBcIi9FUlBOZXh0XHU1MTY1XHU1NzUxXHU3QjE0XHU4QkIwL1wiLFxyXG4gICAgICBsaW5rOiBcIi9FUlBOZXh0XHU1MTY1XHU1NzUxXHU3QjE0XHU4QkIwLzAxLlx1NEVDQlx1N0VDRFwiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTU5MUFcdTUxNDNcdTY1ODdcdTUzMTZcIixcclxuICAgICAgbGluazogXCIvXHU1OTFBXHU1MTQzXHU2NTg3XHU1MzE2L1x1NTNFRVx1NTNFRVx1NUY1M1x1NUY1M1wiLFxyXG4gICAgICBhY3RpdmVNYXRjaDogXCIvXHU1OTFBXHU1MTQzXHU2NTg3XHU1MzE2L1wiLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgdGV4dDogXCJcdTUxNzZcdTRFRDZcIixcclxuICAgICAgbGluazogXCIvXHU1MTc2XHU0RUQ2L3F1YXNhci9pY29uXCIsXHJcbiAgICAgIGFjdGl2ZU1hdGNoOiBcIi9cdTUxNzZcdTRFRDYvXCIsXHJcbiAgICB9LFxyXG5cclxuICBdXHJcbn1cclxuXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcYW10Zi1jb2RlXFxcXGFtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhclxcXFxhbXRmXFxcXHZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYW10Zi1jb2RlXFxcXGFtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhclxcXFxhbXRmXFxcXHZpdGVwcmVzc1xcXFxcdTYyMTBcdTRGQTdcdTY4MEZcdTc2RUVcdTVGNTUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2FtdGYtY29kZS9hbXRmLWxhb3l1LXZpdGVwcmVzcy1xdWFzYXIvYW10Zi92aXRlcHJlc3MvJUU2JTg4JTkwJUU0JUJFJUE3JUU2JUEwJThGJUU3JTlCJUFFJUU1JUJEJTk1LmpzXCI7aW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCJcclxuaW1wb3J0IHsgcmVhZGRpclN5bmMsIHN0YXRTeW5jIH0gZnJvbSBcImZzXCJcclxuaW1wb3J0IHsgREVGQVVMVF9JR05PUkVfRk9MREVSLCBsb2csIHJlbW92ZVByZWZpeCwgZ2V0VGl0bGVGcm9tRmlsZSB9IGZyb20gXCIuL3V0aWxzXCJcclxuXHJcbmxldCBvcHRpb25cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVNpZGVCYXJJdGVtcyh0YXJnZXRQYXRoLCAuLi5cdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBpZ25vcmVJbmRleEl0ZW0sXHJcbiAgICAgICAgZGVsZXRlUHJlZml4LFxyXG4gICAgICAgIGNvbGxhcHNlZCA9IGZhbHNlLFxyXG4gICAgICAgIHNpZGVCYXJJdGVtc1Jlc29sdmVkLFxyXG4gICAgICAgIGJlZm9yZUNyZWF0ZVNpZGVCYXJJdGVtcyxcclxuICAgICAgICBpZ25vcmVMaXN0ID0gW10sXHJcbiAgICAgICAgXHU1RkZEXHU3NTY1XHU1NDBFXHU3RjAwXHU1NDBEID0gW10sXHJcbiAgICAgICAgdGl0bGVGcm9tRmlsZSA9IGZhbHNlLFxyXG4gICAgfSA9IG9wdGlvblxyXG4gICAgLy8gY29uc29sZS5sb2coYFx1NjU4N1x1NEVGNlx1NTkzOVx1N0VDNCBcdUQ4M0RcdURDNDlgLCBcdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQpXHJcbiAgICAvLyBjb25zb2xlLmxvZyhgLi4uXHU2NTg3XHU0RUY2XHU1OTM5XHU3RUM0IFx1RDgzRFx1REM0OWAsIC4uLlx1NjU4N1x1NEVGNlx1NTkzOVx1N0VDNClcclxuICAgIGNvbnN0IHJhd05vZGUgPSByZWFkZGlyU3luYyhqb2luKHRhcmdldFBhdGgsIC4uLlx1NjU4N1x1NEVGNlx1NTkzOVx1N0VDNCkpXHJcbiAgICBsZXQgbm9kZSA9IGJlZm9yZUNyZWF0ZVNpZGVCYXJJdGVtcz8uKHJhd05vZGUpID8/IHJhd05vZGVcclxuICAgIG5vZGUgPSBub2RlLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhaXRlbS5pbmNsdWRlcyhcImNvbXBvbmVudHNcIilcclxuICAgIH0pXHJcbiAgICAvLyBjb25zb2xlLmxvZyhgbm9kZSBcdUQ4M0RcdURDNDlgLCBub2RlKVxyXG4gICAgY29uc3QgY3VycmVudERpciA9IGpvaW4odGFyZ2V0UGF0aCwgLi4uXHU2NTg3XHU0RUY2XHU1OTM5XHU3RUM0KVxyXG4gICAgLy8gY29uc29sZS5sb2coYGN1cnJlbnREaXIgXHVEODNEXHVEQzQ5YCwgY3VycmVudERpcilcclxuICAgIGlmIChpZ25vcmVJbmRleEl0ZW0gJiYgbm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXSA9PT0gXCJpbmRleC5tZFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXVxyXG4gICAgZm9yIChjb25zdCBmbmFtZSBvZiBub2RlKSB7XHJcbiAgICAgICAgaWYgKHN0YXRTeW5jKGpvaW4odGFyZ2V0UGF0aCwgLi4uXHU2NTg3XHU0RUY2XHU1OTM5XHU3RUM0LCBmbmFtZSkpLmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZUxpc3QuaW5jbHVkZXMoZm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlzIGRpcmVjdG9yeVxyXG4gICAgICAgICAgICAvLyBpZ25vcmUgY3VyIG5vZGUgaWYgaXRlbXMgbGVuZ3RoIGlzIDBcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBjcmVhdGVTaWRlQmFySXRlbXMoam9pbih0YXJnZXRQYXRoKSwgLi4uXHU2NTg3XHU0RUY2XHU1OTM5XHU3RUM0LCBmbmFtZSlcclxuICAgICAgICAgICAgLy8gcmVwbGFjZSBkaXJlY3RvcnkgbmFtZSwgaWYgeWVzXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZm5hbWVcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0aXRsZSBpbiBpbmRleC5tZCBmaWxlXHJcbiAgICAgICAgICAgIGlmICh0aXRsZUZyb21GaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgam9pbihjdXJyZW50RGlyLCBmbmFtZSwgXCJpbmRleC5tZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBqb2luKGN1cnJlbnREaXIsIGZuYW1lLCBcImluZGV4Lk1EXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGpvaW4oY3VycmVudERpciwgZm5hbWUsIGZuYW1lICsgXCIubWRcIiksXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGZpbGVuYW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZ2V0VGl0bGVGcm9tRmlsZShmaWxlbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZWxldGVQcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgIHRleHQgPSByZW1vdmVQcmVmaXgodGV4dCwgZGVsZXRlUHJlZml4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzaWRlYmFySXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gdml0ZVByZXNzIHNpZGViYXIgb3B0aW9uIGNvbGxhcHNlZFxyXG4gICAgICAgICAgICAgICAgc2lkZWJhckl0ZW0uY29sbGFwc2VkID0gY29sbGFwc2VkXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzaWRlYmFySXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTVCNTBcdTY1ODdcdTRFRjZcdTRFMkRcdTUzRUFcdTY3MDlcdTRFMDBcdTRFMkEgaW5kZXgubWQgXHU1QjUwXHU2NTg3XHU0RUY2XHVEODNEXHVEQzQ3XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2lkZWJhckl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi9cIiArIFsuLi5cdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQsIGAke3RleHR9YF0uam9pbihcIi9cIikgKyBcIi9cIixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHZpdGVQcmVzcyBzaWRlYmFyIG9wdGlvbiBjb2xsYXBzZWRcclxuICAgICAgICAgICAgICAgIHNpZGViYXJJdGVtLmNvbGxhcHNlZCA9IGNvbGxhcHNlZFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goc2lkZWJhckl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgXHU2NjJGXHU2NTg3XHU0RUY2IGluZ1x1RDgzRFx1REM0N2ApXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIChpZ25vcmVJbmRleEl0ZW0gJiYgZm5hbWUgPT09IFwiaW5kZXgubWRcIikgfHxcclxuICAgICAgICAgICAgICAgIC8vIFx1NEVFNVx1OEZERVx1NUI1N1x1N0IyNlx1NUYwMFx1NTkzNFx1RkYwQ1x1NTQwRVx1OTc2Mlx1OERERlx1Nzc0MFx1NEVGQlx1NjEwRlx1NUI1N1x1N0IyNlx1RkYwQ1x1NzEzNlx1NTQwRVx1NEVFNS5tZFx1NjIxNi5NRFx1N0VEM1x1NUMzRVxyXG4gICAgICAgICAgICAgICAgL14tLipcXC4obWR8TUQpJC8udGVzdChmbmFtZSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBcdTY2MkZcdTVGRkRcdTc1NjVcdTY1ODdcdTRFRjYgPSBmYWxzZVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgXHU1RkZEXHU3NTY1XHU1NDBFXHU3RjAwXHU1NDBEKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXR0ZXJuID0gbmV3IFJlZ0V4cChgJHtlfSRgLCBcImlcIilcclxuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoZm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHU2NjJGXHU1RkZEXHU3NTY1XHU2NTg3XHU0RUY2ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFx1NjYyRlx1NUZGRFx1NzU2NVx1NjU4N1x1NEVGNikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmbmFtZS5yZXBsYWNlKC9cXC5tZCQvLCBcIlwiKVxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IGZpbGVOYW1lXHJcbiAgICAgICAgICAgIGlmIChkZWxldGVQcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgIHRleHQgPSByZW1vdmVQcmVmaXgodGV4dCwgZGVsZXRlUHJlZml4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJlYWxGaWxlTmFtZSA9IGpvaW4oY3VycmVudERpciwgZm5hbWUpXHJcbiAgICAgICAgICAgIGlmICh0aXRsZUZyb21GaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGdldFRpdGxlRnJvbUZpbGUocmVhbEZpbGVOYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRpdGxlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgICAgICAvLyBsaW5rOiBcIi9cIiArIFsuLi5cdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQsIGAke2ZpbGVOYW1lfS5odG1sYF0uam9pbihcIi9cIiksXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9cIiArIFsuLi5cdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQsIGAke2ZpbGVOYW1lfWBdLmpvaW4oXCIvXCIpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpdGVtIDo+PiAnLCBpdGVtKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coJ3Jlc3VsdCA6Pj4gJywgcmVzdWx0KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdzaWRlQmFySXRlbXNSZXNvbHZlZD8uKHJlc3VsdCkgOj4+ICcsIHNpZGVCYXJJdGVtc1Jlc29sdmVkPy4ocmVzdWx0KSk7XHJcbiAgICByZXR1cm4gc2lkZUJhckl0ZW1zUmVzb2x2ZWQ/LihyZXN1bHQpID8/IHJlc3VsdFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTaWRlQmFyR3JvdXBzKHRhcmdldFBhdGgsIGZvbGRlcikge1xyXG4gICAgLy8gY29uc29sZS5sb2coYGZvbGRlciBcdUQ4M0RcdURDNDlgLGZvbGRlcilcclxuICAgIGxldCBpdGVtcyA9IGNyZWF0ZVNpZGVCYXJJdGVtcyh0YXJnZXRQYXRoLCBmb2xkZXIpXHJcbiAgICBjb25zb2xlLmxvZyhgY3JlYXRlU2lkZUJhckdyb3VwcyBpdGVtcyBcdUQ4M0RcdURDNDlgLCBpdGVtcylcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaXRlbXNcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4gW1xyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaXRlbXM6IGNyZWF0ZVNpZGVCYXJJdGVtcyh0YXJnZXRQYXRoLCBmb2xkZXIpLFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyBdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVNpZGViYXJNdWx0aShwYXRoKSB7XHJcbiAgICBjb25zdCB7IGlnbm9yZUxpc3QgPSBbXSwgaWdub3JlSW5kZXhJdGVtID0gZmFsc2UsIHNpZGVCYXJSZXNvbHZlZCB9ID0gb3B0aW9uXHJcbiAgICBjb25zdCBpbCA9IFsuLi5ERUZBVUxUX0lHTk9SRV9GT0xERVIsIC4uLmlnbm9yZUxpc3RdXHJcbiAgICBjb25zdCBkYXRhID0ge31cclxuICAgIGNvbnN0IG5vZGUgPSByZWFkZGlyU3luYyhwYXRoKS5maWx0ZXIobiA9PiBzdGF0U3luYyhqb2luKHBhdGgsIG4pKS5pc0RpcmVjdG9yeSgpICYmICFpbC5pbmNsdWRlcyhuKSlcclxuXHJcbiAgICBmb3IgKGNvbnN0IGsgb2Ygbm9kZSkge1xyXG4gICAgICAgIGRhdGFbYC8ke2t9L2BdID0gY3JlYXRlU2lkZUJhckdyb3VwcyhwYXRoLCBrKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKFwiZGF0YSA6Pj4gXCIsIGRhdGEpXHJcblxyXG4gICAgLy8gaXMgaWdub3JlZCBvbmx5IGluZGV4Lm1kXHJcbiAgICAvLyBpZiAoaWdub3JlSW5kZXhJdGVtKSB7XHJcbiAgICAvLyAgICAgZm9yIChjb25zdCBpIGluIGRhdGEpIHtcclxuICAgIC8vICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV1cclxuICAgIC8vICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgb2JqID0gb2JqLmZpbHRlcihpID0+IGkuaXRlbXMgIT0gbnVsbCAmJiBpLml0ZW1zLmxlbmd0aCA+IDApXHJcbiAgICAvLyAgICAgICAgICAgICBpZiAob2JqLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoZGF0YSwgaSlcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImRhdGEgOj4+IFwiLCBkYXRhKVxyXG4gICAgcmV0dXJuIHNpZGVCYXJSZXNvbHZlZD8uKGRhdGEpID8/IGRhdGFcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gXHU2MjEwXHU0RkE3XHU2ODBGXHU3NkVFXHU1RjU1KG9wdCA9IHt9KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6IFwiYW10Zi12aXRlcHJlc3MtYXV0by1zaWRlYmFyXCIsXHJcbiAgICAgICAgY29uZmlndXJlU2VydmVyKHsgd2F0Y2hlciwgcmVzdGFydCB9KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZzV2F0Y2hlciA9IHdhdGNoZXIuYWRkKFwiKi5tZFwiKVxyXG4gICAgICAgICAgICBmc1dhdGNoZXIub24oXCJhbGxcIiwgYXN5bmMgKGV2ZW50LCBwYXRoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgIT09IFwiY2hhbmdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2coYCR7ZXZlbnR9ICR7cGF0aH1gKVxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coXCJ1cGRhdGUgc2lkZWJhci4uLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coYCR7ZXZlbnR9ICR7cGF0aH1gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coXCJ1cGRhdGUgc2lkZWJhciBmYWlsZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25maWcoY29uZmlnKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbiA9IG9wdFxyXG4gICAgICAgICAgICAvLyBjb25zdCB7IHBhdGggPSBcIi9kb2NzLWNvZGVcIiB9ID0gb3B0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IHsgcGF0aCB9ID0gb3B0aW9uXHJcbiAgICAgICAgICAgIC8vIGluY3JlbWVudCBpZ25vcmUgaXRlbVxyXG4gICAgICAgICAgICBjb25zdCBkb2NzUGF0aCA9IGpvaW4ocHJvY2Vzcy5jd2QoKSwgcGF0aClcclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBzaWRlYmFyIGRhdGEgYW5kIGluc2VydFxyXG4gICAgICAgICAgICAgICAgOyAoY29uZmlnKS52aXRlcHJlc3Muc2l0ZS50aGVtZUNvbmZpZy5zaWRlYmFyID0gY3JlYXRlU2lkZWJhck11bHRpKGRvY3NQYXRoKVxyXG4gICAgICAgICAgICBsb2coXCJpbmplY3RlZCBzaWRlYmFyIGRhdGEgc3VjY2Vzc2Z1bGx5XCIpXHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWdcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcYW10Zi1jb2RlXFxcXGFtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhclxcXFxhbXRmXFxcXHZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYW10Zi1jb2RlXFxcXGFtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhclxcXFxhbXRmXFxcXHZpdGVwcmVzc1xcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovYW10Zi1jb2RlL2FtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhci9hbXRmL3ZpdGVwcmVzcy91dGlscy50c1wiOy8vIGltcG9ydCBjIGZyb20gJ3BpY29jb2xvcnMnO1xyXG5pbXBvcnQgeyBleGlzdHNTeW5jLCByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XHJcblxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9JR05PUkVfRk9MREVSID0gWydzY3JpcHRzJywgJ2NvbXBvbmVudHMnLCAnYXNzZXRzJywgJy52aXRlcHJlc3MnXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGxvZyAoLi4uaW5mbzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAvLyBjb25zb2xlLmxvZyhjLmJvbGQoYy5jeWFuKCdbYXV0by1zaWRlYmFyXScpKSwgLi4uaW5mbyk7XHJcbiAgY29uc29sZS5sb2coJ1thdXRvLXNpZGViYXJdJywgLi4uaW5mbyk7XHJcbn1cclxuXHJcbi8vIHJlbW92ZSB0aGUgZmlsZSBwcmVmaXhcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVByZWZpeCAoc3RyOiBzdHJpbmcsIGlkZW50aWZpZXI6IHN0cmluZyB8IFJlZ0V4cCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGlkZW50aWZpZXIsICcnKTtcclxufVxyXG5cclxuLy8gXHU1QzFEXHU4QkQ1XHU0RUNFXHU0RTAwXHU0RTJBbWRcdTY1ODdcdTRFRjZcdTRFMkRcdThCRkJcdTUzRDZcdTY4MDdcdTk4OThcdUZGMENcdThCRkJcdTUzRDZcdTUyMzBcdTdCMkNcdTRFMDBcdTRFMkEgXHUyMDE4IyBcdTY4MDdcdTk4OThcdTUxODVcdTVCQjlcdTIwMTkgXHU3Njg0XHU2NUY2XHU1MDE5XHU4RkQ0XHU1NkRFXHU4RkQ5XHU0RTAwXHU4ODRDXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUaXRsZUZyb21GaWxlIChyZWFsRmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgaWYgKCFleGlzdHNTeW5jKHJlYWxGaWxlTmFtZSkpIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIGNvbnN0IGZpbGVFeHRlbnNpb24gPSByZWFsRmlsZU5hbWUuc3Vic3RyaW5nKFxyXG4gICAgcmVhbEZpbGVOYW1lLmxhc3RJbmRleE9mKCcuJykgKyAxXHJcbiAgKTtcclxuICBpZiAoZmlsZUV4dGVuc2lvbiAhPT0gJ21kJyAmJiBmaWxlRXh0ZW5zaW9uICE9PSAnTUQnKSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICAvLyByZWFkIGNvbnRlbnRzIG9mIHRoZSBmaWxlXHJcbiAgY29uc3QgZGF0YSA9IHJlYWRGaWxlU3luYyhyZWFsRmlsZU5hbWUsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSk7XHJcbiAgLy8gc3BsaXQgdGhlIGNvbnRlbnRzIGJ5IG5ldyBsaW5lXHJcbiAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KC9cXHI/XFxuLyk7XHJcbiAgLy8gcmV0dXJuIHRpdGxlXHJcbiAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XHJcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCcjICcpKSB7XHJcbiAgICAgIHJldHVybiBsaW5lLnN1YnN0cmluZygyKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJXLFNBQVMsb0JBQW9COzs7QUNBWCxTQUFTLFlBQVk7QUFDbFosU0FBUyxhQUFhLGdCQUFnQjs7O0FDQXRDLFNBQVMsWUFBWSxvQkFBb0I7QUFFbEMsSUFBTSx3QkFBd0IsQ0FBQyxXQUFXLGNBQWMsVUFBVSxZQUFZO0FBQzlFLFNBQVMsT0FBUSxNQUFzQjtBQUU1QyxVQUFRLElBQUksa0JBQWtCLEdBQUcsSUFBSTtBQUN2QztBQUdPLFNBQVMsYUFBYyxLQUFhLFlBQXFDO0FBQzlFLFNBQU8sSUFBSSxRQUFRLFlBQVksRUFBRTtBQUNuQztBQUdPLFNBQVMsaUJBQWtCLGNBQTBDO0FBQzFFLE1BQUksQ0FBQyxXQUFXLFlBQVksR0FBRztBQUM3QixXQUFPO0FBQUEsRUFDVDtBQUNBLFFBQU0sZ0JBQWdCLGFBQWE7QUFBQSxJQUNqQyxhQUFhLFlBQVksR0FBRyxJQUFJO0FBQUEsRUFDbEM7QUFDQSxNQUFJLGtCQUFrQixRQUFRLGtCQUFrQixNQUFNO0FBQ3BELFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxPQUFPLGFBQWEsY0FBYyxFQUFFLFVBQVUsUUFB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
