-- Create Table to hold Spiderfoot Data
CREATE TABLE main_table (
    Scanner VARCHAR, -- either vulscan or spiderfoot 
    Scan_Source VARCHAR, -- spiderfoot: source column | vulscan: ip + port
    Scan_Date VARCHAR, -- spiderfoot: updated column | vulscan: scan_date
    Scan_Info VARCHAR, -- spiderfoot: type + module + fp + data | vulscan: host + os + protocol + service + product + id + title

);

-- Import Data form spiderfoot and vulscan to table
-- another python file to do all this work will work on it once i get back to the school