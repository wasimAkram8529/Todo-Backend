provider "aws" {
  region = "us-east-1"
}

module "tf-vpc" {
  source = "./modules/vpc"
}

module "tf-backend-sg" {
  source = "./modules/sg"
  tf-vpc-id = module.tf-vpc.tf-vpc-id
}

module "tf-backend-instance" {
  source = "./modules/instances"
  subnet_id = module.tf-vpc.tf-subnet-id[0]
  tf-backend-sg-id = module.tf-backend-sg.tf-backend-sg-id
}