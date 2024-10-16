-- Create Table to hold VulScan Data
CREATE TABLE vulscan_data (
    
);

-- Import Data form csv into DB
COPY vulscan_data()
FROM '' 
DELIMITER ',' 
CSV HEADER;
