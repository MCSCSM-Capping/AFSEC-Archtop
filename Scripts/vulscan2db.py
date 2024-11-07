#!/usr/bin/env python3

# goes through each csv in the output directory. Moves specific information into the vulscan_data db.

import os
from datetime import date
import re


def main():
    cur_date = date.today().isoformat()
    csv_dir = f"/home/developer/vulscan/vulscan-results/{cur_date}" # path to output folder for scan results
    user = "postgres"   # postgresql user
    db = "afsec"    # postgresql database
    table = "vulscan_data"  # postgresql table
    id_pattern = r"ID:(.*)- Title:"
    title_pattern = r"Title:(.*)- Link:"

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
                    cev_ip=headers[0]
                    cev_host=headers[1]
                    cev_os=headers[2]
                    cev_protocol=headers[3]
                    cev_port=headers[4]
                    cev_service=headers[5]
                    cev_product=headers[6]
                    print(cev_ip, cev_host, cev_os, cev_protocol, cev_port, cev_service, cev_product)
                # parse cve from line 3 until a blank line
                elif i >= 2 and line:
                    id_match = re.search(id_pattern, line)
                    title_match = re.search(title_pattern, line)
                    if id_match and title_match:
                        cev_id = id_match.group(1).strip()
                        cev_title = title_match.group(1).strip()
                        print(cev_id, cev_title)
                    
    print("Done...")
        
# start script
if __name__ == "__main__":
    main()