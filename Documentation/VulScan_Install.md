# Setting up Vulscan on Ubuntu

This guide will walk you through the steps to set up **Vulscan**, a vulnerability scanner integrated with Nmap, on an Ubuntu system.

## Prerequisites

- **Ubuntu** (version 20.04 or later recommended)
- **Nmap** installed
- Internet access to fetch Vulscan and vulnerability databases

## Step 1: Install Nmap

If Nmap is not already installed, you can install it by running:

```bash
sudo apt update
sudo apt install nmap
```

## Verify with
```bash
nmap --version
```

## Install VulScan
```bash
cd /usr/share/nmap/scripts/
sudo git clone https://github.com/scipag/vulscan.git
```

## For a basic scan
```bash
sudo nmap -sV --script=vulscan/vulscan.nse <target>
```

## To export results as an XML
```bash
sudo nmap -sV --script=vulscan/vulscan.nse <target> -oX vulscan-results.xml
```