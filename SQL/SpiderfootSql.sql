-- Create Table to hold Spiderfoot Data
CREATE TABLE spiderfoot_data (
    generated VARCHAR,
    type VARCHAR,
    data VARCHAR
);


-- Import Data form csv into DB
COPY spiderfoot_data(generated, type, data)
FROM '' 
DELIMITER ',' 
CSV HEADER;
