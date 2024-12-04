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

    # for each ip run vulscan and output the results to its specific file
    # range or subnet
    if [[ "$ip"=~ / ]]; then
        IFS='/' read -r start_ip cidr <<< "$ip"  # grab the start ip and the cidr
        IFS='.' read -r one two three four <<< "$start_ip"  # parse the start ip
        # check range
        if [[ "$cidr" == "8" ]]; then
            # a.0.0.0 - a.255.255.255
            end_ip="$one.255.255.255"
        elif [[ "$cidr" == "16" ]]; then
            # a.b.0.0 - a.b.255.255
            end_ip="$one.two.255.255"
        elif [[ "$cidr" == "24" ]]; then
            # a.b.c.0 - a.b.c.255
            end_ip="$one.two.three.255"
        else
            echo unsupported range...
        fi
        range="start_ip-end_ip"
        sudo nmap --script-args='vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"' --script=vulscan/vulscan.nse -sV -p- "$range" -oX "$OUTPUT_FILE"
    # range
    elif [[ "$ip" =~ - ]]; then
        sudo nmap --script-args='vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"' --script=vulscan/vulscan.nse -sV -p- "$ip" -oX "$OUTPUT_FILE"
    # single
    else
        sudo nmap --script-args='vulscandb=cve.csv,vulscanoutput="ID: {id} - Title: {title} - Link: {link} ({matches})\n"' --script=vulscan/vulscan.nse -sV -p- "$ip" -oX "$OUTPUT_FILE"
    fi

    sudo python3 ../Scripts/xml2csv.py -f "$OUTPUT_FILE" -csv "$OUTPUT_DIR/${ip}.csv"
    sudo rm "$OUTPUT_FILE"
    
done < "$IP_FILE"
echo scanning complete...