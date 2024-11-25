#!/bin/bash

# Docker container name
CONTAINER_NAME="spiderfoot"

# Base output folder in the Docker container
CONTAINER_OUTPUT_DIR="/home/spiderfoot/output"

# Local directory to copy the scans to
LOCAL_SCAN_DIR="scans"

# Current date (used for folder name)
CURRENT_DATE=$(date +%F)

# Ensure the local directory for scans exists
mkdir -p "$LOCAL_SCAN_DIR"

# Copy the entire output folder for today's date from the container to the local machine
sudo docker cp "$CONTAINER_NAME:$CONTAINER_OUTPUT_DIR/$CURRENT_DATE" "$LOCAL_SCAN_DIR"

echo "Scans copied to $LOCAL_SCAN_DIR/$CURRENT_DATE"

# Convert each JSON file in the new directory to CSV and delete the JSON file afterward
for JSON_FILE in "$LOCAL_SCAN_DIR/$CURRENT_DATE"/*.json; do
  if [[ -f "$JSON_FILE" ]]; then
    # Extract the base name of the file (without path and extension) to use as the CSV file name
    BASENAME=$(basename "$JSON_FILE" .json)
    CSV_FILE="$LOCAL_SCAN_DIR/$CURRENT_DATE/${BASENAME}.csv"
    
    # Convert JSON to CSV using the custom script
    sudo python3 ../Scripts/json2csv.py "$JSON_FILE" "$CSV_FILE"
    
    echo "Converted $JSON_FILE to $CSV_FILE"
    
    # Delete the original JSON file
    sudo rm "$JSON_FILE"
    
    echo "Deleted $JSON_FILE"
  fi
done



