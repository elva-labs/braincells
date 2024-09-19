---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Elva Braincells
  text: Handcrafted Knowledge Base
  tagline: Learn the tech to excel in the cloud
  image: 
    src: ./assets/elva-logo-transparent.png
    alt: Elva Logo
  actions:
    - theme: brand
      text: Start Here 
      link: /serverless-aws/outline
    - theme: alt
      text: Serverless Challenges
      link: /serverless-challenges/outline

features:
  - icon: 
      src: ./assets/lambda.svg
    title: Serverless on AWS
    details: This course takes you through the most important parts about Serverless and the AWS services revolving around it. It includes important reading and a handfull of exercises.
    link: /serverless-aws/outline
  - icon: 
      src: ./assets/dynamodb.svg
    title: Serverless Challenges
    details: Learn about and try to face some of the common challenges we see in the AWS space. This is a collection of common architectural challenges our developers face every day.
    link: /serverless-challenges/outline
  - icon: 
      src: ./assets/ecs.svg
    title: Containerization
    details: This course details the intricate and scary world of containerization. You'll learn about Docker and Kubernetes with exercises and quizes to keep you engaged.
    link: /containers/outline
---
