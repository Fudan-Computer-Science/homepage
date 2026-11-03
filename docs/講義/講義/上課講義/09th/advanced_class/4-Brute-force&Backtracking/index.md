---
sidebar_position: 4
title: 'Brute-force & Backtracking'
description: '原連結： https://hackmd.io/@konchin/Brute-force'
---
原連結： https://hackmd.io/@konchin/Brute-force
# Brute-force & Backtracking

暴力搜尋法顧名思義就是窮舉所有可能
當問題看起來沒辦法DP
而且測資範圍給很小的時候就要考慮使用暴搜

通常是用遞迴實作

---

## 試除法

### 想法

窮舉所有可能成為$x$因數的數進行測試

#### code

```cpp=
bool is_prime(int x) {
	for (int i = 2; i <= x; i++)
		if (!(x % i)) return false;
	return true;
}
```

---

## [a343: P(n, m) 的奧妙](http://203.64.191.163/ShowProblem?problemid=a343)

$n$ 個數字，取 $m$ 個進行排列

### 想法

有$m$個格子，依序把所有東西放進去
放滿就輸出

#### code

```cpp=
vector<int> v(n), arr(m);
vector<bool> used(n, false);
function<void(int)> dfs = [&](int cur) {
	if (cur == m) {
		for (auto && i : arr)
			cout << i << ' ';
		cout << endl;
		return;
	}
	for (int i = 0; i < n; i++)
		if (!used[i]) {
			used[i] = true, arr[cur] = v[i];
			dfs(cur + 1);
			used[i] = false;
		}
};
```

---

## [b554: 5.貪吃龍遊戲](https://zerojudge.tw/ShowProblem?problemid=b554)

$n\times n$方格中有0和1
從$(0,0)$出發，求連續1的最長路徑長

### 想法

從$(0,0)$出發，往上下左右走
走過的路就設成不能走(false)
回到該點就設回可以走(true)

#### code

```cpp=
constexpr pair<int, int> arr[] = {{1, 0}, {0, 1}, { -1, 0}, {0, -1}};
auto check = [&](int x, int y) {
	return x >= 0 && x < n && y >= 0 && y < n && v[x][y];
};
function<int(int, int)> dfs = [&](int x, int y) {
	int maxn = 0;
	v[x][y] = false;
	for (const auto& [a, b] : arr)
		if (check(x + a, y + b))
			maxn = max(maxn, dfs(x + a, y + b));
	v[x][y] = true;
	return 1 + maxn;
};
cout << dfs(0, 0) << endl;
```

---


## 八皇后問題

有一個西洋棋盤($8\times 8$)
要在棋盤上放$8$個皇后
使每一個皇后無法在一步以內吃到彼此
:::info
皇后可以走直的、橫的、斜的
:::
### 想法
窮舉皇后所在的位置(行,列)然後檢查是否符合規則

#### code

```cpp=
///////////////////////
// Author : 某教學顧問 // 硬要刷存在感(X)
///////////////////////

#define L(x, y) n - y - 1 + x 
#define R(x, y) y + x
//L是從(x, y)轉成u1的idx
//R是從(x, y)轉成u2的idx
//這需要自己想想看 XD
vector<vector<bool>> table;
//紀錄棋盤狀態
vector<bool> row, u1, u2;
//row是紀錄行 u1是左上右下斜線 u2是右上左下斜線
int n, cnt;

void dfs(int y) {
    if(y == n) {
        //輸出, cnt
        cnt++;
        for(auto& i : table) {
            for(const auto& j : i)
                cout << (j ? "Q" : "x");
            cout << '\n';
        }
        cout << '\n';
        return;
    }
    //遞迴
    //因為確保一列只會有一個 所以不用記錄列的狀態 直接遞迴下一列
    //判斷此點的行, 左上右下斜, 右上左下斜是否被記錄過
    //如果都未被記錄表示此點可放
    //然後繼續遞迴下一列
    //#define rep(i, n) for(int i = 0; i < n; ++i)
    rep(x, n) if(!row[x] && !u1[L(x, y)] && !u2[R(x, y)]) {
        table[y][x] = row[x] = u1[L(x, y)] = u2[R(x, y)] = 1;
        dfs(y + 1);
        table[y][x] = row[x] = u1[L(x, y)] = u2[R(x, y)] = 0;
    }
}

inline void solve() {
    while(cin >> n) {
        if(!n) break;
        if(n == 1)
            cout << "Q\n\n1\n\n";
        else if(n == 2 || n == 3) //不存在解
            cout << "0\n\n";
        else {
            // 初始化
            int N = 30;
            row = u1 = u2 = vector<bool>(N, 0);//懶的判斷大小直接用最大範圍XD
            cnt = 0;
            table = vector<vector<bool>>(n, vector<bool>(n, 0));
            dfs(0);//從第0列開始遞迴
            cout << cnt << "\n\n";
        }
    }
}
```

#### 類題
[a160: 祖靈想要下棋!!!!!!!!](https://zerojudge.tw/ShowProblem?problemid=a160)
[d757: 11195 - Another n-Queen Problem](https://zerojudge.tw/ShowProblem?problemid=d757)

---

## [a147: pC 我不要當隊長](http://203.64.191.163/ShowProblem?problemid=a147)

### 想法

:::spoiler 補充資料
小豫 $=$ 電神giver, 小昱 $=$ 電神jakao

![](https://cdn.fbsbx.com/v/t59.2708-21/54527137_787215734989083_4057612568405999616_n.gif?_nc_cat=110&ccb=2&_nc_sid=041f46&_nc_ohc=46NQC0YUTQ0AX_0DaQz&_nc_ht=cdn.fbsbx.com&oh=d8144ea803cf929123e947681a0cf689&oe=5F993E25)
:::

如果giver必贏，代表jakao怎麼選都會輸
如果jakao必輸，代表jakao怎麼選giver都有機會贏

所以可以推出遞迴式
$giver(x)=\neg\forall y:jakao(y),y\in next(x)$
$jakao(x)=\exists y:giver(y),y\in next(x)$

#### code

```cpp=
vector<bool> visited(n);
giver = [&](int cur) {
	bool ret = false;
	if (cur >= k) ret = true;
	for (int i = 0; i != n; i++)
		if (!ret && !visited[i]) {
			visited[i] = true;
			ret |= jakao(cur + v[i]);
			visited[i] = false;
		}
	return ret;
};
jakao = [&](int cur) {
	bool ret = true;
	if (cur >= k) ret = false;
	for (int i = 0; i != n; i++)
		if (ret && !visited[i]) {
			visited[i] = true;
			ret &= giver(cur + v[i]);
			visited[i] = false;
		}
	return ret;
};
```

#### 優化

因為直接遞迴狀態數可能會過多
所以可以用`unordered_map`把已經走過的可能記起來
另外可以用`int`的位元運算代替`vector<bool>`
會讓`unordered_map`的鍵值比較好存

---
