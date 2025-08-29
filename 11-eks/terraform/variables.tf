variable "profile" {
  type        = string
  description = "The AWS profile to use"
  default     = "admin-study"
}

variable "region" {
  type        = string
  description = "The AWS region to deploy the resources"
  default     = "eu-central-1"
}
