---
sidebar_position: 1
title: '數論'
description: '原連結： https://hackmd.io/@konchin/Math'
---

原連結： https://hackmd.io/@konchin/Math

# 數論

> https://hackmd.io/1tR3LRkHTn6RYaJi7lChKg?view
> 摘錄 from Giver \<(_ _)>

---

## 質數
- 只有恰好兩的因數 - $1$和$n$
- $1$不是質數(也不是合數)
- $n$以下的質數大約有$\frac{n}{\ln n}$個
- 任意數字$n$最多只有$O(\log n)$個質因數

----

### 質數判斷
1. ```for i = 2 ~ n-1: if n%i==0 then n is composite```，$O(n)$
```cpp=
bool is_prime(int x) {
	for (int i = 2; i < x; i++)
		if (x % i == 0) return false;
	return true;
}
```
2. ```for i = 2 ~ sqrt(n): if n%i==0 then n is composite```，$O(\sqrt n)$
```cpp=
bool is_prime(int x) {
	for (int i = 2; i <= sqrt(x); i++)
		if (x % i == 0) return false;
	return true;
}
```
3. 先判奇偶數，接下來只需要考慮$i$是奇數就好，單純常數優化
5. $6n\pm 1$，先判$2,3$的倍數，接下來只需考慮$i=6n\pm 1$就好，一樣是常數優化
6. 其實只需考慮$i$是質數就好了，複雜度是$O(\frac{\sqrt n}{\log n})$，然而我們需要先想辦法找出$\le \sqrt n$的所有質數

----

### 篩表 - sieve 
回想國小一開始教質數的時候，方法是先列出一張表寫著1~100，然後先不管1，從2開始，因為2沒被劃掉代表2是質數，之後把2的倍數都打叉，接下來3沒被劃掉因此3是質數，把3的倍數劃掉，然後4被打叉了所以是合數...一直下去
好好把這個做法實作出來就是sieve演算法

----

### sieve(ver.1)
```cpp
vector<int> prime;
bool flag[n+1];
for(int i=2;i<=n;i++){
    if(!flag[i]){
        prime.push_back(i);
        for(int j=i+i;j<=n;j+=i)
            flag[j]=1;
    }
}
```
複雜度$O(n\ln\ln n)$

### sieve(ver.2)
實際上$i$的倍數中$i^2$以下的早就被刪掉了，所以$j$從$i^2$開始即可
```cpp
vector<int> prime;
bool flag[n+1];
for(int i=2;i<=n;i++){
    if(!flag[i]){
        prime.push_back(i);
        for(int j=(long long)i*i;j<=n;j+=i)
            flag[j]=1;
    }
}
```
複雜度一樣$O(n\ln\ln n)$，常數優化

----

根據上述我們就可以用$O(n\ln\ln n)$時間預處理得到$\le n$的所有質數(同時也可以$O(1)$從flag陣列判斷$\le n$的數是不是質數)  
配合前述質數判斷最後一種做法，可以$O(\sqrt n\ln\ln n)$預處理，$O(\frac{\sqrt n}{\ln n})$時間詢問

---

## 位元運算

---

### 位元運算子
- `&` bitand 位元AND
- `|` bitor 位元OR
- `^` xor 位元XOR
- `~` compl 位元取反
- `<<` lshift 位元左移
- `>>` rshift 位元右移

---

#### 位元AND

`10100101`
&
`10111011`
\=
:::spoiler
`10100001`
:::

---

#### 位元OR

`10100101`
|
`10111011`
\=
:::spoiler
`10111111`
:::

---

#### 位元XOR

`10100101`
^
`10111011`
\=
:::spoiler
`00011110`
:::

---

#### 位元取反

~`10100101`
:::spoiler
`01011010`
:::

---

#### 位元左移

`10100101<<2`
\=
`10010100`

---

#### 位元右移

`10100101>>2`
\=
`00101001`

---

### 判斷奇偶

:::spoiler
`x&1`
:::

---

### 整數交換

```cpp
a ^= b, b ^= a, a ^= b;
```

**一個數XOR相同的數兩次會等於原來的數**
**換言之`a ^ b ^ b = a`**

---

## 模運算
由於很多題目值域可能會很大，為了維持在一個合理的範圍內(int以內之類的)，很多題目會是求答案$\mod M$，(也就是取餘數)，因此模運算變得很重要

