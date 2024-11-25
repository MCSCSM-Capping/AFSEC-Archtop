#!/bin/bash

# Check if IP addresses are passed as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <comma-separated IP addresses>"
  exit 1
fi

# Convert the comma-separated list of IPs into an array
IFS=',' read -r -a IP_ARRAY <<< "$1"

# Current date
CUR_DATE=$(date '+%Y-%m-%d')

# Output folder for scan results
OUTPUT_DIR="vulscan-results/$CUR_DATE"

# Check if output folder exists for the current date
if [ ! -d "$OUTPUT_DIR" ]; then
    sudo mkdir -p "$OUTPUT_DIR"
fi

# Run VulScan on provided IPs
echo "Running VulScan..."
for ip in "${IP_ARRAY[@]}"; do
    # Skip empty IPs
    if [ -z "$ip" ]; then
        continue
    fi

    echo "Scanning IP: $ip"

    # Define the output file name
    OUTPUT_FILE="$OUTPUT_DIR/${ip}.xml"

    # For each IP, run VulScan and output the results to its specific file
    sudo nmap --script-args='vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"' --script=vulscan/vulscan.nse -sV -p- "$ip" -oX "$OUTPUT_FILE"
    sudo python3 ../Scripts/xml2csv.py -f "$OUTPUT_FILE" -csv "$OUTPUT_DIR/${ip}.csv"
    sudo rm "$OUTPUT_FILE"

done

echo "Scanning complete."