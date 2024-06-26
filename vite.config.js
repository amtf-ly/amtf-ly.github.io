import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // vitepress不支持？使用package.json配置
    // outDir: './amtf-laoyu', 
  },
  plugins: [vue()],
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  },
  server: {
    open: true, //自动打开浏览器
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
})
