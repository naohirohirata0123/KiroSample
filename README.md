# KiroSample

日付、星座占い、偉人の名言を表示するWebアプリケーションです。

## 機能

- 📅 今日の日付表示
- ⭐ 星座占い（日替わり）
- 💭 偉人の名言（日替わり）

## 技術スタック

- Node.js
- Express
- EJS (テンプレートエンジン)
- Docker

## 使い方

### Dockerを使用する場合

```bash
docker-compose up --build
```

### ローカルで実行する場合

```bash
npm install
npm start
```

### 開発モード（ホットリロード）

```bash
npm run dev
```

アプリケーションは http://localhost:3000 で起動します。

## プロジェクト構造

```
.
├── data/              # データファイル
├── public/            # 静的ファイル（CSS等）
├── views/             # EJSテンプレート
├── index.js           # メインアプリケーション
├── package.json
├── Dockerfile
└── docker-compose.yml
```
