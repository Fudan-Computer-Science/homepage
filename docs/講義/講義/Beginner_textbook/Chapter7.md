---
sidebar_position: 7
title : "第七章"
description: "參照與指標"
---

# <span class="chapter_title">Chapter 7. </span>
# <span class="chapter_subtitle"> Reference and Pointer </span>

## 7-1 參照
### 直切主題
```cpp
int a = 10;
int b = a;
b = -1;
cout << a;
```
不難推演出上面這段程式會輸出10  
```cpp
int a = 10;
int &b = a;
b = -1;
cout << a;
```
試試這段程式碼，居然會輸出-1  
和上一段差在哪裡呢  
`int &b = a;`  
b旁邊有一個`&`耶  
這代表b是a的參照  
具體是什麼意思呢？  
可以想像b就是a  
當你寫`b = -1`時，其實是對a修改  
b可以當作是a的暱稱  
因此b不會占用記憶體空間
### 參照當函數的引數
參照還可以用在函數的引數
```cpp
#include<iostream>
int sum(int x)
{
    int ans = 0;
    while(x != 0)
    {
        ans += x;
        x--;
    }
    return ans;
}
int main()
{
    int outer = 10;
    int ret = sum(outer);
    cout << ret;
}
```
當`main() {}`呼叫`sum(outer)`時，實際上必非是把outer直接塞入`sum()`裡，而是把outer的值賦值給x然後在運行`sum()`裡的程式。
```cpp
#include<iostream>
int sum(int &x)
{
    int ans = 0;
    while(x != 0)
    {
        ans += x;
        x--;
    }
    return ans;
}
int main()
{
    int outer = 10;
    int ret = sum(outer);
    cout << ret;
}
```
這個程式的`int sum(int x)`換成了`int sum(int &x)`  
因此當`main() {}`呼叫`sum(outer)`時，實際上是把x設定為outer的參照  
所以`x--;`實際上就是`outer--;`  
## 7-1 指標
眾所周知，電腦會把程式所需要的變數存在記憶體中，但電腦要怎麼知道變數存在哪裡呢？
因此對於每一個記憶體空間都會有一個屬於它的地址。
要如何知道這個變數存在哪裡呢？
```cpp
int fdcs = 114;
cout << &fdcs;
```
當然從一個記憶體的地址也可以知道它的值是什麼」，如下。
```cpp
cout << *(&fdcs);
```
也可以開一個變數來放「記憶體的地址」，如下。
```cpp
int *ptr = &fdcs;
```
可以發現到，現實中的地址是連續的，在程式中鄰近的記憶體編號也會是相鄰的。
什麼東西在程式中是「鄰近的記憶體」呢？
陣列！
```cpp
int arr[10];
cout << &(arr[9]) - &(arr[7]); // 會輸出2，因為兩者位置相差2
```
:::info
實際上，`arr[i]`其實等價於*(arr+i)
:::