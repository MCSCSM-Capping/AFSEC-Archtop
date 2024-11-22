#!/bin/bash

# Path to the file with the list of IPs
IP_FILE="/home/developer/ips.txt"

# Output folder for scan results inside the Docker container
CONTAINER_OUTPUT_DIR="/home/spiderfoot/output"

# Docker container name
CONTAINER_NAME="spiderfoot"

# Loop through each IP address in the file
while read -r ip; do
    # Skip empty lines
    if [ -z "$ip" ]; then
        continue
    fi

    echo $ip

    # Define output file name
    OUTPUT_FILE="$CONTAINER_OUTPUT_DIR/${ip}-$(date +%F).csv"

    # Run a scan for each IP in the running Docker container
    sudo docker exec "busy_leakey" /bin/sh -c "python3 /home/spiderfoot/sf.py -s "$ip" -o csv > "$OUTPUT_FILE""


done < "$IP_FILE"