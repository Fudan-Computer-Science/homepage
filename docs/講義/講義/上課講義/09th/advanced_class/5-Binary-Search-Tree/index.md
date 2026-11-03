---
sidebar_position: 4
title: 'Binary Search Tree'
description: '原連結： https://hackmd.io/@konchin/tree'
---
原連結： https://hackmd.io/@konchin/tree
# Binary Search Tree

**又稱二元搜尋樹, 有序二元樹, 排序二元樹**
是一種比較複雜的資料型態

一般在比賽中根本不會刻這鬼東西，不過還是要學
因為這是很多高階資料結構的基礎
(像是接下來會學到的線段樹

一般在提到樹狀結構第一個要學的就是BST

接下來介紹一下樹的基本

---

## 樹の名詞介紹

* 樹(tree) 
* 節點(node) 
* 根節點(root)
* 父節點(parent)
* 子節點(child)
* 葉節點(leaf)
* 子樹(subtree)

<!-- .slide: data-background="#EEEEEE" -->
![](https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg =600x)

---

## 二元搜尋樹の定義

* 若任意節點的左子樹不空，則左子樹上所有節點的值均小於它的根節點的值
* 若任意節點的右子樹不空，則右子樹上所有節點的值均大於它的根節點的值
* 任意節點的左、右子樹也分別為二元搜尋樹
* 沒有鍵值相等的節點

---

# Class

[**二篩講義**](/@konchin/book/%2FXToC9yD-R6Oxo7-G8nMy6Q)

---

## 實作二元搜尋樹

```cpp=
#include<iostream>
using namespace std;
struct bst {
	struct node {
		int k; node *l, *r;
		node(int x): k(x) {l = r = nullptr;}
	}*root;
	void insert(int x, node*& cur) {
		if (!cur) cur = new node(x);
		else insert(x, x < cur->k ? cur->l : cur->r);
	}
	void insert(int x) {insert(x, root);}
	void print(node* cur) {
		if (!cur) return;
		print(cur->l);
		cout << cur->k << ' ';
		print(cur->r);
	}
	void print() {print(root); cout << endl;}
	bst(): root(nullptr) {}
};
int main() {
	bst tree;
	for (auto i : {6, 4, 5, 7, 9, 8, 0, 1, 3, 2})
		tree.insert(i);
	tree.print();
	return 0;
}
```

:::spoiler 毒瘤code
```cpp=
#include<iostream>
#include<vector>
using namespace std;
template<typename T> struct bst {
	bst(auto&& v = {}): r(0) {for (const T& i : v) insert(i);}
	struct n {T k; n*p[2]; n(const T& x): k(x) {p[0] = p[1] = 0;}} *r;
	void i(const T&x, n*&c) {
		if (c) i(x, c->p[c->k < x]); else c = new n(x);
	} void insert(const T& x) {i(x, r);}
	void pt(auto& o, n*c) {
		if (c) pt(o, c->p[0]), o << c->k << ' ', pt(o, c->p[1]);
	} void print(auto& o) {pt(o, r), o << std::endl;}
};
int main() {
	cin.tie(nullptr);
	ios::sync_with_stdio(false);
	bst<int> tree(std::vector<int> {1, 5, 4, 3, 2});
	tree.print(std::cout);
	return 0;
}
```
:::