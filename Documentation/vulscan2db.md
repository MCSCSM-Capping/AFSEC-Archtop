# Vulscan CSV to PostgreSQL Database Script

This script processes Vulscan output CSV files from a specific directory and inserts relevant data into a PostgreSQL database table. It extracts scan information including IP address, host, OS, protocol, port, service, product, CVE ID, and CVE title from each CSV file and saves them to a database table with a scan date.

## Script Overview

- **Script Name**: `vulscan2db.py`
- **Purpose**: To transfer scan results from the output directory to a designated table on the host machine.

## Requirements

- Python 3
- `psycopg2` library for PostgreSQL integration

   ```bash
   pip3 install psycopg2
   ```

## Running the Script

To run the script, follow these steps:

1. **Ensure Execution Permissions**:  
   Make the script executable by setting the correct permissions.

   ```bash
   chmod +x vulscan2db.py
   ```
2. **Using the Executable Command**:  

   ```bash
   ./script_name.py
   ```

## The Script Itself

```python3
#!/usr/bin/env python3

# This script processes each CSV in the output directory, extracting specific information and inserting it into the vulscan_data database table.

import os
from datetime import date
import re
import psycopg2

def main():
    cur_date = date.today().isoformat()
    csv_dir = f"/home/developer/vulscan/vulscan-results/{cur_date}" # Directory path for today's scan results
    user = "postgres"   # PostgreSQL user
    db = "afsec"    # PostgreSQL database
    table = "vulscan_data"  # Target database table
    id_pattern = r"ID:(.*)- Title:"  # Regex pattern to capture CVE ID
    title_pattern = r"Title:(.*)- Link:"  # Regex pattern to capture CVE title

    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        database=db,
        user=user,
        password="capping2024",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()

    # Process each CSV file in today's results directory
    print("Starting move...")
    for file in os.listdir(csv_dir):
        filename = os.fsdecode(file)
        filepath = os.path.join(csv_dir, filename)
        with open(filepath, 'r') as csv_file:
            for i, line in enumerate(csv_file):
                # Extract specific information from the first few lines of each CSV file
                if i == 1:
                    # Split header line by commas and extract needed fields
                    headers = line.split(',')
                    cev_ip = headers[0].strip()
                    cev_host = headers[1].strip()
                    cev_os = headers[2].strip()
                    cev_protocol = headers[3].strip()
                    cev_port = headers[4].strip()
                    cev_service = headers[5].strip()
                    cev_product = headers[6].strip()
                # Parse CVE data from line 3 onward
                elif i >= 2 and line:
                    id_match = re.search(id_pattern, line)
                    title_match = re.search(title_pattern, line)
                    if id_match and title_match:
                        cev_id = id_match.group(1).strip()
                        cev_title = title_match.group(1).strip()
                        # PostgreSQL query with placeholders
                        insert_query = """
                            INSERT INTO vulscan_data (ip, host, os, protocol, port, service, product, id, title, scan_date)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                        """
                        # Execute the query with extracted data
                        cursor.execute(insert_query, (
                            cev_ip, cev_host, cev_os, cev_protocol, cev_port,
                            cev_service, cev_product, cev_id, cev_title, cur_date
                        ))
            conn.commit()
    print("Done...")
    conn.close()

# Start script
if __name__ == "__main__":
    main()
```