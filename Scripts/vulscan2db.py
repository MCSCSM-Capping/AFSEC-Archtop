#!/usr/bin/env python3

# goes through each csv in the output directory. Moves specific information into the vulscan_data db.

import os
from datetime import date
import csv
import re


def main():
    cur_date = date.today().isoformat()
    csv_dir = f"/home/developer/vulscan/vulscan-results/{cur_date}" # path to output folder for scan results
    user = "postgres"   # postgresql user
    db = "afsec"    # postgresql database
    table = "vulscan_data"  # postgresql table

    # go through each csv file in todays results directory
    print("Starting move...")
    for file in os.listdir(csv_dir):
        filename = os.fsdecode(file)    # name of current file
        filepath = os.path.join(csv_dir, filename)  # grab file path
        with open(filepath, 'r') as csv_file:   # open it
            for line in (csv_file):   # read line by line
                # grab ip, host, os, protocol, port, state, service, version (row: 2)
                if line == 1:
                    line.split(",")
                    cev_ip=line[0]
                    cev_host=line[1]
                    cev_os=line[2]
                    cev_protocol=line[3]
                    cev_port=line[4]
                    cev_service=line[5]
                    cev_product=line[6]
                    print(cev_ip)
    print("Done...")
        
# start script
if __name__ == "__main__":
    main()