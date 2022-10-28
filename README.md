## [ 1028 ] 新增 ChooseTemplate.js

### ChooseTemplate.js

`用來決定影片模板順序，用來跟 Change.js 得到的詳解步驟做區分`

`在選擇到 combineTemplate 時，可以決定 "sequence" 或 "pos - neg" 兩種 solveType`

### **⚠️使用警告⚠️**

1. 目前只有在化簡方式為 `COLLECT_AND_COMBINE_LIKE_TERMS, SIMPLIFY_ARITHMETIC, SIMPLIFY_FRACTION` 時，才會做影片模板的選擇
2. 分數化簡不是整數時，目前先忽略選擇模板的動作

## 系統運行需求

### Node.js：

- mathsteps 套件需要在 Node.js 環境下使用（版本 > 6.0.0）
- Node.js [官網](https://nodejs.org/en/)，以及[安裝教學](https://phoenixnap.com/kb/install-node-js-npm-on-windows)

## Node.js 套件：

1. mathsteps
    
    `npm install mathsteps`
    
    數學逐步解題工具
    

## 文件說明：

以下說明是按照他的依賴順序編排的。

### NodeType.js

`用於確定 math.js 節點的類型`

### Change.js

`根據步驟的化簡方式決定解釋文字還有影片模板的選擇`

### test.js

`根據輸入的數學題目，產生逐步解題的過程，並將過程與影片模板順序分別以 .txt 檔儲存`

### StepsText.txt

`儲存逐步解題過程`

### CommandTextList.txt

`儲存影片模板的順序`

## 使用方式：

### 執行方式：

執行方法建議是直接在終端機輸入：

`node test.js`

### 輸入參數：

數學題目的輸入請於 `test.js` 程式碼中的 `input` 參數更改

```jsx
const input = "題目";
```

## **⚠️使用警告⚠️**

1. 目前只有在化簡方式為 `SIMPLIFY_ARITHMETIC` 時，才會做影片模板的選擇
2. mathsteps 套件對 `'+', '-'` 的解釋文字都是 combine，因此目前在選擇模板時都先以選擇加法模板為主
3. 遇到 `'/'` 時，無論是整除還是可約分的情況，mathsteps 都會產生以化簡分數的解釋文字，其餘情況則是以分數的相關來解釋，因此除法模板基本上不會被選擇到