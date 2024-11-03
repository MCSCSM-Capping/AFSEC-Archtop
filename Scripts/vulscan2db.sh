#!/bin/bash

# goes through each csv in the output directory. Moves specific information into the vulscan_data db.

CUR_DATE=$(date '+%Y-%m-%d')    # current date
CSV_DIR="/home/developer/vulscan/vulscan-results/$CUR_DATE" # path to output folder for scan results
USER="postgres" # postgresql user
DB="afsec"  # postgresql database
TABLE="vulscan_data"    # postgresql table

# go through each csv in todays results directory
echo "Starting move..."
for file in "$CSV_DIR/"*.csv; do

    # grab ip, host, os, protocol, port, state, service, version (row: 2)
    ip=$(awk -F',' 'NR==2 {print $1}' "$file")
    host=$(awk -F',' 'NR==2 {print $2}' "$file")
    os=$(awk -F',' 'NR==2 {print $3}' "$file")
    protocol=$(awk -F',' 'NR==2 {print $4}' "$file")
    port=$(awk -F',' 'NR==2 {print $5}' "$file")
    service=$(awk -F',' 'NR==2 {print $6}' "$file")
    product=$(awk -F',' 'NR==2 {print $7}' "$file")
    echo "$ip,$host,$os,$protocol,$port,$service,$product"

    # loop to grab each cev id and title (line 3 until end of file)
    tail -n +3 "$file" | while read -r line; do
        #cev_id=$(awk -F'ID: | - Title:' '{print $1}')
        #cev_title=$(awk -F'ID: | - Title:' '{print $2}')
        echo "$line"

        # add into postgresql table vulscan_data
        # psql -U "$USER" -d "$DB" -c "INSERT INTO $TABLE () VALUES ();"
    done
done
echo "Done..."