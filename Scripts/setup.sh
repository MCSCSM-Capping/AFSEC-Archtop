#/bin/bash

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

sudo cd ~/AFSEC-ARCHTOP/spiderfoot

sudo chmod a+x *

sudo mkdir scans

sudo cd ../vulscan

sudo chmod a+x *

sudo mkdir vulscan-results

echo "Initial Setup Script Complete"
echo "Please proceed to Postgres DB setup"
echo "Make sure to set Postgres password on postgres and update md5 setting"

