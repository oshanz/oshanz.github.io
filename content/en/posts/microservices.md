+++
author = "Oshan Wisumperuma"
title = "Microservices Why and Why Not"
date = "2023-01-12"
description = "Microservices Why and Why Not"
tags = [
    "Microservices",
    "Monolith",
    "Service Oriented Architecture"
]
draft = true
+++

## Why

- different teams/squads can work on different services
- services can be optimized for specific workload (API, batch, etc.) (Memory optimized servers, CPU optimized servers, etc.)
- services will be able tp deploy independently with minimal downtime

## Why Not

- its hard to maintain
    - distributed transactions
    - distributed logging, tracing and monitoring
    - deployment is complex

- more attack surface
    - many dependencies to update
    - more things to secure (variables, secrets, etc.)

- network latency can affect the performance

-  it can slow down the development process
    - not seasy to setup a dev environment
    - intergration testing is hard
    - need to make sure the new version of the service is compatible with the old version of the services that depend on it
    - debudding may need extra effort


## what are the solutions

- start with monolith and move to microservices when you need to
- develop as a monolith and deploy as a tuned services for specific workload