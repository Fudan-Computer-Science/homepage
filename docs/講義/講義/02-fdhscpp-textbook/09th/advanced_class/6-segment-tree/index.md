---
sidebar_position: 6
title: 'segment tree'
description: '原連結： https://hackmd.io/@konchin/segment'
---
原連結： https://hackmd.io/@konchin/segment
# segment tree

線段樹是一種二元樹形資料結構
用以儲存區間或線段，並且允許快速查詢結構內包含某一點的所有區間
一個包含 $n$ 個區間的線段樹，空間複雜度為 $O(n)$ ，查詢的時間複雜度則為 $O(logn+k)$ ，其中 $k$ 是符合條件的區間數量

:::spoiler 時間複雜度 💩
![](https://i.imgur.com/yBiu5cO.png)
:::

---

## 線段樹示意圖

![](https://i.imgur.com/n79odXF.png)

---

## 基本操作

### 單點修改 & 區間查詢

#### 單點修改

從根結點開始找
分成三種情況討論

##### 1. 完全不包含
不用做任何操作，直接return

##### 2. 完全包含
代表當前節點只有一個元素
直接修改即可

##### 3. 部分包含
遞迴左右子樹直到符合上面兩個任一


#### 區間查詢
一樣分三種情況

##### 1. 完全不包含
return 0

##### 2. 完全包含
return 當前節點的值

##### 3. 部分包含
遞迴左右子樹直到符合上面兩個任一

**可以發現兩種操作基本上 完 全 一 致**

---

### 區間修改 & 單點查詢

教BIT的時候再講 :poop:

---


## 常見的實作方法

### 指標

##### 優點
- 直觀
- 可持久化

##### 缺點
- 記憶體肥
- 指標比較慢


#### code

```cpp=
struct node {
	ll val;
	node *l, *r;
	node* pull() {val = (l ? l->val : 0) + (r ? r->val : 0); return this;}
	node(ll x): val(x), l(nullptr), r(nullptr) {}
	node(node* a, node* b): l(a), r(b) {pull();}
};

using stree = node*;

ll n, arr[1000005];

#define m ((l + r) >> 1)

stree build(int l = 0, int r = n) {
	if (r - l == 1) return new node(arr[l]);
	else return new node(build(l, m), build(m, r));
}

stree modify(stree pre, int p, ll k, int l = 0, int r = n) {
	if (p < l || r <= p) return pre;
	if (r - l == 1) {pre->val = k; return pre;}
	modify(pre->l, p, k, l, m), modify(pre->r, p, k, m, r);
	return pre->pull();
}

ll query(stree cur, int ql, int qr, int l = 0, int r = n) {
	if (qr <= l || r <= ql) return 0;
	if (ql <= l && r <= qr) return cur->val;
	return query(cur->l, ql, qr, l, m) + query(cur->r, ql, qr, m, r);
}

void print(stree cur, int l = 0, int r = n) {
	if (r - l == 1) {cout << cur->val << ' '; return;}
	print(cur->l, l, m), print(cur->r, m, r);
}

#undef m

inline void solve() {
	string str;
	getline(cin, str);
	stringstream ss(str);
	while (ss >> arr[n]) n++;
	int q, l, r; cin >> q;
	stree seg = build();
	while (q--) {
		cin >> l >> r;
		if (l > r) swap(l, r);
		cout << query(seg, l - 1, r) << endl;
	}
}
```

---

### 陣列

##### 優點
- 比較不占空間
- 下標存取比指標快一些

##### 缺點
- 要用到一些位元運算
- 比較不直觀

#### code

```cpp=
constexpr int maxn = 200000;
ll n = 0, seg[maxn << 2], arr[maxn + 5];

#define m ((l + r) >> 1)

void build(int i = 1, int l = 0, int r = n) {
	if (r - l == 1) {seg[i] = arr[l]; return;}
	build(i << 1, l, m), build(i << 1 | 1, m, r);
	seg[i] = seg[i << 1] + seg[i << 1 | 1];
}

void modify(int p, ll k, int i = 1, int l = 0, int r = n) {
	if (p < l || r <= p) return;
	if (r - l == 1) {seg[i] = k; return;}
	modify(p, k, i << 1, l, m), modify(p, k, i << 1 | 1, m, r);
	seg[i] = seg[i << 1] + seg[i << 1 | 1];
}

ll query(int ql, int qr, int i = 1, int l = 0, int r = n) {
	if (qr <= l || r <= ql) return 0;
	if (ql <= l && r <= qr) return seg[i];
	return query(ql, qr, i << 1, l, m) + query(ql, qr, i << 1 | 1, m, r);
}

void print(int i = 1, int l = 0, int r = n) {
	if (r - l == 1) {cout << seg[i] << ' '; return;}
	print(i << 1, l, m), print(i << 1 | 1, m, r);
}

#undef m

inline void solve() {
	string str;
	getline(cin, str);
	stringstream ss(str);
	while (ss >> arr[n]) n++;
	build();
	int q, l, r; cin >> q;
	while (q--) {
		cin >> l >> r;
		if (l > r) swap(l, r);
		cout << query(l - 1, r) << endl;
	}
}
```

