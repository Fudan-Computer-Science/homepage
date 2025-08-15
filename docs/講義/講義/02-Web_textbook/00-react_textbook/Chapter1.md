---
sidebar_position: 0
title: "Chapter 1. React 基礎語法"
description: "React 基礎語法"
tags: [web]
---

# <span class="chapter_title">Chapter 1. </span>
# <span class="chapter_subtitle"> React 基礎語法 </span>
:::tip[]
*下述內容如果想自己嘗試看看的話，[請參考](./Chapter0.md#0-1-如何開啟一個react專案)
:::
## 1-1. Component (組件)
- React UI 是由組件組成的。組件是可重複使用的 UI 單元。  
- 分為 Function Component（函式組件） 和 Class Component（類別組件） 
- *新專案幾乎只用 函式組件。  
    :::note[範例]
    ```tsx
    function MyButton() 
    {
        return 
        (
            <h1>不難注意到 底下是一顆按鈕</h1>
            <button>Click me</button>
        );
    }
    ```
    :::
    :::info[也可以在其他組件裡面呼叫]
    ```tsx
    function Father() 
    {
        return
        (
            <MyButton />
        );
    }
    // 這時我們叫 Father 是 MyButton 的父組件

    // 這時我們叫 MyButton 是 Father 的子組件
    ```
    :::tip[語法小學堂]
    ```tsx
    function Father() 
    {
        function MyButton() 
        {
            return 
            (
                <h1>不難注意到 底下是一顆按鈕</h1>
                <button>Click me</button>
            );
        }
        return
        (
            <MyButton />
        );
    }
    // 合法
    ```
    :::


## 1-2. Props (參數? <small><small>沒有官方的中文譯名</small></small>)
- Props 是父組件傳給子組件的資料。
- Props 是 **唯讀**（不能在子組件內直接修改）。
    :::note[範例]
    ```tsx
    function MyButton({ text }) 
    {
        return 
        (
            <h1>不難注意到 底下是一顆按鈕</h1>
            <button>{ text }</button>
        );
    }
    function Father() 
    {
        return 
        (
            <MyButton text="Click me" />
        );
    }
    ```
    :::
## 1-3. 事件處理  
React 的事件命名採**駝峰式 (camelCase)**，並傳入函式。  
當事件發生時該函式就會被運行。
:::note[範例]
```tsx
function MyButton() 
{
    function handleClick() 
    {
        alert("Button clicked!");
    }

    return <button onClick={handleClick}>Click me</button>;
}
```
:::
## 1-4. State (狀態?)
組件內部的資料，使用 useState 管理。
:::info[簡單來說...]
在 C++ 中，如果你要讓一個變數的值可以在不同函數之間記住，你可能會：

1. 把它設為 **全域變數**（在競程可以但專案... **拜託不要**）
2. 把它設為 **類別的成員變數**（封裝比較好）

在 React 中，Component本質上是「普通函數」，沒有像 C++ 類別那樣的成員變數，  
但是我們仍希望它能「記住」一些值（例如計數器的數字、輸入框的內容）要怎麼做呢？    
這時就要用 **React Hook** —— `useState`。
:::
:::note[範例]
```tsx
import React, { useState } from 'react';

export default function Counter() 
{
  // [變數, 修改變數的方法] = useState(初始值)
  const [count, setCount] = useState(0);

  return 
  (
    <div>
      <p>目前計數：{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```
:::
:::info[語法小學堂]
**`() => setCount(count + 1)`是什麼？**  
這個語法是 ES6 箭頭函數（Arrow Function），基本結構是：  
```tsx
(參數) => { 函數內容 }
// 如果只有一行內容，花括號 {} 可以省略，而且會自動 return 。
```
有點類似 C++ 中的 lambda 函式。
:::