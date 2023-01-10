terraform {
  backend "s3" {
    bucket = "vcff-tf-backend"
    key    = "pond-next-app.tfstate"
    region = "us-east-2"
  }
}

provider "aws" {
  region = "us-east-2"
}

# Resolve target VPC
data "terraform_remote_state" "vcff_app" {
  backend   = "s3"
  workspace = var.environment
  config = {
    bucket = "vcff-tf-backend"
    key    = "vcff-app.tfstate"
    region = "us-east-2"
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

# resource "aws_secretsmanager_secret" "m2m_secret" {
#   name = "${var.environment}-pond-next-app-m2m-secret"
# }

module "ecs" {
  source = "git@github.com:UrgentCareKids/terraform-modules.git//aws-ecs-app"

  name = "pond-next-app"
  # image                    = data.terraform_remote_state.ci.outputs.registration_repository_url
  image                    = "107635001951.dkr.ecr.us-east-2.amazonaws.com/gsh/${var.environment}/pond-next-app"
  environment              = var.environment
  ecs_cluster_name         = "${var.environment}-vcff-app"
  vpc_id                   = data.terraform_remote_state.vcff_app.outputs.vpc_id
  port                     = 3000
  task_definition_template = "task_definition.tmpl"

  app_count = var.instance_count

  env = var.env
}
