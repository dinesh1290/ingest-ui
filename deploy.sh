#!/usr/bin/env bash
# Build the client
cd client
npm install
ng build --prod
# Build and run the install script
cd ..
npm install
serverless client deploy -v
# Configure CloudFront support in aws-cli
aws configure set preview.cloudfront true
# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E1GC8ZIY6A9571 --paths /*