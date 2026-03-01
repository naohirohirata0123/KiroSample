# KiroSample - Application

日付、星座占い、偉人の名言を表示し、お気に入り機能を持つWebアプリケーション。

## 機能

### 基本機能
- 📅 **今日の日付表示** - 日本語形式で現在の日付を表示
- ⭐ **星座占い** - 12星座の日替わり占い、ドロップダウンで選択可能
- 💭 **偉人の名言** - 日替わり表示、ランダム表示ボタン付き

### お気に入り機能（データベース連携）
- ❤️ **お気に入り追加** - 名言・星座占いをワンクリックで保存
- 📊 **統計情報** - タイプ別の保存数といいね数を表示
- 🔍 **フィルタリング** - 全て/名言/星座占いで絞り込み
- 🗑️ **削除機能** - 不要なお気に入りを削除
- 👍 **いいね機能** - 同じ内容を追加するといいね数が増加

## ローカル開発

### 開発モード（推奨）

```bash
# ルートディレクトリから
docker-compose -f docker-compose.dev.yml up --build
```

コード変更が自動的に反映されます（nodemon使用）。

### 本番モード

```bash
# ルートディレクトリから
docker-compose up --build
```

### ローカルで直接実行

```bash
cd app
npm install

# PostgreSQLが必要
# DATABASE_URL環境変数を設定
export DATABASE_URL=postgresql://kirosample:password@localhost:5432/kirosample

npm start
```

アプリケーションは http://localhost:3000 で起動します。

## データベース

### 使用技術
- PostgreSQL 15
- node-postgres (pg) 8.11

### テーブル構造

```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20) NOT NULL,           -- 'quote' or 'horoscope'
  content TEXT NOT NULL,                -- 名言または占い内容
  author VARCHAR(255),                  -- 著者または星座名
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  likes INTEGER DEFAULT 1               -- いいね数
);

CREATE INDEX idx_favorites_type ON favorites(type);
CREATE INDEX idx_favorites_created_at ON favorites(created_at DESC);
```

### データベース操作

```bash
# データベースに接続
docker-compose exec db psql -U kirosample -d kirosample

# お気に入り一覧を表示
docker-compose exec db psql -U kirosample -d kirosample -c "SELECT * FROM favorites;"

# テーブル構造を確認
docker-compose exec db psql -U kirosample -d kirosample -c "\d favorites"
```

## プロジェクト構造

```
app/
├── data/              # データファイル
│   ├── horoscopes.js # 星座占いデータ（12星座）
│   └── quotes.js     # 名言データ（10件）
├── public/            # 静的ファイル
│   └── css/
│       └── common.css # 共通スタイル
├── views/             # EJSテンプレート
│   ├── layout.ejs    # 共通レイアウト
│   ├── portal.ejs    # ポータル画面
│   ├── date.ejs      # 日付画面
│   ├── horoscope.ejs # 星座占い画面
│   ├── quote.ejs     # 名言画面
│   ├── favorites.ejs # お気に入り一覧画面
│   └── 404.ejs       # エラー画面
├── db.js              # データベース接続・操作
├── index.js           # メインアプリケーション
├── package.json       # 依存関係
├── Dockerfile         # コンテナイメージ
└── .dockerignore      # Docker除外設定
```

## API エンドポイント

### お気に入り関連

```
POST   /api/favorites        お気に入り追加
DELETE /api/favorites/:id    お気に入り削除
GET    /favorites            お気に入り一覧画面
```

### ページ

```
GET /                  ポータル画面
GET /date              日付画面
GET /horoscope         星座占い画面
GET /quote             名言画面
```

## 技術スタック

- **Runtime**: Node.js 18
- **Framework**: Express 4.18
- **Template Engine**: EJS 3.1
- **Database**: PostgreSQL 15
- **Database Client**: node-postgres (pg) 8.11
- **Container**: Docker

## 環境変数

```bash
# データベース接続
DATABASE_URL=postgresql://kirosample:password@db:5432/kirosample

# アプリケーション設定
NODE_ENV=development  # または production
PORT=3000
```

## 依存関係

### 本番依存関係
```json
{
  "ejs": "^3.1.9",
  "express": "^4.18.2",
  "pg": "^8.11.3"
}
```

### 開発依存関係
```json
{
  "nodemon": "^3.0.1"
}
```

## ビルド

```bash
# Dockerイメージのビルド
docker build -t kirosample .

# キャッシュなしでビルド
docker build --no-cache -t kirosample .
```

## トラブルシューティング

### データベース接続エラー

```
Error: connect ECONNREFUSED
```

**原因**: データベースの起動が遅い  
**解決**: 数秒待つと自動的に再接続されます

### 404エラー（API）

**原因**: ルーティング順序の問題  
**確認**: 404ハンドラーが全てのルートの最後に定義されているか確認

### お気に入りが追加できない

1. データベースが起動しているか確認
2. ブラウザの開発者ツールでエラーを確認
3. サーバーログを確認: `docker-compose logs app`

## パフォーマンス

- データベース接続プーリング（最大20接続）
- インデックス最適化（type, created_at）
- 重複チェックによるデータ削減

## セキュリティ

- SQLインジェクション対策（パラメータ化クエリ）
- XSS対策（EJSの自動エスケープ）
- 環境変数による機密情報管理

## 今後の拡張案

- [ ] ユーザー認証機能
- [ ] コメント機能
- [ ] ソーシャルシェア機能
- [ ] 検索機能
- [ ] ページネーション
- [ ] APIレート制限
- [ ] キャッシング（Redis）

