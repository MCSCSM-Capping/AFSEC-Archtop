#!/bin/bash

# goes through each csv in the output directory. Moves specific information into the vulscan_data db.

CSV_DIR="/home/developer/vulscan/vulscan-results/$CUR_DATE" # path to output folder for scan results
USER="postgres" # postgresql user
DB="afsec"  # postgresql database
TABLE="vulscan_data"    # postgresql table

# go through each csv in the cur directory
for file in "$CSV_DIR/*.csv"; do

    # grab ip, host, os, protocol, port, state, service, version (rows: 2, 3, 5)
    awk 'NR==2 {ip=$5}'
    

    # for loop/while loop to grab each cev id and title (after line 8 until end of file)
    # inside for loop add into postgresql table vulscan_data
    psql -U "$USER" -d "$DB" -c "INSERT INTO $TABLE () VALUES ();"

done