# KiroSample

日付、星座占い、偉人の名言を表示するWebアプリケーション。

## 機能

- 📅 今日の日付表示
- ⭐ 星座占い（日替わり・選択可能）
- 💭 偉人の名言（日替わり・ランダム表示）

## プロジェクト構造

```
kirosample/
├── app/                      # アプリケーションコード
│   ├── data/                # データファイル
│   ├── views/               # EJSテンプレート
│   ├── public/              # 静的ファイル
│   ├── index.js             # メインアプリケーション
│   ├── package.json         # 依存関係
│   ├── Dockerfile           # コンテナイメージ
│   └── README.md            # アプリ詳細
├── infrastructure/           # インフラストラクチャコード
│   ├── terraform/           # Terraformコード
│   └── README.md            # インフラ詳細
├── .github/                 # CI/CDパイプライン
│   └── workflows/
│       └── deploy.yml       # 自動デプロイ
├── docs/                    # ドキュメント
│   ├── aws-architecture.drawio
│   ├── architecture-overview.md
│   └── deployment-guide.md
├── docker-compose.yml       # ローカル開発環境
├── .gitignore
└── README.md                # このファイル
```

## クイックスタート

### ローカル開発

```bash
# Dockerを使用
docker-compose up --build

# または直接実行
cd app
npm install
npm start
```

http://localhost:3000 でアクセス

### AWSへのデプロイ

```bash
# インフラ構築
cd infrastructure/terraform
terraform init
terraform apply

# 自動デプロイ（GitHub Actions）
git push origin main
```

詳細は各ディレクトリのREADMEを参照してください。

## 技術スタック

### アプリケーション
- Node.js 18
- Express 4.18
- EJS 3.1
- Docker

### インフラストラクチャ
- AWS ECS Fargate
- Application Load Balancer
- Amazon ECR
- CloudWatch Logs
- Terraform
- GitHub Actions

## ドキュメント

- [アプリケーション詳細](app/README.md)
- [インフラストラクチャ詳細](infrastructure/README.md)
- [アーキテクチャ概要](docs/architecture-overview.md)
- [デプロイメントガイド](docs/deployment-guide.md)
- [AWS構成図](docs/aws-architecture.drawio)

## GitHubリポジトリ

https://github.com/naohirohirata0123/KiroSample

## コスト見積もり

AWS環境: 月額約$82（東京リージョン）

## ライセンス

ISC

## 作成者

naohirohirata0123
