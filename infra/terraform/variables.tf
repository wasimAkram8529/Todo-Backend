

variable "aws-region" {
  type = string
}

variable "tags" {
  type = map(string)
  default = {
    "Name" = "tf-backend-instance"
    "env"  = "staging"
  }
}