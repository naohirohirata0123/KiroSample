# KiroSample - Application

日付、星座占い、偉人の名言を表示するWebアプリケーション。

## ローカル開発

### Dockerを使用する場合

```bash
# ルートディレクトリから
docker-compose up --build
```

### ローカルで実行する場合

```bash
cd app
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
app/
├── data/              # データファイル
│   ├── horoscopes.js # 星座占いデータ
│   └── quotes.js     # 名言データ
├── public/            # 静的ファイル
│   └── css/
│       └── common.css
├── views/             # EJSテンプレート
│   ├── layout.ejs
│   ├── portal.ejs
│   ├── date.ejs
│   ├── horoscope.ejs
│   ├── quote.ejs
│   └── 404.ejs
├── index.js           # メインアプリケーション
├── package.json       # 依存関係
├── Dockerfile         # コンテナイメージ
└── .dockerignore      # Docker除外設定
```

## 技術スタック

- Node.js 18
- Express 4.18
- EJS 3.1
- Docker

## 環境変数

現在は環境変数不要（将来的にDB接続情報など）

## テスト

```bash
npm test
```

## ビルド

```bash
docker build -t kirosample .
```
