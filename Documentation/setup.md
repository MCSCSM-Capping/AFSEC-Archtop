# AFSEC-Archtop
Repo for the cyber security dashboard project started in 2024 for capping with Archtop and Devin Overington

## Intended for use on Ubuntu
# Instructions

## Run the following commands in your terminal
```bash
sudo apt update
sudo apt upgrade -y
sudo apt install git -y
sudo git clone https://github.com/MCSCSM-Capping/AFSEC-Archtop.git
cd AFSEC-Archtop/Scripts
sudo chmod a+x ./setup.sh
sudo ./setup.sh
```

## This will do a majority of the setup

## After this script finishes the DB must be setup
## To do so run the following:

```bash
sudo su postgres
psql

-- create the DB
CREATE DATABASE afsec;

-- connect to database afsec
\c afsec

-- create tables

-- Create Table to hold Spiderfoot Data
CREATE TABLE spiderfoot_data (
    generated VARCHAR,
    type VARCHAR,
    data VARCHAR,
    source_ip VARCHAR,
    scan_date DATE
);

-- Create Table to hold VulScan Data
CREATE TABLE vulscan_data (
    ip VARCHAR,
    host VARCHAR,
    os VARCHAR,
    protocol VARCHAR,
    port VARCHAR,
    service VARCHAR,
    product VARCHAR,
    id VARCHAR,
    title VARCHAR,
    scan_date DATE
);

-- Create Table to hold Spiderfoot Data
CREATE TABLE main_table (
    Scanner VARCHAR, -- either vulscan or spiderfoot 
    Scan_Source VARCHAR, -- spiderfoot: source column | vulscan: ip + port
    Scan_Date VARCHAR, -- spiderfoot: updated column | vulscan: scan_date
    Scan_Info VARCHAR -- spiderfoot: type + module + fp + data | vulscan: host + os + protocol + service + product + id + title

);
```

## The following postgres changes must be made to allow the scripts to push data into the DB
```bash
sudo su postgres
psql
```

## Set user postgres's password
```bash
ALTER USER postgres PASSWORD 'capping2024';
```

## Quit out of Postgres
```bash
\q
```

## Switch back to root or superuser and modify the config file
```bash
sudo nano /etc/postgresql/<version>/main/pg_hba.conf
```

## Adjust the part that looks like this
```bash
local   all   postgres   peer
```

## To This
```bash
local   all   postgres   md5
```

## Save and reload 
```bash
sudo systemctl restart postgresql
sudo systemctl daemon-reload
```

## After that ensure to install proper node dependencies for the dashboard:
```bash
cd ~/AFSEC-Archtop/AFSEC-Dashboard-main
npm install
```
## Also make sure that all the proper node dependencies are installed for the API
```bash
cd ~/AFSEC-Archtop/pg-api
npm install
```

## The API can now be started
```bash
node server.js
```

## At this point the Dashboard can be started:
```bash
cd ~/AFSEC-Archtop/AFSEC-Dashboard-main
npm run dev
```

## Note: Refer to the admin scanner documentation on how to setup scanner scripts.