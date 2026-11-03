---
sidebar_position: 2
title: 'Dynamic Programming'
description: '原連結： https://hackmd.io/@konchin/DP'
---
原連結： https://hackmd.io/@konchin/DP
<!--
## 複習

快速冪code
```cpp=
constexpr int mod = 998244353;
long long pow(long long a, long long b){
    long long ret = 1;
    for(; /*...<1>...*/; b = /*...<2>...*/, a = /*...<3>...*/)
        if(/*...<4>...*/)
            ret = /*...<5>...*/;
    return ret;
}
```

:::spoiler <1>
`b`
:::

:::spoiler <2>
`b >> 1`
:::

:::spoiler <3>
`a * a % mod`
:::

:::spoiler <4>
`b & 1`
:::

:::spoiler <5>
`ret * a % mod`
:::
-->

# Dynamic Programming

- 空間換時間
<!--動態規劃在尋找有很多重疊子問題的情況的最佳解時有效。它將問題重新組合成子問題。為了避免多次解決這些子問題，它們的結果都逐漸被計算並被儲存，從簡單的問題直到整個問題都被解決。因此，動態規劃儲存遞迴時的結果，因而不會在解決同樣的問題時花費時間。-->
- 由部分最佳解推出整體最佳解
<!--動態規劃只能應用於有最佳子結構的問題。最佳子結構的意思是局部最佳解能決定全域最佳解（對有些問題這個要求並不能完全滿足，故有時需要引入一定的近似）。簡單地說，問題能夠分解成子問題來解決。-->


## fibonacci sequence

#### 遞迴

最直覺的解法

```cpp=
long long fib(int x) {
	if (x < 2) return x;
	return fib(x - 1) + fib(x - 2);
}
```
時間複雜度$O(\phi^n)$

### 轉移式

$$dp_i=\begin{cases}i&i<2\\dp_{i-1}+dp_{i-2}&otherwise\end{cases}$$

#### DP解

將答案存起來避免重複計算

```cpp=
long long ans[100];
long long fib(int x) {
	if (x < 2) return x;
	return ans[x] ? ans[x] : (ans[x] = fib(x - 1) + fib(x - 2));
}
```
時間複雜度$O(n)$, 空間複雜度$O(n)$

#### 滾動DP

```cpp=
long long fib(int x) {
	vector<int> v{0, 1};
	for (int i = 2; i <= x; i++)
		v[i & 1] += v[~i & 1];
	return v[x & 1];
}
```

時間複雜度$O(n)$, 空間複雜度$O(1)$

### 例題

