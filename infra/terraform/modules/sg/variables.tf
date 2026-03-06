variable "tf-vpc-id" {
  
}

variable "backend-allowed-ingress-port" {
  type = map(list(number))

  default = {
    tf-frontend-sg = [22, 80]
    tf-alb-sg = [80]
  }
}
