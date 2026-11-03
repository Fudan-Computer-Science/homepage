---
sidebar_position: 3
title: 'Greedy & 進階DP'
description: '原連結： https://hackmd.io/@konchin/Greedy'
---
原連結： https://hackmd.io/@konchin/Greedy
<!--

## 複習

#### 疊代版快速冪code

:::spoiler code
```cpp=
constexpr int mod = 998244353;
long long pow(long long a, long long b) {
	long long ret = 1;
	for (; b; b = b >> 1, a = a * a % mod)
		if (b & 1)
			ret = ret * a % mod;
	return ret;
}
```
:::

#### 遞迴版快速冪code

:::spoiler code
```cpp=
constexpr int mod = 998244353;
long long pow(long long a, long long b) {
	if (!a) return;
	long long tmp = pow(a, b >> 1);
	return b & 1 ? tmp * tmp % mod * a % mod : tmp * tmp % mod;
}
```
:::

#### 費氏數列轉移式
:::spoiler 
{$$dp_i=\begin{cases}i&i<2\\dp_{i-1}+dp_{i-2}&otherwise\end{cases}$$}
:::

#### $O(nm)$的LCS DP解滾動後空間複雜度為何?
:::spoiler
$\Theta(min(n,m))$
:::

---

-->

# Greedy & 進階DP

# Greedy

每一步選擇中都採取在當前狀態下最好的選擇
從而**希望**導致結果是最好或最佳的演算法
$\rightarrow$ 容易爛掉

### 與DP的差別

- Greedy對於每個子問題的解決方案都做出選擇，不能回退
- 動態規劃則會儲存以前的運算結果，並根據以前的結果對當前進行選擇，有回退功能

---

## Longest Increasing Subsequence(LIS)

### 想法

儲存**lis的長度為i時的最佳解**
如果可以加長就加長
否則就替換掉前面的使其為最佳解

### code
```cpp=
size_t lis(const vector<int>& s) {
	if (!s.size()) return 0;
	vector<int> v{s.front()};
	for (const auto& i : s) {
		if (i > v.back()) v.emplace_back(i);
		else *lower_bound(v.begin(), v.end(), i) = i;
	}
	return v.size();
}
```

時間複雜度$O(nlogn)$

---

## [d221: 10954 - Add All](https://zerojudge.tw/ShowProblem?problemid=d221)

### 想法

$n$個數字總共需要$n-1$次加法操作
要使每次操作的權重最小就必須找最小的兩個數相加

### code
```cpp=
priority_queue<long long, vector<long long>, greater<long long>> pq;
for (int x, int i = 0; i != n; i++)
	cin >> x, pq.emplace(x);
while (pq.size() > 1) {
	auto tmp = pq.top(); pq.pop();
	pq.emplace(tmp + pq.top()), pq.pop();
}
cout << pq.top();
```

時間複雜度$O(nlogn)$

---

## [c223: Add All(變異版)](https://zerojudge.tw/ShowProblem?problemid=c223)

### 想法

這題的$n$範圍更大，~~O(nlogn)的複雜度會TLE~~
> 顯然還是$O(nlogn)$，但常數變小
 
透過觀察可知，**每次進行操作之後的數為遞增**
如果把操作後的數字放在一個queue裡面
最小值只會發生在**原數列的沒使用過的最前面**
或是**操作後數列的最前面**
所以只需要考慮原數列的前兩個數字及操作後數列的前兩個數字
就能得知最小的兩個數字
此即為**單調對列優化**的想法

### code

```cpp=
long long n;
while (rit(n), n) {
	vector<long long> v(n);
	for (auto& i : v) rit(i);
	sort(v.begin(), v.end());
	int a = 0, end = 0, b = 0;
	auto size = [&] {return end - a + n - b;};
	auto val = [&] {
		if (b == n) return v[a++];
		if (a == end) return v[b++];
		return v[a] < v[b] ? v[a++] : v[b++];
	};
	long long sum = 0;
	while (size() > 1) {
		long long x = val(), y = val();
		sum += v[end++] = x + y;
	}
	cout << sum << endl;
}
```

---

# 進階DP

## [a344: 就只是括號而已，還敢不拿AC啊 [-續-]](http://203.64.191.163/ShowProblem?problemid=a344)

## 想法

