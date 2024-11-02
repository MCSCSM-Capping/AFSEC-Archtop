-- Create Table to hold VulScan Data
CREATE TABLE vulscan_data (
    id VARCHAR,
    ip VARCHAR,
    host VARCHAR,
    os VARCHAR,
    proto VARCHAR,
    port VARCHAR,
    service VARCHAR,
    product VARCHAR,
    service_fp VARCHAR,
    nse_script_id VARCHAR,
    notes VARCHAR,
    cve_id VARCHAR,
    cve_title VARCHAR,
    cve_link VARCHAR,
    matches VARCHAR,
);

-- Import Data form csv into DB
COPY vulscan_data()
FROM '' 
DELIMITER ',' 
CSV HEADER;
