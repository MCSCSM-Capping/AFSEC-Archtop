#!/bin/bash

# runs VulScan on specific ips and outputs the results to the vulscan-results folder

# path to the file with the list of IPs
IP_FILE="../ips.txt"

# current date
CUR_DATE=$(date '+%Y-%m-%d')

# output folder for scan results
OUTPUT_DIR="vulscan-results/$CUR_DATE"

# check if output folder exists for the current data
if [ ! -d "$OUTPUT_DIR" ]; then
    sudo mkdir "$OUTPUT_DIR"
fi

# run VulScan on provided ips
echo Running VulScan...
while read -r ip; do

    # define the output file name
    OUTPUT_FILE="$OUTPUT_DIR/${ip}.xml"

    #for each ip run vulscan and output the results to its specific file
    sudo nmap --script-args='vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"' --script=vulscan/vulscan.nse -sV -p- "$ip" -oX "$OUTPUT_FILE"
    sudo python3 ../Scripts/xml2csv.py -f "$OUTPUT_FILE" -csv "$OUTPUT_DIR/${ip}.csv"
    sudo rm "$OUTPUT_FILE"
    
done < "$IP_FILE"
echo scanning complete...