[卡特蘭數wiki](https://zh.wikipedia.org/wiki/%E5%8D%A1%E5%A1%94%E5%85%B0%E6%95%B0)
公式為$C_n=\frac{(2n)!}{n!(n+1)!}$
所以建一個到$2n$的階乘表
然後用[數論](/@konchin/Math)教過的**模逆元**做除法
直接套公式搞定

### code

```cpp=
vector<int> fac{1, 1};
fac.resize(30001, 0);
for (int i = 2; i <= 30000; i++)
	fac[i] = 1LL * fac[i - 1] * i % mod;
while (cin >> n) {
	if (n & 1)
		cout << "Error404" << endl;
	else
		cout << fac[n] * rev(1LL * fac[n / 2] * fac[n / 2 + 1]) % mod << endl;
}
```

---

## 背包問題 Knapsack problem

### 題目簡述

有一些東西，每個東西分別有其價值跟重量
有一個只能裝一定重量的包包，試問包包能裝的最大價值為何

:::info
[a279: 校長的背包問題](http://203.64.191.163/ShowProblem?problemid=a279) [a330: 主任的背包問題](http://203.64.191.163/ShowProblem?problemid=a330) [a331: 復旦的背包問題](http://203.64.191.163/ShowProblem?problemid=a331)
三題都過的電神可以自習 :poop:
:::

## 0/1 背包問題

> 在每項物品只有一個時的背包問題

### 想法

開一個$dp$陣列存當前總重量為$j$時的最大價值
對於第$i$個東西決定要不要放進包包

### 轉移式


$$
dp[i][j]=max(dp[i-1][j],v[i]+dp[i-1][j-w[i]])
$$

//下標字太小了所以用中括號

其中$v[i]$為第$i$個物品的價值(value)
$w[i]$為第$i$個物品的重量(weight)

### code

```cpp=
//n為物品數量 m為背包大小
vector<int> v(n), w(n);
vector<vector<int>> dp(n, vector<int>(m + 1, 0));
for (int i = 0; i < n; i++) {
	for (int j = 0; j < w[i]; j++)
		dp[i][j] = dp[i - 1][j];
	for (int j = w[i]; j <= m; j++)
		dp[i][j] = max(dp[i - 1][j], v[i] + dp[i - 1][j - w[i]]);
}
```
時間複雜度$\Theta(nm)$ 空間複雜度$\Theta(nm)$

### 滾動DP

從轉移式可以發現每次轉移都只需要用到上一$row$的資料
且轉移時必使用比$j$前面的$column$(前提是$weight$不為負
所們只要由後往前疊代dp陣列就可以壓成一維

### code

```cpp=
//n為物品數量 m為背包大小
vector<int> v(n), w(n);
vector<int> dp(m + 1, 0);
for (int i = 0; i < n; i++)
	for (int j = m; j - w[i] >= 0; j--)
		dp[j] = max(dp[j], v[i] + dp[j - w[i]]);
```

時間複雜度$\Theta(nm)$ 空間複雜度$\Theta(m)$

---

## 無限背包問題

> 每項物品都沒有數量限制

### 想法

從0/1背包的滾動DP解延伸，如果由前往後疊代
那已經放過的東西就可以被再放一次

### code

```cpp=
//n為物品數量 m為背包大小
vector<int> v(n), w(n);
vector<int> dp(m + 1, 0);
for (int i = 0; i < n; i++)
	for (int j = w[i]; j <= m; j++)
		dp[j] = max(dp[j], v[i] + dp[j - w[i]]);
```

時間複雜度$\Theta(nm)$ 空間複雜度$\Theta(m)$

---

## 有限背包問題

> 第$i$個物品有$k[i]$個

### 想法

把每項物品的數量拆成同樣的$k$個物品做0/1背包問題

### code

```cpp=
//n為物品數量 m為背包大小
vector<int> v(n), w(n), k(n);
vector<int> dp(m + 1, 0);
for (int i = 0; i < n; i++)
	for (int t = 0; t != k[i]; t++)
		for (int j = m; j - w[i] >= 0; j--)
			dp[j] = max(dp[j], v[i] + dp[j - w[i]]);
```

時間複雜度$\Theta(knm)$ 空間複雜度$O(m)$

:::danger
好像...有點慢? :poop:
:::

### 想法

利用類似快速冪的想法，把$k$個東西拆成$2$的冪次倍
對於拆出來的東西只需要把$value$跟$weight$都乘上該倍就可以了


### code

```cpp=
//n為物品數量 m為背包大小
vector<int> v(n), w(n), k(n);
vector<int> dp(m + 1, 0);
for (int i = 0; i < n; i++) {
	for (int a = 1; a < k[i]; k[i] -= a, a <<= 1) {
		int weight = w[i] * a, value = v[i] * a;
		for (int j = m; j - weight >= 0; j--)
			dp[j] = max(dp[j], value + dp[j - weight]);
	}
	//剩下不是二冪次的
	for (int j = m; j - w[i]*k[i] >= 0; j--)
		dp[j] = max(dp[j], v[i] * k[i] + dp[j - w[i] * k[i]]);
}
```

時間複雜度$O(nmlogk)$ 空間複雜度$O(m)$

---

因為找不到旅行推銷員問題...

:poop: 自習 :poop:
