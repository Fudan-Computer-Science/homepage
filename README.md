# Website
## 本地修改指南  
下載git  
https://git-scm.com/downloads/win  
下載nvm
https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe

開啟cmd
```shell
nvm install 18.20.8
nvm use 18.20.8
```
關掉cmd 開啟cmd
```shell
cd 你想要放檔案的位置
npx create-docusaurus@latest homepage https://github.com/Fudan-Computer-Science/homepage.git -g deep
```
![](./z_README_files/teach5.png)
^最下面的才是對的

成功!!!  

### 執行
在terminal打
```shell
cd ./homepage
npx docusaurus start
#如果遇到檔案 C:\Program Files\nodejs\npm.ps1 未經數位簽署。您無法在目前的系統上執行此指令碼。
#則用管理員權限打開shell
#輸入
Set-ExecutionPolicy -ExecutionPolicy Bypass
```

![](./z_README_files/teach9.png)
記得要在homepage的目錄執行 `npx docusaurus start`

![](./z_README_files/teach6.png)
之後打開 http://localhost:3000/homepage 就可以看到網站了  
![](./z_README_files/teach7.png)
在期間對檔案變更都可以在http://localhost:3000/homepage上顯示  
在terminal打 ctrl-C 中止


記得編碼是UTF-8  
![](./z_README_files/teach8.png)
### 提交變更
```
git request-pull
```
當屆幹部應該會看完之後幫你merge回main

### 若有任何問題 https://docusaurus.io/docs/category/guides 都應該可以解決

# 極度建議不要修改 yarn.lock package.json package-lock.json  除非你有億萬%的把握知道你在做什麼
# 如果是用學校電腦下載本地，請先下載 git [下載連結](https://git-scm.com/downloads/win?fbclid=IwY2xjawKt9l9leHRuA2FlbQIxMQABHnJGlnqq7szqmPzwWtLjiqh_I_GEUiu2vhKywGRB9tfjouSwmmVo_MwpFjcE_aem_P-Zep5fEh45LbKEUt2uJMQ)
