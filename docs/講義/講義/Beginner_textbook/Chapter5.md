---
sidebar_position: 5
title : "第五章"
description: "陣列與字串"
---

# <span class="chapter_title">Chapter 5. </span>
# <span class="chapter_subtitle"> Array and String </span>


## 5-1 一維陣列  
之前我們使用的變數都只能一次儲存一個資料，但如果現在有100個資料呢？難不成要宣告100個變數嗎？這時候就需要用到陣列來幫助我們一次宣告大量變數。  
陣列由很多相同資料型態的變數所組成，有點像是數列一樣連在一起，每一格都有自己的編號。
### 宣告
    - 宣告時請注意：
        - 陣列的編號是**從0開始定義**  
        - 除了宣告時的 \[ \]內代表格數外，往後使用時 \[ \] 內的數字則代表編號
    - 宣告格式：
        ```
        資料型態 陣列名稱[格數];
        e.g. int num[8];
        ```
    - 宣告範例：
        -  範例一：
            :::note[範例一]
            陣列可在宣告時就指定每格的內容,若不指定則是殘值(亂碼)  
            e.g. `int num[8] = {0, 1, 2, 3, 4, 5, 6, 7};`
            :::
            |  | num\[0\] | num\[1\] | num\[2\] | num\[3\] | num\[4\] | num\[5\] | num\[6\] | num\[7\] |
            | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
            | num[] | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
        -  範例二：
            :::note[範例二]
            陣列可在宣告時就指定每格的內容,若不指定則是殘值(亂碼)  
            e.g. `int num[8];`
            :::
            |  | num\[0\] | num\[1\] | num\[2\] | num\[3\] | num\[4\] | num\[5\] | num\[6\] | num\[7\] |
            | :---: | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |  
            | num[] | 21342343 | 234566 | 7867890 | 879057457 | 3525235 |235252  | 325235 | 23523525 |

    :::tip
    陣列是「單獨」作業的,無論cin 或 cout 都是以單格來處理  
    e.g. `cin>>num[5];`(鍵入9)
    ::: 
    |  | num\[0\] | num\[1\] | num\[2\] | num\[3\] | num\[4\] | num\[5\] | num\[6\] | num\[7\] |  
    | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
    | num[] | 0 | 1 | 2 | 3 | 4 | <span class="red_warning">9</span> | 6 | 7 |


### 常用範例：  
    ![](/img/Beginner_textbook_pic/image3.png)  

進階教學強烈建議陣列大小不要用變數以免造成記憶體空間不足之問題  
還有可能會發生意料之外的錯誤(有些編譯器不支援)(其他屆的進階教學)  

## 5-2 排序  
### Bubble sort(氣泡排序法)：

```cpp
#include<iostream>
using namespace std;
 
int main() {
    int n; //陣列大小
    int temp;
    while (cin >> n) {
        int a[100000];
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = n - 1; i > 0; i--) {
            for (int j = 0; j <= i - 1; j++) {
                if (a[j] > a[j + 1]) {
                    temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                }
            }
        }
        for (int i = 0; i < n; i++) {
            cout << a[i] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

### Insertion sort(插入排序法)：
```cpp
#include<iostream>
using namespace std;
 
