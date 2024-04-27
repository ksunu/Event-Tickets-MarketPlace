# Events Ticketing MarketPlace app 📌

E-Commerce app using Microservices built with Node, React, Docker and Kubernetes.

A challenging approach to architecting a multi-service app. The main focus has been to develop different services praticing patterns to create scalable collection of microservices built in a Server Side Rendering React application. Learning best practices from communicating between different services to configuring and scaling services using Kubernetes Deployments. Implementing Optimistic Concurrency Control to solve issues.

## Project description 📓

It is a Stubhub like ticket management application where user can sign-up, sign-in, sing-out, create new tickets, order tickets and pay ordered tickets. Once an ordered is placed, the user has 60 seconds to process the payment or else the order will be cancelled. The Frontend of the project has been developed with the minimum requirements in order to test the complex microservice architecture.

## Developed 🛠️

- Each service is created with <b>Node</b> and <b>Express</b>,
- Data service held in <b>Mongo</b> or <b>Redis</b>,
- Deployed and running in <b>Docker</b> containers executed in <b>Kubernetes</b>,
- Written in <b>Typescript</b>,
- Frontend with <b>React</b> and <b>Next</b>,
- Payment processed using <b>Stripe</b>,
- Testing with <b>Jest</b> and <b>Supertest</b>,
- Used <b>Json Web Token</b> for secured user identification,
- Basic design with <b>Bootstrap</b>.

## Install and Run 🔧

If you wish to
Install the following in order to run the project:
[Docker](https://www.docker.com/products/docker-desktop/), [Kubernetes](https://kubernetes.io/releases/download/), [Ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/), [Skaffold](https://skaffold.dev/docs/install/#managed-ide)

Before running you will need to:

1. build docker images and push them into your Docker context (auth, client, expiration, orders, payments and tickets)
2. generate your own 2 secrets in k8s with

- name: jwt-secret,<br>
  key: JWT_KEY
- name: stripe-secret,<br>
  key: STRIPE_KEY

3. when correctly configured, in th root of the project run skaffold

```
- Run 'skaffold dev'
```
