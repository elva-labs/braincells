---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Elva Braincells
  text: Handcrafted Knowledge Base
  tagline: Learn the ways to excel in the cloud
  image: 
    src: ./assets/elva-logo-outline.svg
    alt: Elva Logo
  actions:
    - theme: brand
      text: Start Here 
      link: /serverless-aws/outline
    - theme: alt
      text: Serverless Challenges
      link: /serverless-challenges

features:
  - title: What is this?
    icon:
      src: ./assets/elva-yellow.png
      width: 130
    details: Elva Braincells is a free learning resource provided by Elva, a collection of serverless experts specializing on AWS.
    linkText: Our website
    link: https://elva-group.com/
  - title: Serverless on AWS
    icon: 
      src: ./assets/lambda.svg
    details: This course takes you through the most important parts about Serverless and the AWS services revolving around it. It includes important reading and a handfull of exercises.
    linkText: Learn the basics
    link: /serverless-aws/outline
  - title: Serverless Challenges
    icon: 
      src: ./assets/dynamodb.svg
    details: Learn about and try to face some of the common challenges we see in the AWS space. This is a collection of common architectural challenges our developers face every day.
    linkText: Challenge yourself
    link: /serverless-challenges
---
