#!/bin/bash

# Path to the file with the list of IPs
IP_FILE="../ips.txt"

# Base output folder for scan results inside the Docker container
CONTAINER_OUTPUT_DIR="/home/spiderfoot/output"

# Docker container name
CONTAINER_NAME="spiderfoot"

# Current date (used for folder name)
CURRENT_DATE=$(date +%F)

# Ensure the date-specific output directory exists in the container
DATE_OUTPUT_DIR="$CONTAINER_OUTPUT_DIR/$CURRENT_DATE"
sudo docker exec "$CONTAINER_NAME" /bin/sh -c "mkdir -p $DATE_OUTPUT_DIR"

# Loop through each IP address in the file
while read -r ip; do
    # Skip empty lines
    if [ -z "$ip" ]; then
        continue
    fi

    echo "Scanning IP: $ip"

    # Define output file name within the date-specific folder
    OUTPUT_FILE="$DATE_OUTPUT_DIR/${ip}.json"

    # Run a scan for each IP in the running Docker container
    sudo docker exec "$CONTAINER_NAME" /bin/sh -c "python3 /home/spiderfoot/sf.py -s \"$ip\" -u all -o json > \"$OUTPUT_FILE\""

done < "$IP_FILE"
