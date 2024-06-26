import fs from "fs-extra";
import path from "path";
import 总目录 from './menu总目录.js'
// import frappe_docker from '../pages/frappe_docker/00目录.js'
// import 其他 from '../pages/其他/00目录.js'

export default function 拼接总目录(params) {
  console.log(`拼接总目录执行ing`)
  // const obj=遍历文件夹生成目录("src/pages/docs", '',true)
  // 更新总目录obj(obj)

  // 更新总目录obj(import('src/pages/frappe_docker/00目录.js').default);//不能用这种方式
  // 更新总目录obj(frappe_docker,false);

  const 目录arr=遍历文件夹生成目录("src/pages/其他", '',true,true)
  更新总目录obj(目录arr,true);
  return 总目录;
}

export function 更新总目录obj(新值arr=[],导出文件 = false) {
  // let yy = 总目录.filter((item) => item.path == 拟加入目录.path);
  新值arr.forEach(新值obj => {
    // const index = 总目录.findIndex((item) => {
    //   // console.log("item………………………………", item);
    //   return item.path == 新值obj.path;
    // });
    // if (index != -1) {
    //   // console.log("已经存在");
    //   总目录[index] = 新值obj;
    // } else {
    //   // console.log("还没有");
    //   总目录.push(新值obj);
    // }

    总目录.push(新值obj);
  });

  if (导出文件) {
    导出为js文件(总目录)
  }
  // return 总目录;
}

function 遍历文件夹生成目录(遍历文件夹名, parentPath = "", 导出文件 = false,是顶层目录=false) {
  const files = fs.readdirSync(遍历文件夹名);
  // const 文件夹短名称 = path.basename(遍历文件夹名);
  const 目录arr = [];

  files.forEach((file) => {
    let 需要展示=false
    const 文件夹短名称 = path.basename(遍历文件夹名);
    const obj={
      // name: 文件夹短名称,
      // icon: "flight_takeoff",
      // path: 文件夹短名称,
      // 一级分类: 文件夹短名称,
      // children: []
    };
    const filePath = path.join(遍历文件夹名, file);
    const stat = fs.statSync(filePath);
    if (是顶层目录) {
      obj.一级分类=文件夹短名称
      obj.path=文件夹短名称
      obj.name=文件夹短名称
      obj.icon="flight_takeoff"
      需要展示=true
    }
    if (stat.isDirectory()) {
      const children = 遍历文件夹生成目录(filePath, path.join(parentPath, file));
      // 目录arr.push({ name: file, children, opened: false });
      obj.name=file
      obj.children=children
      obj.opened=false
    } else if (path.extname(file) === ".md") {
      const 文件无后缀名 = path.basename(file, ".md");
      // 目录arr.push({ 文件无后缀名, path: path.join(parentPath, 文件无后缀名) });
      // 路径中加上父级文件夹的名称
      const folderName = path.basename(path.dirname(filePath));
      // const fullPath = path.join(parentPath, folderName, 文件无后缀名);
      let fullPath = path.join(folderName, 文件无后缀名);
      obj.name=文件无后缀名
      obj.path=fullPath
      // 目录arr.push({ name, path: fullPath });
      需要展示=true
      if (folderName==文件无后缀名) {
        // fullPath = 文件无后缀名;
        需要展示=false
      }
    }

    if (需要展示) {
      目录arr.push(obj);
    }
  });

  // 目录obj.children=目录arr
  if (是顶层目录 && 导出文件) {
    导出为js文件(目录arr,遍历文件夹名,"00目录-程序生成.js")
  }

  return 目录arr;
}


function 导出为js文件(拟导出obj,导出路径="src/assets",导出文件名="menu总目录-程序生成.js") {
  const exportContent = `export default ${JSON.stringify(拟导出obj, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/\\\\/g, "/")};`;
  const 导出全名=path.join(导出路径, 导出文件名)
  fs.writeFileSync(导出全名, exportContent);
}



import { fileURLToPath } from 'url';
// import.meta.url返回的是当前模块文件的URL
// console.log('import.meta.url当前模块文件的URL',import.meta.url)
const currentFilePath = fileURLToPath(import.meta.url);
// console.log('`file:///${process.argv[1]}`',`file:///${process.argv[1]}`)
// console.log('process.argv[1]当前执行的js文件路径',process.argv[1])
// 可以打印出最开始的process的js路径👆👇
// process.argv[1]当前执行的js文件路径 C:\Users\Administrator\AppData\Local\Yarn\Data\global\node_modules\@quasar\cli\bin\quasar.js
if (currentFilePath === process.argv[1]) {
  console.log('当前是独立运行该js文件')
  const obj=遍历文件夹生成目录("src/pages/其他", '',true,true)

}

// const menu=拼接总目录()
