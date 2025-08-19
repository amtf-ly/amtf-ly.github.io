// docs-code/.vitepress/config.js
import { createRequire } from "module";
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

// docs-code/.vitepress/config.js
import { fileURLToPath, URL } from "node:url";
import { quasar, transformAssetUrls } from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/@quasar+vite-plugin@1.6.0_@vitejs+plugin-vue@4.6.2_vite@5.2.3_less@4.2.2_sass@1.70.0__vue@3.4_ja6jko6oiwl7o5tddw34jme3we/node_modules/@quasar/vite-plugin/src/index.js";
import vue from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.2.3_less@4.2.2_sass@1.70.0__vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0_vue@3.4.21__rollup@4.13.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.26.10_rollup@4.13.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/unplugin-vue-components@0.26.0_@babel+parser@7.26.10_rollup@4.13.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import vueJsx from "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/node_modules/.pnpm/@vitejs+plugin-vue-jsx@1.3.10/node_modules/@vitejs/plugin-vue-jsx/index.js";
var __vite_injected_original_import_meta_url = "file:///D:/amtf-code/amtf-laoyu-vitepress-quasar/docs-code/.vitepress/config.js";
var require2 = createRequire(__vite_injected_original_import_meta_url);
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
      message: "\u5927\u809A\u80FD\u5BB9\uFF0C\u7B11\u53E3\u5E38\u5F00 <br>\u5230\u5E95\u4E86~~"
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
      text: "\u8001\u9C7C\u5F00\u6E90\u5E73\u4EF7",
      activeMatch: "/\u8001\u9C7C\u5F00\u6E90\u5E73\u4EF7/",
      link: "/\u8001\u9C7C\u5F00\u6E90\u5E73\u4EF7/01.\u684C\u7403\u8BB0\u8D26"
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
      text: "a-table",
      link: "/a-table/01icon/",
      activeMatch: "/a-table/"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy1jb2RlLy52aXRlcHJlc3MvY29uZmlnLmpzIiwgImFtdGYvdml0ZXByZXNzL1x1NjIxMFx1NEZBN1x1NjgwRlx1NzZFRVx1NUY1NS5qcyIsICJhbXRmL3ZpdGVwcmVzcy91dGlscy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXGFtdGYtY29kZVxcXFxhbXRmLWxhb3l1LXZpdGVwcmVzcy1xdWFzYXJcXFxcZG9jcy1jb2RlXFxcXC52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGFtdGYtY29kZVxcXFxhbXRmLWxhb3l1LXZpdGVwcmVzcy1xdWFzYXJcXFxcZG9jcy1jb2RlXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9hbXRmLWNvZGUvYW10Zi1sYW95dS12aXRlcHJlc3MtcXVhc2FyL2RvY3MtY29kZS8udml0ZXByZXNzL2NvbmZpZy5qc1wiO2ltcG9ydCB7IGNyZWF0ZVJlcXVpcmUgfSBmcm9tIFwibW9kdWxlXCJcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiXHJcbi8vIGltcG9ydCBBdXRvU2lkZWJhciBmcm9tIFwiYW10Zi12aXRlcHJlc3MtYXV0by1zaWRlYmFyXCJcclxuaW1wb3J0IFx1NjIxMFx1NEZBN1x1NjgwRlx1NzZFRVx1NUY1NSBmcm9tIFwiLi4vLi4vYW10Zi92aXRlcHJlc3MvXHU2MjEwXHU0RkE3XHU2ODBGXHU3NkVFXHU1RjU1XCJcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCJcclxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiXHJcblxyXG5pbXBvcnQgeyBxdWFzYXIsIHRyYW5zZm9ybUFzc2V0VXJscyB9IGZyb20gXCJAcXVhc2FyL3ZpdGUtcGx1Z2luXCJcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcclxuXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCJcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIlxyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVyc1wiXHJcblxyXG4vLyBpbXBvcnQgRWxlbWVudFBsdXMgZnJvbSAndW5wbHVnaW4tZWxlbWVudC1wbHVzL3ZpdGUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIlxyXG5cclxuY29uc3QgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIGlnbm9yZURlYWRMaW5rczogdHJ1ZSxcclxuICAgIHRpdGxlOiBcImFtdGZ+flwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiYW10Zn5+XCIsXHJcbiAgICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxuICAgIGNsZWFuVXJsczogdHJ1ZSxcclxuICAgIGxhbmc6IFwiemhcIixcclxuICAgIG1hcmtkb3duOiB7XHJcbiAgICAgICAgbWF0aDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB2dWU6IHtcclxuICAgICAgICB0ZW1wbGF0ZTogeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSxcclxuICAgIH0sXHJcbiAgICBiYXNlOiBcIi9cIixcclxuICAgIHZpdGU6IHtcclxuICAgICAgICBzZXJ2ZXI6IHtcclxuICAgICAgICAgICAgLy8gb3BlbjogdHJ1ZSwgLy9cdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjhcclxuICAgICAgICAgICAgcG9ydDogNTE4OCxcclxuICAgICAgICAgICAgcHJveHk6IHtcclxuICAgICAgICAgICAgICAgIFwiL2FwaVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8veWlndXhpYW55dW4uZ2l0ZWUuaW8vYW10Zi1zalwiLCAvL1x1NzZFRVx1NjgwN1x1N0Y1MVx1N0FEOSxcdTY3MERcdTUyQTFcdTdBRUZcdTU3MzBcdTU3NDBcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV3cml0ZShwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICAvLyBFbGVtZW50UGx1cygpXHJcbiAgICAgICAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICAgICAgICAvL2Rldlx1NzY4NFx1NjVGNlx1NTAxOVx1NTNFRlx1NEVFNVx1NzUyOFx1RkYwQyBidWlsZFx1NzY4NFx1NjVGNlx1NTAxOVx1NEYxQVx1NjJBNVx1OTUxOVx1MjAyNlx1MjAyNlxyXG4gICAgICAgICAgICAvLyBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgICAgLy8gICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgICAgIC8vIH0pLFxyXG4gICAgICAgICAgICAvLyBDb21wb25lbnRzKHtcclxuICAgICAgICAgICAgLy8gICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgICAgIC8vIH0pLFxyXG5cclxuICAgICAgICAgICAgLy8gYWRkIHBsdWdpbiBjb2xsYXBzZWQ6IHRydWVcdTYyOThcdTUzRTBcdTc2RUVcdTVGNTVcclxuICAgICAgICAgICAgLy8gQXV0b1NpZGViYXIoeyBwcmVmaXg6IFwiLlwiLCBjb2xsYXBzZWQ6IHRydWUsIFx1NUZGRFx1NzU2NVx1NTQwRVx1N0YwMFx1NTQwRDogW1wiLnZ1ZVwiLCBcIi5qc1wiXSB9KSxcclxuICAgICAgICAgICAgXHU2MjEwXHU0RkE3XHU2ODBGXHU3NkVFXHU1RjU1KHtcclxuICAgICAgICAgICAgICAgIHBhdGg6IFwiL2RvY3MtY29kZVwiLFxyXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgXHU1RkZEXHU3NTY1XHU1NDBFXHU3RjAwXHU1NDBEOiBbXCIudnVlXCIsIFwiLmpzXCJdLFxyXG4gICAgICAgICAgICAgICAgaWdub3JlSW5kZXhJdGVtOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgaWdub3JlTGlzdDogW1wiaW1hZ2VzXCIsIFwiaW1nXCIsIFwiemhcIiwgXCJzbmlwcGV0c1wiLCBcInB1YmxpY1wiXSxcclxuICAgICAgICAgICAgICAgIC8vIGlnbm9yZUxpc3Q6IFtcImltYWdlc1wiLCBcInpoXCIsIFwic25pcHBldHNcIiwgXCJwdWJsaWNcIiwgLCBcIkVSUE5leHRcdTUxNjVcdTU3NTFcdTdCMTRcdThCQjBcIiwgXCJzdVwiXSxcclxuICAgICAgICAgICAgICAgIC8vIGlnbm9yZUxpc3Q6IFtcImltYWdlc1wiLCBcInpoXCIsIFwic25pcHBldHNcIiwgXCJwdWJsaWNcIiwgXCJcdTU5MUFcdTUxNDNcdTY1ODdcdTUzMTZcIiwgXCJFUlBOZXh0XHU1MTY1XHU1NzUxXHU3QjE0XHU4QkIwXCIsIFwic3VcIl0sXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAvLyB2dWUoe1xyXG4gICAgICAgICAgICAvLyAgICAgdGVtcGxhdGU6IHsgdHJhbnNmb3JtQXNzZXRVcmxzIH1cclxuICAgICAgICAgICAgLy8gICB9KSxcclxuICAgICAgICAgICAgLy8gXHU4RkQ5XHU5MUNDXHU3NTI4cXVhc2FyIGJ1aWxkXHU3Njg0XHU2NUY2XHU1MDE5XHU0RjFBXHU2MkE1XHU5NTE5XHJcbiAgICAgICAgICAgIC8vIHF1YXNhcih7XHJcbiAgICAgICAgICAgIC8vICAgICBzYXNzVmFyaWFibGVzOiAnLi90aGVtZS9jc3MvcXVhc2FyLnZhcmlhYmxlcy5zY3NzJ1xyXG4gICAgICAgICAgICAvLyAgIH0pXHJcbiAgICAgICAgXSxcclxuICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi4vLi4vXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICAgICAgXCJAdGhlXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vdGhlbWUvXCIsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBhbGlhczogW1xyXG4gICAgICAgICAgICAvLyAgICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgIGZpbmQ6IFwiQHRoZVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vdGhlbWUvXCIpLFxyXG4gICAgICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBmaW5kOiBcIkBcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi9cIiksXHJcbiAgICAgICAgICAgIC8vICAgICB9LFxyXG4gICAgICAgICAgICAvLyBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3NzOiB7XHJcbiAgICAgICAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKiBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVcdTUxNjhcdTVDNDBzY3NzXHU2NTg3XHU0RUY2ICovXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiQHRoZS9jc3MvcXVhc2FyLnZhcmlhYmxlcy5zY3NzXCI7JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIHNpdGVtYXA6IHtcclxuICAgIC8vICAgaG9zdG5hbWU6ICdodHRwczovL3ZpdGVwcmVzcy5kZXYnLFxyXG4gICAgLy8gICB0cmFuc2Zvcm1JdGVtcyhpdGVtcykge1xyXG4gICAgLy8gICAgIHJldHVybiBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+ICFpdGVtLnVybC5pbmNsdWRlcygnbWlncmF0aW9uJykpXHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sXHJcblxyXG4gICAgLyogcHJldHRpZXItaWdub3JlICovXHJcbiAgICBoZWFkOiBbXHJcbiAgICAgICAgWydtZXRhJywgeyBuYW1lOiAndmlld3BvcnQnLCBjb250ZW50OiAndXNlci1zY2FsYWJsZT1ubyxpbml0aWFsLXNjYWxlPTEsbWF4aW11bS1zY2FsZT0xLG1pbmltdW0tc2NhbGU9MSx3aWR0aD1kZXZpY2Utd2lkdGgnIH1dLFxyXG5cclxuICAgICAgICAvL1x1NUMwNiBmYXZpY29uLmljbyBcdTY1M0VcdTU3MjhcdTUxNkNcdTUxNzFcdTc2RUVcdTVGNTVcdTRFMkRcdUZGMENcdTU5ODJcdTY3OUNcdThCQkVcdTdGNkVcdTRFODYgYmFzZShcdTkwRThcdTdGNzJcdTU3MjhcdTdGNTFcdTdBRDlcdTVCNTBcdThERUZcdTVGODRcdTY1RjYpXHVGRjBDXHU1MjE5XHU0RjdGXHU3NTI4IC9iYXNlL2Zhdmljb24uaWNvXHJcbiAgICAgICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgaHJlZjogJy9mYXZpY29uLmljbycgfV0sXHJcbiAgICAgICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgdHlwZTogJ3RleHQvcGxhaW4nLCBocmVmOiAnL2Zhdmljb24uaWNvJyB9XSxcclxuICAgICAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2UvcG5nJywgc2l6ZXM6IFwiMTI4eDEyOFwiLCBocmVmOiAnL2ljb25zL2FtdGYtbWwxMjgucG5nJyB9XSxcclxuICAgICAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2UvcG5nJywgc2l6ZXM6IFwiOTZ4OTZcIiwgaHJlZjogJy9pY29ucy9hbXRmLW1sOTYucG5nJyB9XSxcclxuICAgICAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2UvcG5nJywgc2l6ZXM6IFwiMzJ4MzJcIiwgaHJlZjogJy9pY29ucy9hbXRmLW1sMzIucG5nJyB9XSxcclxuICAgICAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCB0eXBlOiAnaW1hZ2UvcG5nJywgc2l6ZXM6IFwiMTZ4MTZcIiwgaHJlZjogJy9pY29ucy9hbXRmLW0xNi5wbmcnIH1dLFxyXG4gICAgICAgIFsnbGluaycsIHsgcmVsOiAnaWNvbicsIHR5cGU6ICdpbWFnZS9pY28nLCBzaXplczogXCIxNngxNlwiLCBocmVmOiAnL2FtdGYuaWNvJyB9XSxcclxuICAgICAgICBbJ21ldGEnLCB7IG5hbWU6ICd0aGVtZS1jb2xvcicsIGNvbnRlbnQ6ICcjNWY2N2VlJyB9XSxcclxuICAgICAgICBbJ21ldGEnLCB7IG5hbWU6ICdvZzp0eXBlJywgY29udGVudDogJ3dlYnNpdGUnIH1dLFxyXG4gICAgICAgIFsnbWV0YScsIHsgbmFtZTogJ29nOmxvY2FsZScsIGNvbnRlbnQ6ICdlbicgfV0sXHJcbiAgICAgICAgWydtZXRhJywgeyBuYW1lOiAnb2c6c2l0ZV9uYW1lJywgY29udGVudDogJ2FtdGYnIH1dLFxyXG4gICAgICAgIFsnbWV0YScsIHsgbmFtZTogJ29nOmltYWdlJywgY29udGVudDogJy9pY29ucy9hbXRmLW1sMTI4LnBuZycgfV0sXHJcbiAgICAgICAgWydzY3JpcHQnLCB7IHNyYzogJ2h0dHBzOi8vY2RuLnVzZWZhdGhvbS5jb20vc2NyaXB0LmpzJywgJ2RhdGEtc2l0ZSc6ICdBWkJSU0ZHRycsICdkYXRhLXNwYSc6ICdhdXRvJywgZGVmZXI6ICcnIH1dXHJcbiAgICBdLFxyXG4gICAgdGhlbWVDb25maWc6IHtcclxuICAgICAgICAvLyBzaXRlVGl0bGU6ICdcdUQ4M0RcdURFMDQnLFxyXG4gICAgICAgIHNpdGVUaXRsZTogXCJcIixcclxuICAgICAgICAvLyBzaXRlVGl0bGU6IFwiXHVEODNEXHVEQ0REZXJwbmV4dCZmcmFwcGVcdTVCNjZcdTRFNjBcdTdCMTRcdThCQjBcIixcclxuICAgICAgICBsb2dvOiB7IHNyYzogXCIvaWNvbnMvYW10Zi1tbDEyOC5wbmdcIiB9LFxyXG4gICAgICAgIG91dGxpbmU6IFwiZGVlcFwiLFxyXG4gICAgICAgIG5hdjogbmF2KCksXHJcbiAgICAgICAgc2lkZWJhcjoge1xyXG4gICAgICAgICAgICAvLyBcIi9FUlBOZXh0L1wiOiB7IGJhc2U6IFwiL0VSUE5leHQvXCIsIGl0ZW1zOiBlcnBuZXh0XHU3NkVFXHU1RjU1KCkgfSxcclxuICAgICAgICAgICAgLy8gXCIvemgvZ3VpZGUvXCI6IHsgYmFzZTogXCIvemgvZ3VpZGUvXCIsIGl0ZW1zOiBzaWRlYmFyR3VpZGUoKSB9LFxyXG4gICAgICAgICAgICAvLyBcIi96aC9yZWZlcmVuY2UvXCI6IHsgYmFzZTogXCIvemgvcmVmZXJlbmNlL1wiLCBpdGVtczogc2lkZWJhclJlZmVyZW5jZSgpIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZWRpdExpbms6IHtcclxuICAgICAgICAgICAgcGF0dGVybjogXCJodHRwczovL2dpdGh1Yi5jb20vYW10Zi1seS9lZGl0L21hc3Rlci9kb2NzLWNvZGUvOnBhdGhcIixcclxuICAgICAgICAgICAgdGV4dDogXCJcdTUzQkJcdTY1MzlcdTZCNjNcIixcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBzb2NpYWxMaW5rczogW1xyXG4gICAgICAgIC8vICAgeyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92dWVqcy92aXRlcHJlc3MnIH1cclxuICAgICAgICAvLyBdLFxyXG4gICAgICAgIG91dGxpbmVUaXRsZTogXCJcdTY3MkNcdTk4NzVcdTc2RUVcdTVGNTVcIixcclxuICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJcdTU5MjdcdTgwOUFcdTgwRkRcdTVCQjlcdUZGMENcdTdCMTFcdTUzRTNcdTVFMzhcdTVGMDAgPGJyPlx1NTIzMFx1NUU5NVx1NEU4Nn5+XCIsXHJcbiAgICAgICAgICAgIC8vIGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAxOS1wcmVzZW50IEV2YW4gWW91J1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlYXJjaDoge1xyXG4gICAgICAgICAgICBwcm92aWRlcjogXCJsb2NhbFwiLFxyXG4gICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvblRleHQ6IFwiXHU2NDFDXHU3RDIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uQXJpYUxhYmVsOiBcIlx1NjQxQ1x1N0QyMlx1NjMwOVx1OTRBRVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURldGFpbHM6IFwiXHU2NjNFXHU3OTNBXHU4QkU2XHU2MEM1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRCdXR0b25UaXRsZTogXCJcdTZFMDVcdTdBN0FcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrQnV0dG9uVGl0bGU6IFwiXHU4RkQ0XHU1NkRFXHU2NDFDXHU3RDIyXHU3RUQzXHU2NzlDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogXCJcdTZDQTFcdTY3MDlcdTYyN0VcdTUyMzBcdTdFRDNcdTY3OUNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0VGV4dDogXCJcdTkwMDlcdTYyRTlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0S2V5QXJpYUxhYmVsOiBcIlx1NTZERVx1OEY2Nlx1OTUyRVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6IFwiXHU1MjA3XHU2MzYyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlVXBLZXlBcmlhTGFiZWw6IFwiXHU0RTBBXHU2NUI5XHU1NDExXHU5NTJFXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRlRG93bktleUFyaWFMYWJlbDogXCJcdTRFMEJcdTY1QjlcdTU0MTFcdTk1MkVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiBcIlx1NTE3M1x1OTVFRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZUtleUFyaWFMYWJlbDogXCJFU0NcdTk1MkVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxufSlcclxuXHJcbmZ1bmN0aW9uIG5hdigpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlx1ODAwMVx1OUM3Q1x1NUYwMFx1NkU5MFx1NUU3M1x1NEVGN1wiLFxyXG4gICAgICAgICAgICBhY3RpdmVNYXRjaDogXCIvXHU4MDAxXHU5QzdDXHU1RjAwXHU2RTkwXHU1RTczXHU0RUY3L1wiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9cdTgwMDFcdTlDN0NcdTVGMDBcdTZFOTBcdTVFNzNcdTRFRjcvMDEuXHU2ODRDXHU3NDAzXHU4QkIwXHU4RDI2XCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiU2tldGNoVXBcIixcclxuICAgICAgICAgICAgYWN0aXZlTWF0Y2g6IFwiL3N1L1wiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9zdS8wMS5cdTRFQ0JcdTdFQ0RcIixcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogXCJFUlBOZXh0XCIsXHJcbiAgICAgICAgICAgIGFjdGl2ZU1hdGNoOiBcIi9FUlBOZXh0XHU1MTY1XHU1NzUxXHU3QjE0XHU4QkIwL1wiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9FUlBOZXh0XHU1MTY1XHU1NzUxXHU3QjE0XHU4QkIwLzAxLlx1NEVDQlx1N0VDRFwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiBcIlx1NTkxQVx1NTE0M1x1NjU4N1x1NTMxNlwiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9cdTU5MUFcdTUxNDNcdTY1ODdcdTUzMTYvXHU1M0VFXHU1M0VFXHU1RjUzXHU1RjUzXCIsXHJcbiAgICAgICAgICAgIGFjdGl2ZU1hdGNoOiBcIi9cdTU5MUFcdTUxNDNcdTY1ODdcdTUzMTYvXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiYS10YWJsZVwiLFxyXG4gICAgICAgICAgICBsaW5rOiBcIi9hLXRhYmxlLzAxaWNvbi9cIixcclxuICAgICAgICAgICAgYWN0aXZlTWF0Y2g6IFwiL2EtdGFibGUvXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6IFwiXHU1MTc2XHU0RUQ2XCIsXHJcbiAgICAgICAgICAgIGxpbms6IFwiL1x1NTE3Nlx1NEVENi9xdWFzYXIvaWNvblwiLFxyXG4gICAgICAgICAgICBhY3RpdmVNYXRjaDogXCIvXHU1MTc2XHU0RUQ2L1wiLFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgXVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcYW10Zi1jb2RlXFxcXGFtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhclxcXFxhbXRmXFxcXHZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYW10Zi1jb2RlXFxcXGFtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhclxcXFxhbXRmXFxcXHZpdGVwcmVzc1xcXFxcdTYyMTBcdTRGQTdcdTY4MEZcdTc2RUVcdTVGNTUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2FtdGYtY29kZS9hbXRmLWxhb3l1LXZpdGVwcmVzcy1xdWFzYXIvYW10Zi92aXRlcHJlc3MvJUU2JTg4JTkwJUU0JUJFJUE3JUU2JUEwJThGJUU3JTlCJUFFJUU1JUJEJTk1LmpzXCI7aW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCJcclxuaW1wb3J0IHsgcmVhZGRpclN5bmMsIHN0YXRTeW5jIH0gZnJvbSBcImZzXCJcclxuaW1wb3J0IHsgREVGQVVMVF9JR05PUkVfRk9MREVSLCBsb2csIHJlbW92ZVByZWZpeCwgZ2V0VGl0bGVGcm9tRmlsZSB9IGZyb20gXCIuL3V0aWxzXCJcclxuXHJcbmxldCBvcHRpb25cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVNpZGVCYXJJdGVtcyh0YXJnZXRQYXRoLCAuLi5cdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgICBpZ25vcmVJbmRleEl0ZW0sXHJcbiAgICAgICAgZGVsZXRlUHJlZml4LFxyXG4gICAgICAgIGNvbGxhcHNlZCA9IGZhbHNlLFxyXG4gICAgICAgIHNpZGVCYXJJdGVtc1Jlc29sdmVkLFxyXG4gICAgICAgIGJlZm9yZUNyZWF0ZVNpZGVCYXJJdGVtcyxcclxuICAgICAgICBpZ25vcmVMaXN0ID0gW10sXHJcbiAgICAgICAgXHU1RkZEXHU3NTY1XHU1NDBFXHU3RjAwXHU1NDBEID0gW10sXHJcbiAgICAgICAgdGl0bGVGcm9tRmlsZSA9IGZhbHNlLFxyXG4gICAgfSA9IG9wdGlvblxyXG4gICAgLy8gY29uc29sZS5sb2coYFx1NjU4N1x1NEVGNlx1NTkzOVx1N0VDNCBcdUQ4M0RcdURDNDlgLCBcdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQpXHJcbiAgICAvLyBjb25zb2xlLmxvZyhgLi4uXHU2NTg3XHU0RUY2XHU1OTM5XHU3RUM0IFx1RDgzRFx1REM0OWAsIC4uLlx1NjU4N1x1NEVGNlx1NTkzOVx1N0VDNClcclxuICAgIGNvbnN0IHJhd05vZGUgPSByZWFkZGlyU3luYyhqb2luKHRhcmdldFBhdGgsIC4uLlx1NjU4N1x1NEVGNlx1NTkzOVx1N0VDNCkpXHJcbiAgICBsZXQgbm9kZSA9IGJlZm9yZUNyZWF0ZVNpZGVCYXJJdGVtcz8uKHJhd05vZGUpID8/IHJhd05vZGVcclxuICAgIG5vZGUgPSBub2RlLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhaXRlbS5pbmNsdWRlcyhcImNvbXBvbmVudHNcIilcclxuICAgIH0pXHJcbiAgICAvLyBjb25zb2xlLmxvZyhgbm9kZSBcdUQ4M0RcdURDNDlgLCBub2RlKVxyXG4gICAgY29uc3QgY3VycmVudERpciA9IGpvaW4odGFyZ2V0UGF0aCwgLi4uXHU2NTg3XHU0RUY2XHU1OTM5XHU3RUM0KVxyXG4gICAgLy8gY29uc29sZS5sb2coYGN1cnJlbnREaXIgXHVEODNEXHVEQzQ5YCwgY3VycmVudERpcilcclxuICAgIGlmIChpZ25vcmVJbmRleEl0ZW0gJiYgbm9kZS5sZW5ndGggPT09IDEgJiYgbm9kZVswXSA9PT0gXCJpbmRleC5tZFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXN1bHQgPSBbXVxyXG4gICAgZm9yIChjb25zdCBmbmFtZSBvZiBub2RlKSB7XHJcbiAgICAgICAgaWYgKHN0YXRTeW5jKGpvaW4odGFyZ2V0UGF0aCwgLi4uXHU2NTg3XHU0RUY2XHU1OTM5XHU3RUM0LCBmbmFtZSkpLmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgICAgICAgaWYgKGlnbm9yZUxpc3QuaW5jbHVkZXMoZm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGlzIGRpcmVjdG9yeVxyXG4gICAgICAgICAgICAvLyBpZ25vcmUgY3VyIG5vZGUgaWYgaXRlbXMgbGVuZ3RoIGlzIDBcclxuICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBjcmVhdGVTaWRlQmFySXRlbXMoam9pbih0YXJnZXRQYXRoKSwgLi4uXHU2NTg3XHU0RUY2XHU1OTM5XHU3RUM0LCBmbmFtZSlcclxuICAgICAgICAgICAgLy8gcmVwbGFjZSBkaXJlY3RvcnkgbmFtZSwgaWYgeWVzXHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZm5hbWVcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSB0aXRsZSBpbiBpbmRleC5tZCBmaWxlXHJcbiAgICAgICAgICAgIGlmICh0aXRsZUZyb21GaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZXMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgam9pbihjdXJyZW50RGlyLCBmbmFtZSwgXCJpbmRleC5tZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBqb2luKGN1cnJlbnREaXIsIGZuYW1lLCBcImluZGV4Lk1EXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGpvaW4oY3VycmVudERpciwgZm5hbWUsIGZuYW1lICsgXCIubWRcIiksXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGZpbGVuYW1lIG9mIGZpbGVuYW1lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZ2V0VGl0bGVGcm9tRmlsZShmaWxlbmFtZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZWxldGVQcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgIHRleHQgPSByZW1vdmVQcmVmaXgodGV4dCwgZGVsZXRlUHJlZml4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzaWRlYmFySXRlbSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gdml0ZVByZXNzIHNpZGViYXIgb3B0aW9uIGNvbGxhcHNlZFxyXG4gICAgICAgICAgICAgICAgc2lkZWJhckl0ZW0uY29sbGFwc2VkID0gY29sbGFwc2VkXHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChzaWRlYmFySXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBcdTU5ODJcdTY3OUNcdTVCNTBcdTY1ODdcdTRFRjZcdTRFMkRcdTUzRUFcdTY3MDlcdTRFMDBcdTRFMkEgaW5kZXgubWQgXHU1QjUwXHU2NTg3XHU0RUY2XHVEODNEXHVEQzQ3XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2lkZWJhckl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBsaW5rOiBcIi9cIiArIFsuLi5cdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQsIGAke3RleHR9YF0uam9pbihcIi9cIikgKyBcIi9cIixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHZpdGVQcmVzcyBzaWRlYmFyIG9wdGlvbiBjb2xsYXBzZWRcclxuICAgICAgICAgICAgICAgIHNpZGViYXJJdGVtLmNvbGxhcHNlZCA9IGNvbGxhcHNlZFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goc2lkZWJhckl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgXHU2NjJGXHU2NTg3XHU0RUY2IGluZ1x1RDgzRFx1REM0N2ApXHJcbiAgICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgICAgIChpZ25vcmVJbmRleEl0ZW0gJiYgZm5hbWUgPT09IFwiaW5kZXgubWRcIikgfHxcclxuICAgICAgICAgICAgICAgIC8vIFx1NEVFNVx1OEZERVx1NUI1N1x1N0IyNlx1NUYwMFx1NTkzNFx1RkYwQ1x1NTQwRVx1OTc2Mlx1OERERlx1Nzc0MFx1NEVGQlx1NjEwRlx1NUI1N1x1N0IyNlx1RkYwQ1x1NzEzNlx1NTQwRVx1NEVFNS5tZFx1NjIxNi5NRFx1N0VEM1x1NUMzRVxyXG4gICAgICAgICAgICAgICAgL14tLipcXC4obWR8TUQpJC8udGVzdChmbmFtZSlcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBcdTY2MkZcdTVGRkRcdTc1NjVcdTY1ODdcdTRFRjYgPSBmYWxzZVxyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGUgb2YgXHU1RkZEXHU3NTY1XHU1NDBFXHU3RjAwXHU1NDBEKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYXR0ZXJuID0gbmV3IFJlZ0V4cChgJHtlfSRgLCBcImlcIilcclxuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuLnRlc3QoZm5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXHU2NjJGXHU1RkZEXHU3NTY1XHU2NTg3XHU0RUY2ID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFx1NjYyRlx1NUZGRFx1NzU2NVx1NjU4N1x1NEVGNikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBmbmFtZS5yZXBsYWNlKC9cXC5tZCQvLCBcIlwiKVxyXG4gICAgICAgICAgICBsZXQgdGV4dCA9IGZpbGVOYW1lXHJcbiAgICAgICAgICAgIGlmIChkZWxldGVQcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgIHRleHQgPSByZW1vdmVQcmVmaXgodGV4dCwgZGVsZXRlUHJlZml4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJlYWxGaWxlTmFtZSA9IGpvaW4oY3VycmVudERpciwgZm5hbWUpXHJcbiAgICAgICAgICAgIGlmICh0aXRsZUZyb21GaWxlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IGdldFRpdGxlRnJvbUZpbGUocmVhbEZpbGVOYW1lKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRpdGxlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHRleHQsXHJcbiAgICAgICAgICAgICAgICAvLyBsaW5rOiBcIi9cIiArIFsuLi5cdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQsIGAke2ZpbGVOYW1lfS5odG1sYF0uam9pbihcIi9cIiksXHJcbiAgICAgICAgICAgICAgICBsaW5rOiBcIi9cIiArIFsuLi5cdTY1ODdcdTRFRjZcdTU5MzlcdTdFQzQsIGAke2ZpbGVOYW1lfWBdLmpvaW4oXCIvXCIpLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpdGVtIDo+PiAnLCBpdGVtKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coJ3Jlc3VsdCA6Pj4gJywgcmVzdWx0KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdzaWRlQmFySXRlbXNSZXNvbHZlZD8uKHJlc3VsdCkgOj4+ICcsIHNpZGVCYXJJdGVtc1Jlc29sdmVkPy4ocmVzdWx0KSk7XHJcbiAgICByZXR1cm4gc2lkZUJhckl0ZW1zUmVzb2x2ZWQ/LihyZXN1bHQpID8/IHJlc3VsdFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTaWRlQmFyR3JvdXBzKHRhcmdldFBhdGgsIGZvbGRlcikge1xyXG4gICAgLy8gY29uc29sZS5sb2coYGZvbGRlciBcdUQ4M0RcdURDNDlgLGZvbGRlcilcclxuICAgIGxldCBpdGVtcyA9IGNyZWF0ZVNpZGVCYXJJdGVtcyh0YXJnZXRQYXRoLCBmb2xkZXIpXHJcbiAgICBjb25zb2xlLmxvZyhgY3JlYXRlU2lkZUJhckdyb3VwcyBpdGVtcyBcdUQ4M0RcdURDNDlgLCBpdGVtcylcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaXRlbXNcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm4gW1xyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgaXRlbXM6IGNyZWF0ZVNpZGVCYXJJdGVtcyh0YXJnZXRQYXRoLCBmb2xkZXIpLFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyBdXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVNpZGViYXJNdWx0aShwYXRoKSB7XHJcbiAgICBjb25zdCB7IGlnbm9yZUxpc3QgPSBbXSwgaWdub3JlSW5kZXhJdGVtID0gZmFsc2UsIHNpZGVCYXJSZXNvbHZlZCB9ID0gb3B0aW9uXHJcbiAgICBjb25zdCBpbCA9IFsuLi5ERUZBVUxUX0lHTk9SRV9GT0xERVIsIC4uLmlnbm9yZUxpc3RdXHJcbiAgICBjb25zdCBkYXRhID0ge31cclxuICAgIGNvbnN0IG5vZGUgPSByZWFkZGlyU3luYyhwYXRoKS5maWx0ZXIobiA9PiBzdGF0U3luYyhqb2luKHBhdGgsIG4pKS5pc0RpcmVjdG9yeSgpICYmICFpbC5pbmNsdWRlcyhuKSlcclxuXHJcbiAgICBmb3IgKGNvbnN0IGsgb2Ygbm9kZSkge1xyXG4gICAgICAgIGRhdGFbYC8ke2t9L2BdID0gY3JlYXRlU2lkZUJhckdyb3VwcyhwYXRoLCBrKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKFwiZGF0YSA6Pj4gXCIsIGRhdGEpXHJcblxyXG4gICAgLy8gaXMgaWdub3JlZCBvbmx5IGluZGV4Lm1kXHJcbiAgICAvLyBpZiAoaWdub3JlSW5kZXhJdGVtKSB7XHJcbiAgICAvLyAgICAgZm9yIChjb25zdCBpIGluIGRhdGEpIHtcclxuICAgIC8vICAgICAgICAgbGV0IG9iaiA9IGRhdGFbaV1cclxuICAgIC8vICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgb2JqID0gb2JqLmZpbHRlcihpID0+IGkuaXRlbXMgIT0gbnVsbCAmJiBpLml0ZW1zLmxlbmd0aCA+IDApXHJcbiAgICAvLyAgICAgICAgICAgICBpZiAob2JqLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIFJlZmxlY3QuZGVsZXRlUHJvcGVydHkoZGF0YSwgaSlcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImRhdGEgOj4+IFwiLCBkYXRhKVxyXG4gICAgcmV0dXJuIHNpZGVCYXJSZXNvbHZlZD8uKGRhdGEpID8/IGRhdGFcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gXHU2MjEwXHU0RkE3XHU2ODBGXHU3NkVFXHU1RjU1KG9wdCA9IHt9KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6IFwiYW10Zi12aXRlcHJlc3MtYXV0by1zaWRlYmFyXCIsXHJcbiAgICAgICAgY29uZmlndXJlU2VydmVyKHsgd2F0Y2hlciwgcmVzdGFydCB9KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZzV2F0Y2hlciA9IHdhdGNoZXIuYWRkKFwiKi5tZFwiKVxyXG4gICAgICAgICAgICBmc1dhdGNoZXIub24oXCJhbGxcIiwgYXN5bmMgKGV2ZW50LCBwYXRoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgIT09IFwiY2hhbmdlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2coYCR7ZXZlbnR9ICR7cGF0aH1gKVxyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlc3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coXCJ1cGRhdGUgc2lkZWJhci4uLlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coYCR7ZXZlbnR9ICR7cGF0aH1gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2coXCJ1cGRhdGUgc2lkZWJhciBmYWlsZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb25maWcoY29uZmlnKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbiA9IG9wdFxyXG4gICAgICAgICAgICAvLyBjb25zdCB7IHBhdGggPSBcIi9kb2NzLWNvZGVcIiB9ID0gb3B0aW9uXHJcbiAgICAgICAgICAgIGNvbnN0IHsgcGF0aCB9ID0gb3B0aW9uXHJcbiAgICAgICAgICAgIC8vIGluY3JlbWVudCBpZ25vcmUgaXRlbVxyXG4gICAgICAgICAgICBjb25zdCBkb2NzUGF0aCA9IGpvaW4ocHJvY2Vzcy5jd2QoKSwgcGF0aClcclxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBzaWRlYmFyIGRhdGEgYW5kIGluc2VydFxyXG4gICAgICAgICAgICAgICAgOyAoY29uZmlnKS52aXRlcHJlc3Muc2l0ZS50aGVtZUNvbmZpZy5zaWRlYmFyID0gY3JlYXRlU2lkZWJhck11bHRpKGRvY3NQYXRoKVxyXG4gICAgICAgICAgICBsb2coXCJpbmplY3RlZCBzaWRlYmFyIGRhdGEgc3VjY2Vzc2Z1bGx5XCIpXHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWdcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcYW10Zi1jb2RlXFxcXGFtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhclxcXFxhbXRmXFxcXHZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcYW10Zi1jb2RlXFxcXGFtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhclxcXFxhbXRmXFxcXHZpdGVwcmVzc1xcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovYW10Zi1jb2RlL2FtdGYtbGFveXUtdml0ZXByZXNzLXF1YXNhci9hbXRmL3ZpdGVwcmVzcy91dGlscy50c1wiOy8vIGltcG9ydCBjIGZyb20gJ3BpY29jb2xvcnMnO1xyXG5pbXBvcnQgeyBleGlzdHNTeW5jLCByZWFkRmlsZVN5bmMgfSBmcm9tICdmcyc7XHJcblxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9JR05PUkVfRk9MREVSID0gWydzY3JpcHRzJywgJ2NvbXBvbmVudHMnLCAnYXNzZXRzJywgJy52aXRlcHJlc3MnXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGxvZyAoLi4uaW5mbzogc3RyaW5nW10pOiB2b2lkIHtcclxuICAvLyBjb25zb2xlLmxvZyhjLmJvbGQoYy5jeWFuKCdbYXV0by1zaWRlYmFyXScpKSwgLi4uaW5mbyk7XHJcbiAgY29uc29sZS5sb2coJ1thdXRvLXNpZGViYXJdJywgLi4uaW5mbyk7XHJcbn1cclxuXHJcbi8vIHJlbW92ZSB0aGUgZmlsZSBwcmVmaXhcclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVByZWZpeCAoc3RyOiBzdHJpbmcsIGlkZW50aWZpZXI6IHN0cmluZyB8IFJlZ0V4cCk6IHN0cmluZyB7XHJcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGlkZW50aWZpZXIsICcnKTtcclxufVxyXG5cclxuLy8gXHU1QzFEXHU4QkQ1XHU0RUNFXHU0RTAwXHU0RTJBbWRcdTY1ODdcdTRFRjZcdTRFMkRcdThCRkJcdTUzRDZcdTY4MDdcdTk4OThcdUZGMENcdThCRkJcdTUzRDZcdTUyMzBcdTdCMkNcdTRFMDBcdTRFMkEgXHUyMDE4IyBcdTY4MDdcdTk4OThcdTUxODVcdTVCQjlcdTIwMTkgXHU3Njg0XHU2NUY2XHU1MDE5XHU4RkQ0XHU1NkRFXHU4RkQ5XHU0RTAwXHU4ODRDXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUaXRsZUZyb21GaWxlIChyZWFsRmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgaWYgKCFleGlzdHNTeW5jKHJlYWxGaWxlTmFtZSkpIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIGNvbnN0IGZpbGVFeHRlbnNpb24gPSByZWFsRmlsZU5hbWUuc3Vic3RyaW5nKFxyXG4gICAgcmVhbEZpbGVOYW1lLmxhc3RJbmRleE9mKCcuJykgKyAxXHJcbiAgKTtcclxuICBpZiAoZmlsZUV4dGVuc2lvbiAhPT0gJ21kJyAmJiBmaWxlRXh0ZW5zaW9uICE9PSAnTUQnKSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICAvLyByZWFkIGNvbnRlbnRzIG9mIHRoZSBmaWxlXHJcbiAgY29uc3QgZGF0YSA9IHJlYWRGaWxlU3luYyhyZWFsRmlsZU5hbWUsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSk7XHJcbiAgLy8gc3BsaXQgdGhlIGNvbnRlbnRzIGJ5IG5ldyBsaW5lXHJcbiAgY29uc3QgbGluZXMgPSBkYXRhLnNwbGl0KC9cXHI/XFxuLyk7XHJcbiAgLy8gcmV0dXJuIHRpdGxlXHJcbiAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XHJcbiAgICBpZiAobGluZS5zdGFydHNXaXRoKCcjICcpKSB7XHJcbiAgICAgIHJldHVybiBsaW5lLnN1YnN0cmluZygyKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlXLFNBQVMscUJBQXFCO0FBQ3ZZ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
