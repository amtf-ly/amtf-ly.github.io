import fs from "fs-extra";
import path from "path";

function 生成目录obj(dirPath, parentPath = "") {
  const files = fs.readdirSync(dirPath);
  const 文件夹短名称 = path.basename(dirPath);
  const 目录obj={
    name: 文件夹短名称,
    icon: "flight_takeoff",
    path: 文件夹短名称,
    children: []
  };

  const 嵌套arr = [];

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const children = 生成嵌套arr(filePath, path.join(parentPath, file));
      嵌套arr.push({ name: file, children, opened: true });
    } else if (path.extname(file) === ".md") {
      const name = path.basename(file, ".md");
      // 嵌套arr.push({ name, path: path.join(parentPath, name) });
      // 路径中加上父级文件夹的名称
      const folderName = path.basename(path.dirname(filePath));
      const fullPath = path.join(parentPath, folderName, name);
      嵌套arr.push({ name, path: fullPath });

    }
  });
  目录obj.children=嵌套arr
  return 目录obj;
}

// const 给定文件夹 = "D:/amtf-code/amtf-ly==quasar3=首页完成=黑白动画bug/src/pages/frappe_docker";
const 给定文件夹 = "src/pages/frappe_docker";//能识别jsconfig.json的路径配置？
// const 给定文件夹 = "D:/amtf_js/quasardocs/src/pages/frappe_docker";
const 目录obj = 生成目录obj(给定文件夹);
// const exportContent = `export default ${JSON.stringify(嵌套arr, null, 2).replace(/\\\\/g, '/')};`;
const exportContent = `export default ${JSON.stringify(目录obj, null, 2)
  .replace(/"([^"]+)":/g, "$1:")
  .replace(/\\\\/g, "/")};`;

fs.writeFileSync(path.join(给定文件夹, "00目录.js"), exportContent);