[a069: I Love You 3000](http://203.64.191.163/ShowProblem?problemid=a069)
[a244: pD Minecraft 1.15 嗡嗡蜂群更新 上線啦!!!!](http://203.64.191.163/ShowProblem?problemid=a244)
[a372: 又來爬樓梯](http://203.64.191.163/ShowProblem?problemid=a372)

---

## Longest Common Subsequence(LCS)

### 轉移式

$$dp_{i,j}=\begin{cases}1+dp_{i-1,j-1}&a_i=b_j\\max(dp_{i-1,j},dp_{i,j-1})&otherwise\end{cases}$$

#### DP解

```cpp=
vector<vector<int>> dp(a.size() + 1, vector<int>(b.size() + 1));
for (size_t i = 0; i < a.size(); i++)
	for (size_t j = 0; j < b.size(); j++) {
		if (a[i] == b[j]) dp[i + 1][j + 1] = 1 + dp[i][j];
		else dp[i + 1][j + 1] = max(dp[i][j + 1], dp[i + 1][j]);
	}
cout << dp[a.size()][b.size()] << endl;
```

時間複雜度$O(nm)$, 空間複雜度$O(nm)$

#### 滾動DP

```cpp=
auto& a = max(inputa, inputb, [](auto& x, auto& y) {return x.size() < y.size();});
auto& b = min(inputa, inputb, [](auto& x, auto& y) {return x.size() < y.size();});
vector<vector<int>> dp(2, vector<int>(b.size() + 1));
for (size_t i = 0; i < a.size(); i++)
	for (size_t j = 0; j < b.size(); j++) {
		if (a[i] == b[j]) dp[~i & 1][j + 1] = 1 + dp[i & 1][j];
		else dp[~i & 1][j + 1] = max(dp[i & 1][j + 1], dp[~i & 1][j]);
	}
cout << dp[a.size() & 1][b.size()] << endl;
```

時間複雜度$O(nm)$, 空間複雜度$O(min(n,m))$
### 例題
[c001: 10405 - Longest Common Subsequence](https://zerojudge.tw/ShowProblem?problemid=c001)

---

## 路徑總數

### 轉移式

$$
dp_{i,j}=\begin{cases}1&i=1\ or\ j=1\\dp_{i-1,j}+dp_{i,j-1}&otherwise\end{cases}
$$

#### DP解

```cpp=
vector<vector<int>> dp(n, vector<int>(m, 1));
for (int i = 1; i < n; i++)
	for (int j = 1; j < m; j++)
		dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % mod;
cout << dp.back().back() << endl;
```

時間複雜度$O(nm)$, 空間複雜度$O(nm)$

#### 滾動DP

```cpp=
auto n = max(a, b);
auto m = min(a, b);
vector<vector<int>> dp(2, vector<int>(m, 1));
for (int i = 1; i < n; i++)
	for (int j = 1; j < m; j++)
		dp[i & 1][j] = dp[~i & 1][j] + dp[i & 1][j - 1];
cout << dp[~n & 1].back() << endl;
```

時間複雜度$O(nm)$, 空間複雜度$O(min(n,m))$

### 例題

[d198: 00825 - Walking on the Safe Side](https://zerojudge.tw/ShowProblem?problemid=d198)
[d378: 最小路徑](https://zerojudge.tw/ShowProblem?problemid=d378)

---

## 其他DP

## [a227: B.B.K.K.B.K.K.](http://203.64.191.163/ShowProblem?problemid=a227)

### 轉移式

$$dp_i=\begin{cases}2&i=1\\6&i=2\\2\times (dp_{i-1}+dp_{i-2})&otherwise\end{cases}$$

#### DP解

```cpp=
vector<int> v{1, 2, 6};
for (int i = 3; i <= n; i++)
	v[i % 3] = (v[(i - 1) % 3] + v[(i - 2) % 3]) << 1;
cout << v[n % 3] << endl;
```

時間複雜度$O(n)$, 空間複雜度$O(1)$

### 例題
[c878: 107北二5.議會質詢紀錄](https://zerojudge.tw/ShowProblem?problemid=c878)

---

## 樹上DP

這不會考 :poop:

### 例題

[20200704 APCS P4](/@emanlaicepsa/APCS202007?fbclid=IwAR0t4NRoIV4fBzrmpEXxCj535AgkUx9l90hrZ9GjMrOTXg-WtuR2OKZYkbI#p4)


:::spoiler 範例code
```cpp=
//沒在OJ上試過，可能有些小bug
#include<iostream>
#include<vector>
#include<functional>
using namespace std;
const string dic = "AUCG";
struct node {
	string val;
	vector<long long> ch, dp;
};
int main() {
	int n, m, a, b, root;
	cin >> n >> m;
	vector<node> v(n);
	for (int i = 0; i != n; i++) {
		cin >> a >> b >> v[a - 1].val;
		if (a == b) root = a - 1;
		else v[b - 1].ch.emplace_back(a - 1);
	}
	long long sum = 0;
	for (int k = 0; k != m; k++) {
		static function<void(int)> dfs = [&](int x) {
			v[x].dp.assign(4, 0);
			for (const auto& i : v[x].ch) dfs(i);
			for (int i = 0; i != 4; i++) {
				if (v[x].val[k] != '@' && v[x].val[k] != dic[i]) {
					v[x].dp[i] = 1e9; continue;
				}
				for (auto& j : v[x].ch) {
					long long minn = 1e9;
					for (int l = 0; l != 4; l++)
						minn = min(minn, v[j].dp[l] + (l != i));
					v[x].dp[i] += minn;
				}
			}
		};
		dfs(root), sum += min({v[root].dp[0], v[root].dp[1], v[root].dp[2], v[root].dp[3]});
	}
	cout << sum << endl;
	return 0;
}
```
:::
