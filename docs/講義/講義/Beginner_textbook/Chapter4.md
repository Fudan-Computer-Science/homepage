---
sidebar_position: 4
title : "第四章"
description: "迴圈"
---

# <span class="chapter_title">Chapter 4. </span>
# <span class="chapter_subtitle"> Loops </span>


## 4-1 迴圈的介紹

假設今天要計算1+2+3+4+5+6+7+8+9，可以直接鍵入數字到程式內，但若今天要計算1+2+3+…+1000呢?這時候我們就要**運用迴圈**幫助我們更有效率地做大量的運算

迴圈是重複執行某些敘述，直到滿足特定條件為止，又稱為重複結構

- 迴圈主要分為三種
    - 用於固定次數:for
    - 用於不固定次數:while、do-while  
        (概念相去不遠，但使用上有些區別)

## 4-2 while迴圈  
```cpp
while(/* 條件 */) 
{
    /* 成立時會做什麼 */
}
```
        - 當括號內的條件成立，就進入迴圈(大括號)。  
        - 括號內的條件可以是一個指令(eg: cin\>\>a)，也可是一個判斷(eg: 1\>0)  
        - 當走到迴圈結束的地方就會回while重新判斷，直到條件不成立才跳出。

    範例程式碼：  
    ![](/img/Beginner_textbook_pic/image79.png)  

## 4-3 do while迴圈
```cpp
do
{
    /* 做什麼 */
}while(/* 條件不成立就不重覆執行 */);
```
        - 概念與while類似，但是是先執行敘述再判斷，所以不論如何**至少會執行一次敘述**  
        - 此處的while後面需有分號  
        - 常用於密碼輸入  

    範例程式碼：  
    ![](/img/Beginner_textbook_pic/image81.png)  


### while和 do while的差異  
![](/img/Beginner_textbook_pic/image45.jpg)  
圖：[https://www.facebook.com/ProgrammersCreateLife/photos/a.241809332534619/2490945784287618/?type=3\&theater](https://www.facebook.com/ProgrammersCreateLife/photos/a.241809332534619/2490945784287618/?type=3&theater)

## 4-4 for迴圈
![](/img/Beginner_textbook_pic/image28.png) 

```
for(初始值; 條件值; 更新值)
{
    敘述1
    敘述2
    ...
}

或

for(初始值; 條件值; 更新值)
    敘述
```
- 又稱為計數迴圈(counting loop) ，是一個可以重複執行指定次數的重複結構

- for迴圈的標準使用格式  

- 範例![](/img/Beginner_textbook_pic/image1.png)的實作  

![](/img/Beginner_textbook_pic/image43.png)  
![](/img/Beginner_textbook_pic/image64.png)  
![](/img/Beginner_textbook_pic/image35.png)  
![](/img/Beginner_textbook_pic/image33.png)  
![](/img/Beginner_textbook_pic/image65.png)  

- 多重for迴圈

簡單來說，就是迴圈包迴圈，使用時應注意**TLE(逾時)**的狀況

    - 九九乘法表範例：  
        ![](/img/Beginner_textbook_pic/image66.png)  
        ![](/img/Beginner_textbook_pic/image67.png)  
## 4-5 迴圈的中止

| break; | continue; |
| ----- | ----- |
| 直接跳離迴圈或switch結構 | 跳過continue指令之後的所有敘述，跳回迴圈的開頭繼續執行下個迴圈 |  

<h3>**※注意：別照字面翻譯continue**</h3>

- 範例：  
![](/img/Beginner_textbook_pic/image39.png)  
利用break及continue  
可以使迴圈的運用更加靈活  
當輸入為0的時候才會結束。  
若輸入不為0，就會因為continue  
而回到while迴圈一開始  
並且繼續輸入a。  
直到輸入為0時才會因為break  
跳出迴圈，但不論輸入是否為0  
都不會執行到迴圈內的cout。

<h3>**※利用break及continue配合if可以使迴圈的運用更加靈活**</h3>