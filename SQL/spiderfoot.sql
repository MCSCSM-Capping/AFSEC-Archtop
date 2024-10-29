-- Create Table to hold Spiderfoot Data
CREATE TABLE spiderfoot_data (
    scan_name VARCHAR,
    updated VARCHAR,
    type VARCHAR,
    module VARCHAR,
    source VARCHAR,
    fp VARCHAR,
    data VARCHAR
);

-- Import Data form csv into DB
COPY spiderfoot_data(scan_name, updated, type, module, source, fp, data)
FROM '/home/scans/SpiderfootTest.csv' 
DELIMITER ',' 
CSV HEADER;
