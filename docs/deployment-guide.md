# KiroSample - AWS自動デプロイメントガイド

## 概要

このガイドでは、TerraformとGitHub Actionsを使用してKiroSampleをAWS ECS Fargateに自動デプロイする方法を説明します。

## 前提条件

- AWSアカウント
- AWS CLI設定済み
- Terraform 1.0以上
- GitHubアカウント
- Docker

## セットアップ手順

### 1. AWS認証情報の設定

```bash
aws configure
```

### 2. Terraformの初期化

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# terraform.tfvarsを編集
terraform init
```

### 3. インフラのデプロイ

```bash
# プランの確認
terraform plan

# 適用
terraform apply
```

### 4. ECRにDockerイメージをプッシュ

```bash
# ECR URLを取得
ECR_URL=$(terraform output -raw ecr_repository_url)

# ECRにログイン
aws ecr get-login-password --region ap-northeast-1 | \
  docker login --username AWS --password-stdin $ECR_URL

# イメージをビルド
docker build -t kirosample .

# タグ付け
docker tag kirosample:latest $ECR_URL:latest

# プッシュ
docker push $ECR_URL:latest
```

### 5. GitHub Secretsの設定

GitHubリポジトリの Settings > Secrets and variables > Actions で以下を追加：

- `AWS_ACCESS_KEY_ID`: AWSアクセスキー
- `AWS_SECRET_ACCESS_KEY`: AWSシークレットキー

### 6. 自動デプロイの有効化

mainブランチにプッシュすると自動的にデプロイされます。

```bash
git add .
git commit -m "Add Terraform and CI/CD"
git push origin main
```

## ファイル構成

```
terraform/
├── main.tf              # プロバイダー設定
├── variables.tf         # 変数定義
├── outputs.tf           # 出力値
├── vpc.tf              # VPC、サブネット
├── security_groups.tf  # セキュリティグループ
├── alb.tf              # ロードバランサー
├── ecs.tf              # ECSクラスター、サービス
├── ecr.tf              # コンテナレジストリ
├── autoscaling.tf      # オートスケーリング
└── route_tables.tf     # ルートテーブル

.github/workflows/
└── deploy.yml          # CI/CDパイプライン
```

## コスト見積もり

月額約$82（東京リージョン）:
- ALB: $16
- ECS Fargate: $30
- NAT Gateway: $32
- その他: $4

## トラブルシューティング

### デプロイが失敗する

```bash
# ログを確認
aws ecs describe-services \
  --cluster kirosample-cluster \
  --services kirosample-service

# タスクログを確認
aws logs tail /ecs/kirosample --follow
```

### コンテナが起動しない

```bash
# タスク定義を確認
aws ecs describe-task-definition \
  --task-definition kirosample
```

## クリーンアップ

```bash
cd terraform
terraform destroy
```

## 次のステップ

1. Route 53でドメイン設定
2. ACMでSSL証明書取得
3. RDS/Auroraの追加
4. CloudFrontの追加
