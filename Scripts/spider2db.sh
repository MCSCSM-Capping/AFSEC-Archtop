#!/bin/bash

# goes through each csv in the output directory. Moves specific information into the spiderfoot_data db.

CSV_DIR="/home/developer/scans/$CUR_DATE" # path to output folder for scan results
USER="postgres" # postgresql user
DB="afsec"  # postgresql database
TABLE="spiderfoot_data"    # postgresql table

# go through each csv in the cur directory
for file in "$CSV_DIR/*.csv"; do

    psql -U "$USER" -d "$DB" -c "INSERT INTO $TABLE () VALUES ();"

done