## 環境構築

### 1.以下のコマンドでViteのプロジェクトを作成→使用技術をReact + TypeScript + SWC
```
npm create vite@latest
```

https://vitejs.dev/guide/

### 2.下記のコマンドでSass導入
```
npm install -D sass
```

### 3.GitHubPages自動化ライブラリを導入
```
npm install gh-pages --save-dev
```

### 4.package.jsonにスクリプトを追加
```
   "scripts": {
     "dev": "vite",
     "build": "tsc && vite build",
+    "deploy": "gh-pages -d dist",
     "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
     "preview": "vite preview"
   },
```

### 5.viteの設定ファイルでbaseを設定
```
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/product-name/',
})
```
### 6.GitHubでリポジトリを作成
https://github.com/new

### 7.GitHubPagesの設定画面でBranchを編集
[![Image from Gyazo](https://i.gyazo.com/252481888e53f72eceecc15db452f578.png)](https://gyazo.com/252481888e53f72eceecc15db452f578)

## CodeRabbit導入
yamlファイルで設定。

https://coderabbit.ai/
