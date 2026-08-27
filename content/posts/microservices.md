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

- Different teams/squads can work on different services
- Services can be optimized for specific workloads (API, batch, etc.) — memory-optimized servers, CPU-optimized servers, etc.
- Services can be deployed independently with minimal downtime

## Why Not

- It's hard to maintain
    - Distributed transactions
    - Distributed logging, tracing, and monitoring
    - Deployment is complex

- More attack surface
    - Many dependencies to update
    - More things to secure (variables, secrets, etc.)

- Network latency can affect performance

- It can slow down the development process
    - Not easy to set up a dev environment
    - Integration testing is hard
    - Need to make sure the new version of a service is compatible with the old versions of the services that depend on it
    - Debugging may need extra effort

## What are the solutions?

- start with monolith and move to microservices when you need to
- develop as a monolith and deploy as a tuned services for specific workload