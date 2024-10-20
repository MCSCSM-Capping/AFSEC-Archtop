#!/bin/bash
# runs VulScan and Spiderfoot vulnerability scans
# outputs them to ScanResults folder

# check if directory is created
if [ ! -d "../ScanResults" ] then
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
    nmap -sV --script=vulscan/vulscan.nse --script-args vulscanoutput='{id} | {title} | {matches} matches | Product: {product} | Version: {version} | Link: {link}\n' $line

    # check if output file exists for the current data. Create if it doesnt or append to it
    if [ ! -e /path/to/file ]; then
        echo $some_line > /path/to/file
    else
        echo $some_line >> /path/to/file
    fi
done < ../ips.txt
echo VulScan complete...

# will we have to start spiderfoot and connect to server/cli?

# run Spiderfoot on provided ips
echo Running Spiderfoot scans...
while IFS= read -r line
do
    #put spiderfoot command here
done < ../ips.txt
echo Spiderfoot complete...



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