範例: [DJ a264](http://203.64.191.163/ShowProblem?problemid=a264)

----

### 定義
$a\mod m$ 代表$a$取$m$的餘數
$a\equiv b\pmod m$ 的意思是$a$和$b$**同餘**(模$m$)，實際上就是$a$和$b$取$m$的餘數相等，同時也等價$a-b$是$m$的倍數

----

### trivia
- $(a+b)\mod m\equiv (a\mod m)+(b\mod m)\pmod m$
- $(a-b)\mod m\equiv (a\mod m)-(b\mod m)\pmod m$
- $(a\times b)\mod m\equiv (a\mod m)\times(b\mod m)\pmod m$

證明不難歡迎嘗試(令$a=km+p,b=lm+q$...)
根據上述可知模運算中的加減乘法都可以隨時做，也就是說就算有一連串的運算也不用算出最後的值再模，可以邊算邊模(每做一次運算就模之類的)

----

### 快速冪
- 求 $a^b\mod m$

考慮分治: $a^b=\begin{cases}1\;,\;b=0\\(a^{\frac{b}{2}})^2\;,\;\text{b is even}\\(a^{\frac{b}{2}})^2\times a\;,\;\text{b is odd}\end{cases}$
因此直接寫成遞迴code:
```cpp
int pow(int a, int b, int m) {
	if (b == 0) return 1;
	int tmp = pow(a, b / 2, m);
	return (b % 2 == 1) ? tmp * tmp % m * a % m : tmp * tmp % m;
}
```
另一種版本: 考慮$(a^{\frac{b}{2}})^2=(a^2)^{\frac{b}{2}}$

```cpp
int pow(int a, int b, int m) {
	if (b == 0) return 1;
	int tmp = pow(a * a % m, b / 2, m);
	return (b & 1) ? tmp * a % m : tmp;
}
```
迴圈版本: 我好懶的解釋或許可以自己看code想想看，反正遞迴不比較差會一種就好
```cpp
int pow(int a, int b, int m) {
	int ret = 1;
	for (a %= m; b; b >>= 1, a = a * a % m) {
		if (b & 1)
			ret = ret * a % m;
	}
	return ret;
}
```
時間複雜度都一樣$O(\lg b)$

注意到快速冪的這個做法其實不只能套用在整數快速冪，常見還有矩陣/多項式快速冪，除此之外此類分治也能應用在一些有相同性質的地方不一定只能用在快速冪

### 模逆元 (乘法反元素)

```cpp
constexpr int mod=1e9+7;
int pow(int a,int b=mod-2){
    int ret=1;
    for(;b;b>>=1,a=a*a%mod)
        if(b&1) ret=ret*a%mod;
    return ret;
}
```

要了解原理可以去看 [Fermat's little theorem](https://www.google.com/search?q=Fermat%27s+little+theorem)

----

## 大數
若遇到題目的值域範圍超過基本資料型態所能存的範圍，那麼就要考慮自己實作大數
大數運算其實就是多項式運算的特例，例如:
$12345=1x^4+2x^3+3x^2+4x+5$並帶入$x=10$
當然也可以改變$x$的值換成不同進制的表示法，不過為了方便一般一定選$x=10^k$，而$x$越大會越省時間與空間但是要小心溢位:
$12345=1x^2+23x+45$帶入$x=100$
將數字轉換成多項式後，大數運算其實就是多項式運算而已，只是計算完後要好好處理進位

或是用python :poop:

----

### 多項式/大數儲存方法
多項式: $\sum\limits_{i=0}^{n-1}a_ix^i$
因此$n-1$次多項式可用長度為$n$的陣列來儲存，其中$a[i]$存$x^i$次項系數
大數則是先選好個底數$x$，再來就好好把數字轉成多項式即可
處理進位則是在每次運算後，**由低位到高位**做進位```a[i+1]+=a[i]/d,a[i]%=d```其中$d$是底數

----

### 多項式加法
$c_i=a_i+b_i$
直接逐項相加即可，大數可能需要進位(最多進$1$位)，通常由低位到高位做同時順便處理進位，不用最後才處理
時間複雜度$O(n)$
若$a$是$n$次多項式，$b$是$m$次多項式，那麼$c$是$\max(n,m)$次多項式
假設原本的值域是$d$ ($0\le a_i,b_i\lt d$)，那麼$c$的值域是$O(2d)$

----

### 多項式減法
$c_i=a_i-b_i$
直接逐項相減即可，大數可能需要退位(最多退$1$位)，通常由低位到高位做同時順便處理退位，不用最後才處理
時間複雜度$O(n)$
若$a$是$n$次多項式，$b$是$m$次多項式，那麼$c$是$\max(n,m)$次多項式，有可能會退化
假設原本的值域是$d$ ($0\le a_i,b_i\lt d$)，那麼$c$的值域是$O(d)$

----

### 多項式乘法(卷積)
$c_i=\sum\limits_{j=0}^{i}a_jb_{i-j}$
($c_{i+j}+=a_ib_j$)
初始化$c$都是$0$，枚舉$i,j$做$c[i+j]+=a[i]\times b[j]$，大數可能需要進位，通常算完最後才處理
時間複雜度$O(n^2)$
若$a$是$n$次多項式，$b$是$m$次多項式，那麼$c$是$n+m$次多項式
假設原本的值域是$d$ ($0\le a_i,b_i\lt d$)，那麼$c$的值域是$O(nd^2)$

----

### 多項式除法
又難又難，一般常見簡單的寫法是由高位到低位枚舉或二分搜每位的值應該是多少，基本上太毒很少見暫不多談

---

