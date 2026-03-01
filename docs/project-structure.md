# KiroSample - プロジェクト構造

## ディレクトリ構成

```
kirosample/                    # プロジェクトルート
│
├── app/                       # アプリケーション層
│   ├── data/                 # ビジネスデータ
│   │   ├── horoscopes.js    # 星座占いデータ
│   │   └── quotes.js        # 名言データ
│   ├── views/                # プレゼンテーション層
│   │   ├── layout.ejs       # 共通レイアウト
│   │   ├── portal.ejs       # ポータル画面
│   │   ├── date.ejs         # 日付画面
│   │   ├── horoscope.ejs    # 星座占い画面
│   │   ├── quote.ejs        # 名言画面
│   │   └── 404.ejs          # エラー画面
│   ├── public/               # 静的アセット
│   │   └── css/
│   │       └── common.css   # 共通スタイル
│   ├── index.js              # アプリケーションエントリーポイント
│   ├── package.json          # Node.js依存関係
│   ├── Dockerfile            # コンテナイメージ定義
│   ├── .dockerignore         # Docker除外設定
│   └── README.md             # アプリケーション説明
│
├── infrastructure/            # インフラストラクチャ層
│   ├── terraform/            # Infrastructure as Code
│   │   ├── main.tf          # プロバイダー設定
│   │   ├── variables.tf     # 変数定義
│   │   ├── outputs.tf       # 出力値
│   │   ├── vpc.tf           # ネットワーク
│   │   ├── security_groups.tf # セキュリティ
│   │   ├── alb.tf           # ロードバランサー
│   │   ├── ecs.tf           # コンテナオーケストレーション
│   │   ├── ecr.tf           # コンテナレジストリ
│   │   ├── autoscaling.tf   # オートスケーリング
│   │   ├── route_tables.tf  # ルーティング
│   │   └── terraform.tfvars.example # 設定例
│   └── README.md             # インフラ説明
│
├── .github/                   # CI/CD層
│   └── workflows/
│       └── deploy.yml        # 自動デプロイパイプライン
│
├── docs/                      # ドキュメント層
│   ├── aws-architecture.drawio      # AWS構成図
│   ├── architecture-overview.md     # アーキテクチャ概要
│   ├── deployment-guide.md          # デプロイ手順
│   └── project-structure.md         # このファイル
│
├── docker-compose.yml         # ローカル開発環境
├── .gitignore                 # Git除外設定
└── README.md                  # プロジェクト概要
```

## 責務の分離

### app/ - アプリケーション層
- **責務**: ビジネスロジック、UI、データ処理
- **技術**: Node.js, Express, EJS
- **独立性**: インフラから独立して開発・テスト可能

### infrastructure/ - インフラ層
- **責務**: AWS環境の構築・管理
- **技術**: Terraform, AWS
- **独立性**: アプリケーションから独立してデプロイ可能

### .github/ - CI/CD層
- **責務**: ビルド、テスト、デプロイの自動化
- **技術**: GitHub Actions
- **連携**: app/とinfrastructure/を橋渡し

### docs/ - ドキュメント層
- **責務**: 設計書、手順書、図表
- **形式**: Markdown, draw.io
- **対象**: 開発者、運用者

## ファイルの役割

### アプリケーション
- `app/index.js` - Expressサーバー、ルーティング
- `app/data/*.js` - 静的データ（星座、名言）
- `app/views/*.ejs` - HTMLテンプレート
- `app/public/css/*.css` - スタイルシート

### インフラ
- `infrastructure/terraform/*.tf` - AWS リソース定義
- `infrastructure/terraform/terraform.tfvars` - 環境固有設定

### CI/CD
- `.github/workflows/deploy.yml` - デプロイパイプライン

## 開発フロー

```
1. ローカル開発
   app/ で開発 → docker-compose.yml でテスト

2. コミット・プッシュ
   git push origin main

3. 自動デプロイ
   .github/workflows/deploy.yml が実行
   ↓
   app/Dockerfile でビルド
   ↓
   ECRにプッシュ
   ↓
   ECS Fargateにデプロイ
```

## 利点

1. **関心の分離**: アプリとインフラが明確に分離
2. **独立開発**: 各層を独立して開発・テスト可能
3. **再利用性**: app/は他のインフラでも利用可能
4. **保守性**: 変更の影響範囲が明確
5. **スケーラビリティ**: 各層を独立してスケール可能

## 命名規則

- **ディレクトリ**: 小文字、ハイフン区切り
- **ファイル**: 小文字、アンダースコア区切り（Terraform）
- **変数**: スネークケース（Terraform）
- **関数**: キャメルケース（JavaScript）
