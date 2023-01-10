data "terraform_remote_state" "dns" {
  backend   = "s3"
  workspace = var.environment
  config = {
    bucket = "vcff-tf-backend"
    key    = "dns.tfstate"
    region = "us-east-2"
  }
}

data "aws_route53_zone" "zone" {
  name         = data.terraform_remote_state.dns.outputs.zone_name
  private_zone = false
}

resource "aws_route53_record" "a" {
  zone_id = data.aws_route53_zone.zone.id
  name    = ""
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "aaaa" {
  zone_id = data.aws_route53_zone.zone.id
  name    = ""
  type    = "AAAA"
  alias {
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_a" {
  zone_id = data.aws_route53_zone.zone.id
  name    = "www"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_aaaa" {
  zone_id = data.aws_route53_zone.zone.id
  name    = "www"
  type    = "AAAA"
  alias {
    name                   = aws_cloudfront_distribution.distribution.domain_name
    zone_id                = aws_cloudfront_distribution.distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
