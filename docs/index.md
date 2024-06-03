---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Elva Hjärnceller
  text: Handcrafted Knowledge Base
  tagline: Learn the tech to excel in the cloud
  image: 
    src: ./assets/elva-log-transparent.png
    alt: Elva Logo
  actions:
    - theme: brand
      text: Onboarding 
      link: /onboarding/outline
    - theme: alt
      text: Containerization
      link: /containers/outline

features:
  - icon: 
      src: ./assets/lambda.svg
    title: Onboarding
    details: This course takes you through the most important parts about Serverless and the AWS services revolving around it. It includes important reading and a handfull of exercises.
    link: /onboarding/outline
  - icon: 
      src: ./assets/ecs.svg
    title: Containerization
    details: This course details the intricate and scary world of containerization. You'll learn about Docker and Kubernetes with exercises and quizes to keep you engaged.
    link: /containers/outline
---
