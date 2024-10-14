# Setting up Spiderfoot on Ubuntu

This guide will walk you through the steps to set up **Spiderfoot** on an Ubuntu system.

## Prerequisites

- **Ubuntu** (version 20.04 or later recommended)
- **Docker** installed
- Internet access to fetch Spiderfoot and Docker

## Step 1: Install Docker

If Docker is not already installed, you can install it by running:

```bash
sudo apt update
sudo apt install docker.io
```

## Start Docker
```bash
sudo systemctl enable docker
sudo systemctl start docker
```

## Verify with
```bash
docker --version
```

## Pull Spiderfoot Container 
```bash
sudo docker pull josaorg/spiderfoot
```

## Start the container on port 5001
```bash
sudo docker run -d -p 5001:5001 josaorg/spiderfoot
```

## Access via Web Dashboard
http://localhost:5001
