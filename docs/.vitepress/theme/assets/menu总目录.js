export default [
  {
    name: "开始吧~~",
    icon: "flight_takeoff",
    path: "start",
    children: [
      {
        name: "选择 Quasar 开发模式",
        path: "pick-quasar-flavour"
      },
      {
        name: "Quasar 开发模式",
        opened: true,
        children: [
          {
            name: "Quasar CLI",
            path: "quasar-cli"
          },
          {
            name: "UMD / Standalone",
            path: "umd"
          },
          {
            name: "Vite 插件",
            path: "vite-plugin"
          },
          {
            name: "Vue CLI 插件",
            path: "vue-cli-plugin"
          }
        ]
      },
      {
        name: "如何使用 Vue",
        path: "how-to-use-vue"
      },
      {
        name: "在线体验",
        path: "playground"
      }
    ]
  },
];
