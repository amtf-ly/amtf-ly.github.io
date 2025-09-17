amtf

https://github.com/amtf-ly/amtf-ly.github.io

git@github.com:amtf-ly/amtf-ly.github.io.git


## 需要用ssh的方式，用git bash here窗口下载
```bash
git clone git@github.com:amtf-ly/amtf-ly.github.io.git
```
上传到GitHub要通过vscode操作，不能用 TortoiseGit

为什么要这样干？为了自动部署?


## 上传到服务器
```powershell
$serverIP = "8.138.88.146"
$username = "root"
$keyPath = "C:\Users\Administrator\.ssh\8.138.88.146_id_ed25519"
$localDocsPath = ".\docs"
$remotePath = "/www/wwwroot/laoyu.xin"
ssh -i $keyPath "${username}@${serverIP}" "rm -rf ${remotePath}/* ${remotePath}/.* 2>/dev/null"
scp -i $keyPath -r "$localDocsPath/*" "${username}@${serverIP}:${remotePath}"
```
解释
```powershell
# 1. 定义变量
$serverIP = "8.138.88.146"
$username = "root"
$keyPath = "C:\Users\Administrator\.ssh\8.138.88.146_id_ed25519"
$localDocsPath = ".\docs"
$remotePath = "/www/wwwroot/laoyu.xin"

# 2. 删除远程内容
ssh -i $keyPath "${username}@${serverIP}" "rm -rf ${remotePath}/* ${remotePath}/.* 2>/dev/null"

# 3. 上传本地内容（修正后的命令）
scp -i $keyPath -r "$localDocsPath/*" "${username}@${serverIP}:${remotePath}"
```


