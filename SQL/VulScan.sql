-- Create Table to hold VulScan Data
CREATE TABLE vulscan_data (
    ip VARCHAR,
    host VARCHAR,
    os VARCHAR,
    protocol VARCHAR,
    port VARCHAR,
    state VARCHAR,
    service VARCHAR,
    version VARCHAR,
    cve_id VARCHAR,
    cve_title VARCHAR,
);

-- Import Data form csv into DB
COPY vulscan_data()
FROM '' 
DELIMITER ',' 
CSV HEADER;
