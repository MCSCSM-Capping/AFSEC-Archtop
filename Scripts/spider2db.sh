#!/bin/bash

# Check if IP addresses are passed as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <comma-separated IP addresses>"
  exit 1
fi

# Convert the comma-separated list of IPs into an array
IFS=',' read -r -a IP_ARRAY <<< "$1"

# Base output folder for scan results inside the Docker container
CONTAINER_OUTPUT_DIR="/home/spiderfoot/output"

# Docker container name
CONTAINER_NAME="spiderfoot"

# Current date (used for folder name)
CURRENT_DATE=$(date +%F)

# Ensure the date-specific output directory exists in the container
DATE_OUTPUT_DIR="$CONTAINER_OUTPUT_DIR/$CURRENT_DATE"
sudo docker exec "$CONTAINER_NAME" /bin/sh -c "mkdir -p $DATE_OUTPUT_DIR"

# Loop through each IP address in the array
for ip in "${IP_ARRAY[@]}"; do
    # Skip empty IPs
    if [ -z "$ip" ]; then
        continue
    fi

    echo "Scanning IP: $ip"

    # Define output file name within the date-specific folder
    OUTPUT_FILE="$DATE_OUTPUT_DIR/${ip}.json"

    # Run a scan for each IP in the running Docker container
    sudo docker exec "$CONTAINER_NAME" /bin/sh -c "python3 /home/spiderfoot/sf.py -s \"$ip\" -u all -o json > \"$OUTPUT_FILE\""

done

echo "All IP scans completed."
root@developer-Standard-PC-Q35-ICH9-2009:/home/developer# cat spider2db.sh
#!/bin/bash

# Directory containing the CSV files for today's date
CUR_DATE=$(date +%F)
CSV_DIR="/home/developer/scans/$CUR_DATE" # Path to output folder for scan results
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

      # Read each line of the CSV (skipping the header)
      tail -n +2 "$file" | while IFS=',' read -r generated type data; do
        # Escape single quotes in data to prevent SQL errors
        generated=$(echo "$generated" | sed "s/'/''/g")
        type=$(echo "$type" | sed "s/'/''/g")
        data=$(echo "$data" | sed "s/'/''/g")

        # Insert the data into the PostgreSQL table
        psql -U "$USER" -d "$DB" -c \
        "INSERT INTO $TABLE (generated, type, data) VALUES ('$generated', '$type', '$data');"
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
