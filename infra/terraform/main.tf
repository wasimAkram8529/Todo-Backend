# terraform {
#   backend "s3" {
#   }
# }

provider "aws" {
  region = var.aws-region
}

data "aws_vpcs" "vpcs" {
}

data "aws_subnet" "public-subnet-A" {
  filter {
    name   = "tag:Name"
    values = ["PublicSubnetA"]
  }
}

# module "tf-vpc" {
#   source = "./modules/vpc"
# }

module "tf-backend-sg" {
  source = "./modules/sg"
  tf-vpc-id = data.aws_vpcs.vpcs.ids[0]
}

module "tf-backend-instance" {
  source = "./modules/instances"
  subnet_id = data.aws_subnet.public-subnet-A.id
  tf-backend-sg-id = module.tf-backend-sg.tf-backend-sg-id
  tags = var.tags
}