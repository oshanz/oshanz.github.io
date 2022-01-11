+++
title = "Dockerize Devlopment Environment"
date = "2022-01-10"
description = "Dockerize Devlopment Environment"
categories = [
]
tags = ['Docker']
featured = true
images = [
]
+++

<!--more-->

* Dependancies
    - https://podman.io/

### Distrobox https://github.com/89luca89/distrobox


```bash

distrobox-create --name dev-env-ubuntu-20 --image ubuntu:20.04 

distrobox-enter --name dev-env-ubuntu-20

su -

apt install vscode

exit

distrobox-create --name <cloned> --clone dev-env-ubuntu-20

## save container as a image
podman container commit <container-id> <image-name>

podman save image-name | xz -T0 -c images.txz

podman load images.txz


```

### Toolbox https://github.com/containers/toolbox


```bash

<define your docjer file>
podman build . -t my-image-name
toolbox create -i imagename
toolbox enter imagename
toolbox list
# backup and restore
podman container commit -p <container id>  <img name>

toolbox create --container go --image localhost/go-backup:latest
podman save -o img.tar image-name

```