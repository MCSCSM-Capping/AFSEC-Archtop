#!/usr/bin/env python3

# goes through each csv in the output directory. Moves specific information into the vulscan_data db.

import os
from datetime import date
import re
import psycopg2


def main():
    cur_date = date.today().isoformat()
    csv_dir = f"/home/developer/vulscan/vulscan-results/{cur_date}" # path to output folder for scan results
    user = "postgres"   # postgresql user
    db = "afsec"    # postgresql database
    table = "vulscan_data"  # postgresql table
    id_pattern = r"ID:(.*)- Title:"
    title_pattern = r"Title:(.*)- Link:"

    # connect to the postgresql db
    conn = psycopg2.connect(database = db,
                        user = user,
                        password = "capping2024",
                        host = "localhost",
                        port = "5432")
    cursor = conn.cursor()

    # go through each csv file in todays results directory
    print("Starting move...")
    for file in os.listdir(csv_dir):
        filename = os.fsdecode(file)    # name of current file
        filepath = os.path.join(csv_dir, filename)  # grab file path
        with open(filepath, 'r') as csv_file:   # open it
            for i, line in enumerate(csv_file):    # read line by line
                # grab ip, host, os, protocol, port, state, service, version (row: 2) 
                if i == 1:
                    # split headers line up by commas and extract necessary values
                    headers = line.split(',')
                    cev_ip=headers[0].strip()
                    cev_host=headers[1].strip()
                    cev_os=headers[2].strip()
                    cev_protocol=headers[3].strip()
                    cev_port=headers[4].strip()
                    cev_service=headers[5].strip()
                    cev_product=headers[6].strip()
                # parse cve from line 3 until a blank line
                elif i >= 2 and line:
                    id_match = re.search(id_pattern, line)
                    title_match = re.search(title_pattern, line)
                    if id_match and title_match:
                        cev_id = id_match.group(1).strip()
                        cev_title = title_match.group(1).strip()
                       # postgresql query with placeholders
                        insert_query = """
                            INSERT INTO vulscan_data (ip, host, os, protocol, port, service, product, id, title, scan_date)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                        """
                        # execute the query
                        cursor.execute(insert_query, (cev_ip, cev_host, cev_os, cev_protocol, cev_port, cev_service, cev_product, cev_id, cev_title, cur_date))
            conn.commit()
    print("Done...")
    conn.close()
        
# start script
if __name__ == "__main__":
    main()