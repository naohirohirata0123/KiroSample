terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    # バックエンド設定は後で追加
    # bucket = "your-terraform-state-bucket"
    # key    = "kirosample/terraform.tfstate"
    # region = "ap-northeast-1"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "KiroSample"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}
