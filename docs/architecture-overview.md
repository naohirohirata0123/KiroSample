# KiroSample - AWS ECS Fargate Architecture

## アーキテクチャ概要

このドキュメントでは、KiroSampleアプリケーションをAWS ECS Fargateで構築する際のアーキテクチャを説明します。

## 構成図

`aws-architecture.drawio` ファイルをdraw.ioで開いて確認してください。

## コンポーネント説明

### 1. ネットワーク層

#### VPC (Virtual Private Cloud)
- CIDR: 10.0.0.0/16
- 2つのAvailability Zone (AZ)で高可用性を実現

#### Internet Gateway
- VPCとインターネット間の通信を可能にする

#### Public Subnets (2つ)
- 10.0.1.0/24 (AZ: ap-northeast-1a)
- 10.0.2.0/24 (AZ: ap-northeast-1c)
- ALBとNAT Gatewayを配置

#### Private Subnets (2つ)
- 10.0.11.0/24 (AZ: ap-northeast-1a)
- 10.0.12.0/24 (AZ: ap-northeast-1c)
- ECS Fargateタスクを配置
- インターネットからの直接アクセス不可

### 2. ロードバランシング層

#### Route 53
- DNSサービス
- ドメイン名をALBに解決

#### Application Load Balancer (ALB)
- HTTPSトラフィックを受信
- 複数のECSタスクに負荷分散
- ヘルスチェック機能
- SSL/TLS証明書の終端

### 3. コンピューティング層

#### ECS Cluster
- Fargateタスクを管理

#### ECS Tasks (Fargate)
- 各AZに最低1つずつ配置
- 自動スケーリング対応
- サーバーレスコンテナ実行環境

#### Containers
- Node.js + Express
- KiroSampleアプリケーション
- ポート3000で待ち受け

### 4. コンテナレジストリ

#### ECR (Elastic Container Registry)
- Dockerイメージを保存
- ECSタスクがイメージをプル

### 5. 監視・ログ

#### CloudWatch Logs
- コンテナのログを収集
- アプリケーションログ
- エラーログ

#### CloudWatch Metrics
- CPU使用率
- メモリ使用率
- リクエスト数
- レスポンスタイム

### 6. データベース (将来)

#### RDS / Aurora
- プライベートサブネットに配置
- マルチAZ構成
- 自動バックアップ

## トラフィックフロー

1. ユーザー → Route 53
2. Route 53 → ALB (Public Subnet)
3. ALB → ECS Tasks (Private Subnet)
4. ECS Tasks → アプリケーション処理
5. ECS Tasks → (将来) RDS

## セキュリティ

### Security Groups

#### ALB Security Group
- Inbound: 443 (HTTPS) from 0.0.0.0/0
- Outbound: 3000 to ECS Security Group

#### ECS Security Group
- Inbound: 3000 from ALB Security Group
- Outbound: 443 to Internet (for ECR pull)

#### RDS Security Group (将来)
- Inbound: 5432/3306 from ECS Security Group
- Outbound: なし

## スケーリング

### Auto Scaling設定
- 最小タスク数: 2
- 最大タスク数: 10
- スケーリングメトリクス:
  - CPU使用率 > 70%
  - メモリ使用率 > 80%

## コスト見積もり

### 月額コスト (東京リージョン)

| サービス | 仕様 | 月額 |
|---------|------|------|
| ALB | 常時稼働 | $16 |
| ECS Fargate | 1vCPU, 2GB × 2タスク | $30 |
| NAT Gateway | 1つ | $32 |
| ECR | 10GB | $1 |
| CloudWatch Logs | 5GB | $2.5 |
| Route 53 | 1ホストゾーン | $0.5 |
| **合計** | | **$82/月** |

### データベース追加時
| サービス | 仕様 | 月額 |
|---------|------|------|
| Aurora Serverless v2 | 0.5-2 ACU | $30-120 |
| **合計** | | **$112-202/月** |

## 次のステップ

1. draw.ioファイルを開いて構成図を確認
2. AWSアカウントの準備
3. Terraformまたは手動でインフラ構築
4. CI/CDパイプラインの構築

## ファイル

- `aws-architecture.drawio` - 構成図（draw.ioで開く）
