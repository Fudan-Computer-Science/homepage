---
sidebar_position: 7
title: 'segment tree part 2'
description: '原連結： https://hackmd.io/@konchin/segment2'
---
原連結： https://hackmd.io/@konchin/segment2
# segment tree part 2

## 懶標記

如果題目有需要用到區間查詢和區間修改
最直覺的解法是把修改的區間每個點都分別做修改
```cpp=
int x; //x為欲修改成的值
int ql, qr; //[ql, qr)為欲修改的區間
for(int i = ql; i < qr; i++)
    update(i, x);
```

不過會發現一個問題，複雜度好大
$O((qr - ql)logn)$ 其中 $n$ 為線段樹的大小

---

這時候可以用一個方法解決
每次在更新時不直接更新到根節點
而是用一個標記紀錄還有多少值沒有更新

代碼如下(例題: [DJ a408: 區間更新](http://203.64.191.163/ShowProblem?problemid=a408))

```cpp=
constexpr int maxn = 1e6 + 5;

int n;
ll seg[maxn << 2], tag[maxn << 2], arr[maxn];

#define m ((l + r) >> 1)

inline void push(int i, int l, int r) {
    if (!tag[i]) return;
    if (r - l == 1) {seg[i] += tag[i], tag[i] = 0; return;}
    seg[i] += (r - l) * tag[i];
    tag[i << 1] += tag[i], tag[i << 1 | 1] += tag[i], tag[i] = 0;
}

void build(int i = 1, int l = 0, int r = n) {
    if (r - l == 1) {seg[i] = arr[l]; return;}
    build(i << 1, l, m), build(i << 1 | 1, m, r);
    seg[i] = seg[i << 1] + seg[i << 1 | 1];
}

void rmodify(int ql, int qr, int x, int i = 1, int l = 0, int r = n) {
    push(i, l, r);
    if (qr <= l || r <= ql) return;
    if (ql <= l && r <= qr) {tag[i] += x, push(i, l, r); return;}
    rmodify(ql, qr, x, i << 1, l, m), rmodify(ql, qr, x, i << 1 | 1, m, r);
    seg[i] = seg[i << 1] + seg[i << 1 | 1];
}

ll query(int ql, int qr, int i = 1, int l = 0, int r = n) {
    push(i, l, r);
    if (qr <= l || r <= ql) return 0LL;
    if (ql <= l && r <= qr) return seg[i];
    return query(ql, qr, i << 1, l, m) + query(ql, qr, i << 1 | 1, m, r);
}

#undef m

inline void solve() {
    int q, op, l, r, k; cin >> n >> q;
    for (int i = 0; i < n; i++)
        cin >> arr[i];
    build();
    while (q--) {
        cin >> op;
        if (op)
            cin >> l >> r, cout << query(l - 1, r) << endl;
        else
            cin >> l >> r >> k, rmodify(l - 1, r, k);
    }
}
```

---

## 動態開點 

當你的 $n$ 很大，操作比較少
i.e. $n=10^9,op=10^5$, $op$ 為修改次數
但是你無法壓縮 $n$ 的時候就可以用動態開點
(如果有辦法壓縮，用離散化會更好)
核心概念是有更新到才分配記憶體

因為陣列版在一開始就分配了所有記憶體
所以動態開點會用指標實作

代碼如下(例題: [DJ a491: schedule (hard version)](http://203.64.191.163/ShowProblem?problemid=a491))

```cpp=
constexpr int n = 1e9 + 5;

struct node {
    int v; node *l, *r;
}*root = nullptr;

#define m ((l + r) >> 1)

void update(int p, int x, node*& cur = root, int l = 0, int r = n) {
    if (p < l || r <= p) return;
    if (!cur) cur = new node{0, nullptr, nullptr};
    cur->v += x; if (r - l == 1) return;
    update(p, x, cur->l, l, m), update(p, x, cur->r, m, r);
}

int query(int ql, int qr, node* cur = root, int l = 0, int r = n) {
    if (!cur || qr <= l || r <= ql) return 0;
    if (ql <= l && r <= qr) return cur->v;
    return query(ql, qr, cur->l, l, m) + query(ql, qr, cur->r, m, r);
}

#undef m

inline void solve() {
    int m, a, b, k; cin >> m;
    while (m--) {
        string str; cin >> str;
        if (str == "live")
            cin >> a >> b, update(a, 1), update(b, -1);
        if (str == "tab")
            cin >> k, cout << query(0, k + 1) << endl;
    }
}
```

---

## 補充: 離散化

另一種降低$n$大小的方法
當一個陣列裡面元素的準確值不重要，只需要比較大小的時候
就可以用離散化來降低最大值的大小

i.e. $n=10^5,max(a_i)=10^9$, $n$ 為陣列 $a$ 的大小
如果離散化之後 $max(a_i)$ 就會降成 $\leq 10^5$
小於 $n$ 的原因是 $a$ 裡面有重複元素

代碼(模板)如下

```cpp=
int n; cin >> n;
vector<int> v(n);
for (auto& i : v) cin >> i;
//離散化
auto tmp = v;
sort(tmp.begin(), tmp.end());
tmp.resize(unique(tmp.begin(), tmp.end()) - tmp.begin());
for (auto& i : v)
    i = lower_bound(tmp.begin(), tmp.end(), i) - tmp.begin();
```

範例(例題: [DJ a095: pE 好動的小朋友有糖吃](http://203.64.191.163/ShowProblem?problemid=a095))

```cpp=
inline void solve() {
    int n; cin >> n;
    vector<pair<int, long long>> v(n);
    for (auto& i : v) cin >> i.first;
    for (auto& i : v) cin >> i.second;
    int height;
    /*離散化*/{
        auto tmp = v;
        sort(tmp.begin(), tmp.end());
        tmp.resize(unique(tmp.begin(), tmp.end(), [](const auto & a, const auto & b) {
            return a.first == b.first;
        }) - tmp.begin());
        for (auto& i : v)
            i.first = lower_bound(tmp.begin(), tmp.end(), i, [](const auto & a, const auto & b) {
            return a.first < b.first;
        }) - tmp.begin();
        height = tmp.size();
    }
    segment_tree tree(height);
    for (auto i : v)
        if ((i.second += tree(0, i.first)) > tree.data[i.first + height])
            tree.modify(i.first, i.second);
    cout << tree(0, height) << endl;
}
```

底下線段樹<ruby>實作方法<rt>z k w</rt></ruby>比較毒，可以參考上面離散化的部分就好
