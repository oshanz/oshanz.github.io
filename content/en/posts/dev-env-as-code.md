+++
title = "Development environments as code"
date = "2022-01-21"
description = "Development environments as code"
categories = [
]
tags = ['Docker', 'DevOps']
featured = true
images = [
]
+++

<!--more-->

## Why

* Setup the development environment in a "One click"
* leagacy projects need different packages and host IDE may not intergrate well (linters, formatters, etc)
* make debugging easier
* consitent environment between developers

## solutions

1. put development environment in a container
    - https://github.com/coder/code-server
    - https://www.eclipse.org/che/


2. remote containers
    - https://github.com/gitpod-io/openvscode-server
    - https://github.com/gitpod-io/gitpod
    - https://github.com/nicbet/docker-phoenix


## reference

* https://www.freecodecamp.org/news/put-your-dev-env-in-github/
* https://github.com/kudulab/dojo#Why-not-just-docker-run