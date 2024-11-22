#!/bin/bash

# Docker container name
CONTAINER_NAME="spiderfoot"

# Base output folder in the Docker container
CONTAINER_OUTPUT_DIR="/home/spiderfoot/output"

# Local directory to copy the scans to
LOCAL_SCAN_DIR="/home/developer/scans"

# Current date (used for folder name)
CURRENT_DATE=$(date +%F)

# Ensure the local directory for today's scans exists
LOCAL_DATE_DIR="$LOCAL_SCAN_DIR/"
mkdir -p "$LOCAL_DATE_DIR"

# Copy the entire output folder for today's date from the container to the local machine
sudo docker cp "$CONTAINER_NAME:$CONTAINER_OUTPUT_DIR/$CURRENT_DATE" "$LOCAL_DATE_DIR"

echo "Scans copied to $LOCAL_DATE_DIR"
