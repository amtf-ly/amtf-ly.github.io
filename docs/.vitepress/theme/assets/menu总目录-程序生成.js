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
  {
    一级分类: "其他",
    path: "其他",
    name: "其他",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/asset-handling",
    name: "asset-handling",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/cms",
    name: "cms",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "docker",
    icon: "flight_takeoff",
    children: [
      {
        name: "FuAdmin",
        path: "docker/FuAdmin"
      },
      {
        name: "超哥教docker笔记",
        path: "docker/超哥教docker笔记"
      },
      {
        name: "黑马程序员Docker快速入门到项目部署",
        path: "docker/黑马程序员Docker快速入门到项目部署"
      }
    ],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "erpnext",
    icon: "flight_takeoff",
    children: [
      {
        name: "00 摘要",
        path: "erpnext/00 摘要"
      },
      {
        name: "01 ERPNextv14安装",
        path: "erpnext/01 ERPNextv14安装"
      },
      {
        name: "01 使用VirtualBox安装Ubuntu20.04(server)系统",
        path: "erpnext/01 使用VirtualBox安装Ubuntu20.04(server)系统"
      },
      {
        name: "02 VSCode SSH远程连接虚拟机",
        path: "erpnext/02 VSCode SSH远程连接虚拟机"
      },
      {
        name: "03 教程",
        path: "erpnext/03 教程"
      },
      {
        name: "VMware Ubuntu 环境部署（服务器版）",
        path: "erpnext/VMware Ubuntu 环境部署（服务器版）"
      },
      {
        name: "余老师erpnext_oob_docker",
        path: "erpnext/余老师erpnext_oob_docker"
      },
      {
        name: "余老师推荐的练习",
        path: "erpnext/余老师推荐的练习"
      },
      {
        name: "其他",
        path: "erpnext/其他"
      }
    ],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "frappe",
    icon: "flight_takeoff",
    children: [
      {
        name: "02-frappe",
        path: "frappe/02-frappe"
      },
      {
        name: "99-其他命令",
        path: "frappe/99-其他命令"
      }
    ],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "frappe_docker",
    icon: "flight_takeoff",
    children: [
      {
        name: "00-开头",
        path: "frappe_docker/00-开头"
      },
      {
        name: "dockerfile解析-bench",
        path: "frappe_docker/dockerfile解析-bench"
      },
      {
        name: "dockerfile解析",
        path: "frappe_docker/dockerfile解析"
      },
      {
        name: "在VSCode Dev Containers中开发",
        path: "frappe_docker/在VSCode Dev Containers中开发"
      }
    ],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他/git",
    name: "git",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/gogocode",
    name: "gogocode",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/GreaterWMS",
    name: "GreaterWMS",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/index",
    name: "index",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "js",
    icon: "flight_takeoff",
    children: [],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他/Linux+shell",
    name: "Linux+shell",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/npm",
    name: "npm",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/powshell",
    name: "powshell",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "python",
    icon: "flight_takeoff",
    children: [
      {
        name: "00-pyenv安装换源",
        path: "python/00-pyenv安装换源"
      },
      {
        name: "01-python",
        path: "python/01-python"
      },
      {
        name: "02.0-Django",
        path: "python/02.0-Django"
      },
      {
        name: "02.1-Django 美多商城",
        path: "python/02.1-Django 美多商城"
      },
      {
        name: "02.1-Django 黑马博客教程",
        path: "python/02.1-Django 黑马博客教程"
      },
      {
        name: "99-废-Anaconda-还是用pyenv吧……",
        path: "python/99-废-Anaconda-还是用pyenv吧……"
      },
      {
        name: "Django Ninja",
        path: "python/Django Ninja"
      },
      {
        name: "Django-restframework",
        path: "python/Django-restframework"
      },
      {
        name: "fu-admin",
        path: "python/fu-admin"
      },
      {
        name: "枫枫知道",
        path: "python/枫枫知道"
      }
    ],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他/quasar",
    name: "quasar",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/vanblog",
    name: "vanblog",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他/vitepress+quasar",
    name: "vitepress+quasar",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "vscode",
    icon: "flight_takeoff",
    children: [
      {
        name: "剪贴板插件",
        path: "vscode/剪贴板插件"
      },
      {
        name: "粘贴图片到md",
        path: "vscode/粘贴图片到md"
      }
    ],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "vue",
    icon: "flight_takeoff",
    children: [
      {
        name: "quasar",
        path: "vue/quasar"
      },
      {
        name: "Vben Admin",
        path: "vue/Vben Admin"
      },
      {
        name: "vitepress",
        path: "vue/vitepress"
      },
      {
        name: "vue-pure-admin",
        path: "vue/vue-pure-admin"
      },
      {
        name: "vue等等",
        path: "vue/vue等等"
      }
    ],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他/windows",
    name: "windows",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "wsl+docker+Ubuntu",
    icon: "flight_takeoff",
    children: [
      {
        name: "00-wsl+docker配置",
        path: "wsl+docker+Ubuntu/00-wsl+docker配置"
      },
      {
        name: "00-wsl",
        path: "wsl+docker+Ubuntu/00-wsl"
      },
      {
        name: "vscode ssh到本地docker中",
        path: "wsl+docker+Ubuntu/vscode ssh到本地docker中"
      },
      {
        name: "vscode远程调试docker",
        path: "wsl+docker+Ubuntu/vscode远程调试docker"
      },
      {
        name: "WSL+docker迁移到非系统盘",
        path: "wsl+docker+Ubuntu/WSL+docker迁移到非系统盘"
      },
      {
        name: "WSL2 搭建 Windows 更好用的前端开发环境",
        path: "wsl+docker+Ubuntu/WSL2 搭建 Windows 更好用的前端开发环境"
      }
    ],
    opened: false
  },
  {
    一级分类: "其他",
    path: "其他/yarn",
    name: "yarn",
    icon: "flight_takeoff"
  },
  {
    一级分类: "其他",
    path: "其他",
    name: "拖拽组件cs",
    icon: "flight_takeoff",
    children: [],
    opened: false
  }
];