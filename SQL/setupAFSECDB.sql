-- Switch to user Postgres
-- Start postgres with psql

-- create the DB
CREATE DATABASE afsec;

-- connect to database afsec
-- \c afsec

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


