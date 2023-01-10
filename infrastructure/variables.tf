variable "environment" {
  type    = string
  default = "dev"
}

variable "env" {
  type    = list(map(string))
  default = []
}

variable "instance_count" {
  type    = number
  default = 1
}

variable "api_origin" {
  type    = string
  default = "api.pond.dev"
}