int main() {
    int n;
    while (cin >> n) {
        int a[100000];
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 1; i < n; i++) {
            int temp = a[i];
            int j = i - 1;
            for (; temp < a[j] && j >= 0; j--) {
                a[j + 1] = a[j];
            }
            a[j + 1] = temp;
        }
        for (int i = 0; i < n; i++) {
            cout << a[i] << " ";
        }
    }
    return 0;
}
```


### Selection sort(選擇排序法) :
```cpp
#include<iostream>
using namespace std;
int main() {
    int n;
    while (cin >> n) {
        int a[100000], temp;
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (a[i] > a[j]) {
                    temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }
        for (int i = 0; i < n; i++) {
            cout << a[i] << " ";
        }
        cout << endl;
    }
}
```


## 5-3 二維陣列  
多個相同資料型態的變數，組成一維陣列; 同理，多個相同型態與大小的一維陣列可以組成二維陣列。  
  
### **宣告**：  
    :::tip[先橫列(column)再直行(row)]
    資料型態 陣列名稱[列數][行數]  
    e.g. `int num[3][5];`
    :::

    |  |  | 第0行 | 第1行 | 第2行 | 第3行 | 第4行 |
    | ----- | ----- | :---: | :---: | :---: | :---: | :---: |
    |  |  | num\[\]\[0\] | num\[\]\[1\] | num\[\]\[2\] | num\[\]\[3\] | num\[\]\[4\] |
    | 第0列 | num\[0\]\[\] | 亂碼 | 亂碼 | 亂碼 | 亂碼 | 亂碼 |
    | 第1列 | num\[1\]\[\] | 亂碼 | 亂碼 | 亂碼 | 亂碼 | 亂碼 |
    | 第2列 | num\[2\]\[\] | 亂碼 | 亂碼 | 亂碼 | 亂碼 | 亂碼 |


    :::note[]
    陣列可在宣告時就指定每格的內容,若不指定則是殘值(亂碼)  
    e.g. 
    ```cpp
    int num [3][5]=
    {
        {0, 1, 2, 3, 4},
        {5, 6, 7, 8, 9},
        {10,11,12,13,14}
    };
    ```
    ::: 

    |  |  | 第0行 | 第1行 | 第2行 | 第3行 | 第4行 |
    | ----- | ----- | :---: | :---: | :---: | :---: | :---: |
    |  |  | num\[\]\[0\] | num\[\]\[1\] | num\[\]\[2\] | num\[\]\[3\] | num\[\]\[4\] |
    | 第0列 | num\[0\]\[\] | 0 | 1 | 2 | 3 | 4 |
    | 第1列 | num\[1\]\[\] | 5 | 6 | 7 | 8 | 9 |
    | 第2列 | num\[2\]\[\] | 10 | 11 | 12 | 13 | 14 |

    :::tip
    "單獨"作業的,無論 `cin` 或 `cout` 都是以單格來處理  
    e.g. `cin>>num[2][3];`(鍵入9)
    :::

    |  |  | 第0行 | 第1行 | 第2行 | 第3行 | 第4行 |
    | ----- | ----- | :---: | :---: | :---: | :---: | :---: |
    |  |  | num\[\]\[0\] | num\[\]\[1\] | num\[\]\[2\] | num\[\]\[3\] | num\[\]\[4\] |
    | 第0列 | num\[0\]\[\] | 0 | 1 | 2 | 3 | 4 |
    | 第1列 | num\[1\]\[\] | 5 | 6 | 7 | 8 | 9 |
    | 第2列 | num\[2\]\[\] | 10 | 11 | 12 | <span class="red_warning">9</span> | 14 |

### 常用範例：  
```cpp
//code 5-3
#include<iostream>
using namespace std;
int main()
{
    int col, row;
    while(cin >> col >> row)
    {
        int a[col] [row];
        for(int i = 0; i < col; i++)
            for(int j = 0; j < row; j++)
                cin >> a[i][j];

        for(int i = 0; i < col; i++)
        {
            for(int j = 0; j < row; j++)
            {
                cout << a[i][j] << " ";
            }
            cout << endl;
        }
    }
}
```
- 輸入： 
    ```cpp
    3 2
    1 2 3 4 5 6
    ```
- 輸出：  
    ```cpp
    1 2
    3 4
    5 6
    ```
## 5-4 多維陣列  
多維陣列的原理就跟一、二維一樣，以下是三維陣列簡單的圖示：  
![](/img/Beginner_textbook_pic/image18.png)  
三維陣列的宣告也是一樣，如：int a\[3\]\[4\]\[5\];  
當然你還可以宣告四維、五維……等多維陣列  
但三維以上結構就較為複雜，四維以上更是需要憑著想像去撰寫  
故在此僅提及並不多作介紹。  

## 5-5 字元陣列及字串  
先前所教的字元變數只能存放一個字元，若要存取大量的文字、句子等，將會十分不方便  
C語言提供了字元陣列的處理方式，C++則提供了字串的格式，各有優缺點，可依自己喜好或情況選擇使用  
### 字元陣列的定義及宣告
- C型態的定義  
    - 字元常數 用單引號包覆 e.g. `char c = 'i';`  
    - 字串常數 用雙引號包覆 e.g. `char c[] = "I love fdcs";`   
    - 字串常數的記憶體配置，則會在結尾部分加上**結束字元'\\0'**，同樣佔據一個記憶體位置，要注意(只要用雙引號包圍之字串，皆會加上\\0)  
        | I |  | l | o | v | e |  | f | d | c | s | \\0 |  
        | :---: | :---- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
    ```cpp
    char 字元陣列名稱[長度];
    char 字元陣列名稱[長度] = "字串常數";
    char 字元陣列名稱[] = "字串常數";
    char 字元陣列名稱[長度] = {'字元1', '字元2', '字元3'};
    ```
### 字元陣列的輸入
1. 使用cin的方式來輸入字元陣列:
    `cin>>str;`
    請注意,如果輸入的範圍字元陣列範圍超過定義的範圍,將有可能發生預期外的錯誤。
2. 使用cin.getline(),來輸入字元陣列:
    ```cpp
    char str[10];
    cin.getline(str, 10);
    ```
### **sizeof( )的用法**  
```cpp
//code 5-5
#include<iostream>
using namespace std;
int main()
{
    char str[] = "hello c++";
    cout << sizeof(str) << endl;
    string s = "hello c++";
    cout << sizeof(s) << endl;
    char str1[] = "hello fdcs";
    cout << sizeof(str1) << endl;
    string s1 = "hello fdcs";
    cout << sizeof(s1) << endl;
}
```
- 輸出：
    ```cpp
    10
    8
    11
    8
    ```

**`sizeof( )`** 是將該陣列所佔的記憶體大小輸出  
`char`每個字元皆佔一個位元組  
而`string`則是固定為 8Bytes  


## 5-6 C++型態的字串 String  
C++的字串型態功能與C型態的字元陣列類似，但有一個不錯的優勢，就是他不需要先行定義字串的長度，就可以輸入了。  
~~在使用string類別之前，請先引入標頭檔~~  
<span class="red_warning">更新:string類別可不用引入string函式庫即可使用</span>

- 宣告格式：
    ```
    string 字串名稱;
    string 字串名稱 = "字串內容";
    e.g. string str = "FDCS114\n\n";
    ```
    範例的\\n是 [跳脫字元](./Chapter2#2-7-跳脫字元的認識)  

    :::info[範例：]
    ```cpp
    // code 5-6
    #include<iostream>
    #include<string>
    using namespace std;
    int main()
    {
        string str0;
        str0 = "Hello C++";
        string str1 = "Hello FDCS";
        cout << stro << endl << str1 << endl;
        cout << str0.length() << " " << str1.length();
        cout << endl;
    }
    ```
    - 輸出：
        ```
        Hello C++
        Hello FDCS
        9 10
        ```
    :::
#### 程式碼重點
1. 其中的.length(),可以用來讀取 string 型態的長度,可以發現字串的長度皆是9,並沒有像c 字串一樣結束字元的存在。
    - 比較:若是使用sizeof(),則會輸出 string 所佔記憶體大小(8)
2. C++型態的特殊情況 cin.get();
    - 輸入格式
    字串的輸入法同樣也可以用cin方式,但同樣,遇到空格也會出現問題,因此可以使用getline(cin, str);的方式輸入有空格的句子。  

:::info[`cin`、`getline(cin,string)`兩者之間的差別]
```cpp
// code 5-6
#include<iostream>
#include<string>
using namespace std;
int main()
{
    string str0, str1;
    getline(cin, stre);
    cin >> str1;
    cout << str0 << endl;
    cout << str1 << endl;
}
```
- 輸入：
    ```
    Hello world
    Hello world
    ```
- 輸出：
    ```
    Hello world
    Hello
    ```
:::


下列範例程式，我們想要在輸入字串之前先輸入一個數字，但卻在輸入數字之後直接執行了剩下的程式。 
```cpp
// code 5-6
#include<iostream>
#include<string>
using namespace std;
int main()
{
    int n;
    cin >> n;
    string s;
    getline(cin, s);
    cout << n << " " << s << endl;
}
```
這個現象是因為，當我們輸入完5(或任何整數型態)時，enter鍵會附加一個\\n的字元，如同前面所述，會存入buffer(緩衝區)，並在下次呼叫字元時存入程式中，此時字串str存的值變成\\n，可以自行設計程式檢驗看看。

要解決這個問題，我們可以透過在`getline(cin,str);`前面加上`cin.get();`這個函式的意義是吸入一個字元(注意，**是單一字元**)並且儲存( )中的變數，若為空白，則不會存入任何位址而吃掉。故改變後的程式碼如下:

`cin.get()`這個函式不僅可以用在吸收多餘的字元，也可以拿來存取單一字元喔！
:::note[範例]
```cpp
// code 5-6
#include<iostream>
#include<string>
using namespace std;
int main()
{
    int n;
    cin >> n;
    string s;
    cin.get();
    getline(cin, s);
    cout << n << " " << s << endl;
}
```
- 輸入：
    ```
    5
    Hello World
    ```
- 輸出：
    ```
    5 Hello World
    ```
::: 
:::tip
字串同樣也可以寫成陣列型態,以同時存放多組句子  
例如: `string str[3];`  

:::note[範例]
```cpp
// code 5-6
#include<iostream>
#include<string>
using namespace std;
int main()
{
    string str[3];
    for(int i = 0 i < 3 i++)
        getline(cin, str[i]);
    for(int i = 0 i < 3 i++)
        cout << str[i] << endl;
    cout << str[2][5] << endl;
}
```
- 輸入：
    ```
    I love C++
    Hello World
    FDHSCPP
    ```
- 輸出：
    ```
    I love C++
    Hello World
    FDHSCPP
    P
    ```
:::