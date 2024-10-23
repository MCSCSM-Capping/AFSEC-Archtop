#!/bin/bash
# runs VulScan vulnerability scans
# outputs them to ScanResults folder

currentDate=$(date '+%Y-%m-%d')

# check if directory is created
if [ ! -d "../ScanResults" ]; then
    mkdir ../ScanResults   # create directory
    echo Created directory...
else
    echo Directory already exists... # already exists
fi

# run VulScan on provided ips
echo Running VulScan scans...
while IFS= read -r line
do
    # VulScan command
    nmap -sV --script=vulscan/vulscan.nse --script-args='vulscanoutput="{id} | {title} | {matches} matches | Product: {product} | Version: {version} | Link: {link}\n"' $line

    # check if output file exists for the current data. Create if it doesnt or append to it
    if [ ! -e ../ScanResults/$currentDate.csv ]; then
        echo $line > ../ScanResults/$currentDate.csv
    else
        echo $line >> ../ScanResults/$currentDate.csv
    fi
done < ips.txt
echo VulScan complete...

# --setup for Linux vm -- input in terminal
# create/edit file: sudo crontab -e
# create job: 1 2 3 4 5 *** /path/to/script
# 1: Minutes (0-59)
# 2: Hours (0-23)
# 3: Days (1-31)
# 4: Month (1-12)
# 5: Day of the week(1-7)
# /path/to/script - your own shell script
# verify with: crontab -l