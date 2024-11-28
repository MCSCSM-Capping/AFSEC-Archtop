#/bin/bash

sudo chmod a+x *

# Update Packages
sudo apt update

# Install Docker + Start
sudo apt install docker.io -y

sudo systemctl enable docker
sudo systemctl start docker

# Confirm that its working properly
docker --version

# Pull Spiderfoot Container
sudo docker pull josaorg/spiderfoot

# Start spiderfoot container
sudo docker run --name spiderfoot -d -p 5001:5001 josaorg/spiderfoot

# Install nmap + Vulscan

sudo apt install nmap -y

nmap --version

cd /usr/share/nmap/scripts/
sudo git clone https://github.com/scipag/vulscan.git

# Install Postgres + Check Status
sudo apt install postgresql postgresql-contrib -y

cd ../spiderfoot

sudo chmod a+x *

mkdir scans

cd ../vulscan

sudo chmod a+x *

mkdir vulscan-results

cd ../AFSEC-Dashboard-main

sudo apt install npm -y

sudo npm install

echo "Initial Setup Script Complete"
echo "Please proceed to Postgres DB setup"
echo "Make sure to set Postgres password on postgres and update md5 setting"

