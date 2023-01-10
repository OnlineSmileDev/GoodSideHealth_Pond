data "aws_acm_certificate" "main_cert" {
  provider = aws.us_east_1
  domain   = data.aws_route53_zone.zone.name
}

locals {
  fe_alb_origin_id  = "ALBOrigin-${module.ecs.load_balancer_dns_name}"
  api_alb_origin_id = "ALBOrigin-${var.api_origin}"
}

# CloudFront CDN responsible for website hosting
resource "aws_cloudfront_distribution" "distribution" {
  # Next.js / Frontend
  origin {
    domain_name = module.ecs.load_balancer_dns_name
    origin_id   = local.fe_alb_origin_id

    custom_origin_config {
      origin_protocol_policy = "http-only" # ALB is not responsible for SSL termination
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # Pond API Origin
  origin {
    domain_name = var.api_origin
    origin_id   = local.api_alb_origin_id

    custom_origin_config {
      origin_protocol_policy = "https-only" # ALB is not responsible for SSL termination
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # Default behavior is to point to frontend distribution
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = local.fe_alb_origin_id
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false
      cookies {
        forward = "all"
      }
    }
  }

  # Pond API Cache behavior
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = local.api_alb_origin_id

    // Forward all additional HTTP fragments on to origin
    forwarded_values {
      query_string = true
      headers      = ["*"]

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    ssl_support_method  = "sni-only"
    acm_certificate_arn = data.aws_acm_certificate.main_cert.arn
  }

  aliases         = [data.aws_route53_zone.zone.name, "www.${data.aws_route53_zone.zone.name}"]
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_100"
  # wait_for_deployment = false # Skip InProgress -> Deployed verification.

  tags = {
    Environment = var.environment
  }
}

output "frontend_domain_name" {
  value = aws_cloudfront_distribution.distribution.domain_name
}

output "frontend_domain_aliases" {
  value = aws_cloudfront_distribution.distribution.aliases
}
