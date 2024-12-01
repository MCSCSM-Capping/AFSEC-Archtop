
# DockerSpiderfoot IP Scanning Script Documentation

This script allows you to scan a list of IP addresses using Spiderfoot inside a Docker container and save the scan results in a specified output directory within the container.

## Script Usage

### Usage Syntax

```bash
./provided_spiderfoot.sh <comma-separated IP addresses>
```

- `<comma-separated IP addresses>`: List of IPs to scan, separated by commas (e.g., `192.168.1.1,192.168.1.2`).

### Example

```bash
./provided_spiderfoot.sh 192.168.1.1,192.168.1.2
```

## Script Details

1. **Input Handling**: The script expects a comma-separated list of IP addresses as a single argument. It will exit if no IPs are provided.

2. **Container and Output Directories**:
    - The output directory inside the Docker container is specified by `CONTAINER_OUTPUT_DIR`.
    - A subdirectory is created based on the current date (e.g., `/home/spiderfoot/output/YYYY-MM-DD`).

3. **Docker Execution**:
    - For each IP address, the script runs a scan using Spiderfoot within the Docker container.
    - The scan results are saved as JSON files, named according to the IP address scanned.

## Script Code

```bash
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
```

## Explanation of Key Commands

- **`IFS=',' read -r -a IP_ARRAY <<< "$1"`**: Converts the comma-separated IP list into an array.
- **`sudo docker exec ... mkdir -p $DATE_OUTPUT_DIR`**: Creates the date-specific output folder inside the Docker container.
- **`sudo docker exec "$CONTAINER_NAME" ... sf.py -s "$ip" -u all -o json > "$OUTPUT_FILE"`**: Executes the scan on each IP within the Docker container, saving the output in JSON format.

## Notes

- Make sure to replace `CONTAINER_NAME` with the actual name or ID of your Docker container.
- Ensure that the specified Docker container has permissions to write to the specified output directory.
- Modify the script to match any specific configurations or paths for your environment.


