# KiroSample - Infrastructure

AWS ECS Fargate上でKiroSampleを実行するためのインフラストラクチャコード。

## 前提条件

- AWS CLI設定済み
- Terraform 1.0以上
- 適切なAWS権限

## セットアップ

### 1. 変数ファイルの作成

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
```

`terraform.tfvars`を編集：

```hcl
aws_region = "ap-northeast-1"
project_name = "kirosample"
container_image = "123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/kirosample:latest"
```

### 2. Terraformの初期化

```bash
terraform init
```

### 3. プランの確認

```bash
terraform plan
```

### 4. インフラのデプロイ

```bash
terraform apply
```

## 構成

### ネットワーク
- VPC (10.0.0.0/16)
- Public Subnets × 2
- Private Subnets × 2
- Internet Gateway
- NAT Gateway

### コンピューティング
- ECS Cluster (Fargate)
- ECS Service
- ECS Task Definition

### ロードバランシング
- Application Load Balancer
- Target Group

### その他
- ECR Repository
- CloudWatch Logs
- Auto Scaling

## コスト見積もり

月額約$82（東京リージョン）:
- ALB: $16
- ECS Fargate (2タスク): $30
- NAT Gateway: $32
- その他: $4

## 出力値

```bash
terraform output
```

- `alb_dns_name` - ALBのDNS名
- `ecr_repository_url` - ECRリポジトリURL
- `ecs_cluster_name` - ECSクラスター名

## クリーンアップ

```bash
terraform destroy
```

## トラブルシューティング

### タスクが起動しない

```bash
aws ecs describe-services \
  --cluster kirosample-cluster \
  --services kirosample-service
```

### ログの確認

```bash
aws logs tail /ecs/kirosample --follow
```
