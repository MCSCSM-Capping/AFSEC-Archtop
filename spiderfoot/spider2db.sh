#!/bin/bash

# Directory containing the CSV files for today's date
CUR_DATE=$(date +%F)
CSV_DIR="scans/$CUR_DATE" # Path to output folder for scan results
USER="postgres" # PostgreSQL user
DB="afsec"  # PostgreSQL database
TABLE="spiderfoot_data" # PostgreSQL table

# Set the PostgreSQL password
export PGPASSWORD='capping2024'

# Check if the CSV directory exists and is not empty
if [ -d "$CSV_DIR" ] && [ "$(ls -A "$CSV_DIR"/*.csv 2>/dev/null)" ]; then
  # Iterate over each CSV file in the directory
  for file in "$CSV_DIR"/*.csv; do
    if [[ -f "$file" ]]; then
      echo "Processing $file..."

      # Extract the source IP address from the filename (e.g., "192.168.1.1.csv" -> "192.168.1.1")
      source_ip=$(basename "$file" .csv)

      # Read each line of the CSV (skipping the header)
      tail -n +2 "$file" | while IFS=',' read -r generated type data; do
        # Escape single quotes in data to prevent SQL errors
        generated=$(echo "$generated" | sed "s/'/''/g")
        type=$(echo "$type" | sed "s/'/''/g")
        data=$(echo "$data" | sed "s/'/''/g")

        # Insert the data into the PostgreSQL table, including source_ip and scan_date
        psql -U "$USER" -d "$DB" -c \
        "INSERT INTO $TABLE (generated, type, data, source_ip, scan_date) VALUES ('$generated', '$type', '$data', '$source_ip', '$CUR_DATE');"
      done

      echo "Finished processing $file."
    fi
  done
else
  echo "No CSV files found in $CSV_DIR."
fi

# Unset the PostgreSQL password after use
unset PGPASSWORD

echo "All CSV files have been processed."
