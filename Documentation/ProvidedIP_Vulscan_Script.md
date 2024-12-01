# Provided IP VulScan Script Documentation

This script automates the process of running VulScan on specified IP addresses, saving scan results in a structured output directory, and converting the results to CSV format for easier analysis.

## Script Usage

### Running the Script

```bash
./provided_vulscan.sh <comma-separated IP addresses>
```

**Example**:

```bash
./provided_vulscan.sh "192.168.1.1,192.168.1.2,192.168.1.3"
```

The script takes a single argument: a comma-separated list of IP addresses to scan.

### Script Breakdown

1. **Check for IP Argument**:
   - The script verifies if IP addresses are passed as an argument. If not, it outputs the usage instructions and exits.

2. **Convert IP List to Array**:
   - Converts the comma-separated list of IP addresses into an array for easier iteration.

3. **Generate Output Directory**:
   - Creates a directory for the scan results based on the current date (e.g., `vulscan-results/YYYY-MM-DD`). Each scan is saved in this directory, with separate output files for each IP address.

4. **Run VulScan on Each IP Address**:
   - For each IP in the array:
     - Checks if the IP is not empty.
     - Runs VulScan using `nmap` with the specified arguments and saves the output as an XML file.
     - Converts the XML output to CSV using `Nmap-XML-to-CSV` for easier data handling.
     - Deletes the intermediate XML file.

### Example Directory Structure

If run on `2024-11-03` with IPs `192.168.1.1` and `192.168.1.2`, the directory structure will look like:

```
vulscan-results/
└── 2024-11-03/
    ├── 192.168.1.1.csv
    └── 192.168.1.2.csv
```

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
```
