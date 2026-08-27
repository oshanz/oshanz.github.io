+++
title = "Dockerize Development Environment"
date = "2022-01-10"
description = "Dockerize Development Environment"
categories = [
]
tags = ['Docker']
featured = true
images = [
]
+++

<!--more-->

* Dependencies
    - https://podman.io/

### Distrobox https://github.com/89luca89/distrobox

```bash
# create and enter a container
distrobox-create --name dev-env-ubuntu-20 --image ubuntu:20.04
distrobox-enter --name dev-env-ubuntu-20

# install tools inside the container
su -
apt install vscode
exit

# clone an existing container
distrobox-create --name <cloned> --clone dev-env-ubuntu-20

# save a container as a portable image
podman container commit <container-id> <image-name>
podman save <image-name> | xz -T0 -c > images.txz
podman load < images.txz
```

### Toolbox https://github.com/containers/toolbox

```bash
# build a custom image and create a toolbox from it
podman build . -t <image-name>
toolbox create -i <image-name>
toolbox enter <image-name>
toolbox list

# backup and restore
podman container commit -p <container-id> <image-name>
toolbox create --container go --image localhost/go-backup:latest
podman save -o img.tar <image-name>
```