provider "aws" {
  access_key = "AKIAJKBMQWUTK6W5ZXZA"
  secret_key = "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"
  region     = "ap-southeast-1"
}

# Staging
resource "aws_s3_bucket" "frontend-stg" {
  bucket = "paperworkph-frontend-stg"
  acl    = "public-read"
  policy = "${file("policies/staging/s3-paperworkph-frontend.json")}"

  website { 
    index_document = "index.html"
    error_document = "index.html"
  }
}

# Production
resource "aws_s3_bucket" "frontend-prod" {
  bucket = "paperworkph-frontend"
  acl    = "public-read"
  policy = "${file("policies/production/s3-paperworkph-frontend.json")}"

  website { 
    index_document = "index.html"
    error_document = "index.html"
  }
}

locals {
  s3_origin_id = "S3-paperworkph-frontend-prod"
}

resource "aws_cloudfront_distribution" "frontend-prod-distribution" {
  origin {
    domain_name = "${aws_s3_bucket.frontend-prod.bucket_regional_domain_name}"
    origin_id   = "${local.s3_origin_id}"
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.s3_origin_id}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Cache behavior with precedence 0
  ordered_cache_behavior {
    path_pattern     = "/content/immutable/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "${local.s3_origin_id}"

    forwarded_values {
      query_string = false
      headers      = ["Origin"]

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

  # Cache behavior with precedence 1
  ordered_cache_behavior {
    path_pattern     = "/content/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.s3_origin_id}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_All"

  tags {
    Environment = "production"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
