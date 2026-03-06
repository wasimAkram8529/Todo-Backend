

output "tf-backend-sg-id" {
  value = aws_security_group.tf-backend-sg["tf-frontend-sg"].id
}

output "tf-alb-sg-id" {
  value = aws_security_group.tf-backend-sg["tf-alb-sg"].id
}