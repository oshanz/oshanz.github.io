+++
title = "Development environments as code"
date = "2022-01-21"
description = "Development environments as code"
categories = [
]
tags = ['DevOps']
featured = true
images = [
]
+++

<!--more-->

## Why

* Set up the development environment in "one click"
* Legacy projects need different package versions, and the host IDE may not integrate well with them (linters, formatters, etc.)
* Makes debugging easier
* Keeps the environment consistent between developers

## Solutions

1. Put the development environment in a container
    - https://github.com/coder/code-server
    - https://www.eclipse.org/che/

2. Remote containers
    - https://github.com/gitpod-io/openvscode-server
    - https://github.com/gitpod-io/gitpod
    - https://github.com/nicbet/docker-phoenix

## Reference

* https://www.freecodecamp.org/news/put-your-dev-env-in-github/
* https://github.com/kudulab/dojo#Why-not-just-docker-run