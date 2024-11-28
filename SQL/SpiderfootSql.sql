-- Create Table to hold Spiderfoot Data
CREATE TABLE spiderfoot_data (
    generated VARCHAR,
    type VARCHAR,
    data VARCHAR,
    source_ip VARCHAR,
    scan_date DATE
);


-- Import Data form csv into DB
COPY spiderfoot_data(generated, type, data)
FROM '' 
DELIMITER ',' 
CSV HEADER;
