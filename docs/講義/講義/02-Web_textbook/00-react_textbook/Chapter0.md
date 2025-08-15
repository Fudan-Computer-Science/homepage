---
sidebar_position: 0
title: "Chapter 0. 開始你的React網站"
description: "開始你的React網站"
tags: [web]
---

# <span class="chapter_title">Chapter 0. </span>
# <span class="chapter_subtitle"> 開始你的React網站 </span>

## 0-0. React 和 Node.js 是什麼？
- React 
    - 用於**構建使用者介面 (UI)** 的 JavaScript 函式庫，由 Facebook 開發與維護。  
    - 它的核心理念是**組件化 (Component)** 與**狀態驅動渲染 (State-driven Rendering)**。
- Node.js
    - JavaScript 的執行環境（讓 JS 能跑在伺服器或開發工具上，而不只是瀏覽器）
    - 主要用來：
        - 安裝套件（透過 npm / yarn）
        - 執行開發伺服器（React 的 npm start 就靠它） 

## 0-1. 如何開啟一個React專案
操作步驟
### 1. 下載nvm (Node.js 版本管理器)
[參考這篇](https://www.casper.tw/development/2022/01/10/install-nvm/)  
簡單來說：  
- windows請點：[nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe)  
### 2. 安裝Node.js
打開 **終端機（Terminal）** 輸入   
```bash
nvm install node
```
:::info[也可以裝指定的版本]
    ```bash
    nvm install 20
    #改變目前使用的版本
    nvm use 20
    ```
:::
### 3. 打開 **終端機（Terminal）** 輸入  
```bash
npm create vite@latest my-app #建立叫做 my-app 的 vite 專案
```
![](/img/react_textbook_pic/00-vite_start.png)
```
cd my-app                     #移動到資料夾my-app
npm install                   #一鍵安裝 vite 專案需要的套件
npm run dev                   #開始運行你的專案
```
React 官方建議使用 **Vite** 或 **Create React App** 來快速啟動專案。  
這裡我們用 Vite，因為它啟動速度快。  
成功會看到  
![](/img/react_textbook_pic/01-vite_firstpage.png)

:::tip[小技巧]
在可以更改 src/App.tsx 的內容，起始頁面(上圖)就會更改。  
可配合後面的講義服用。
:::