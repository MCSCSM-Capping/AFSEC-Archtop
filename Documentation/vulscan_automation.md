
# Vulscan Automation

This procedure will explain how to create and automate daily scans for a given list of IP addresses using Vulscan. This documentation will be extremely similar to SpiderFoot, however we will not be using Docker for this implementation. The scans are currently scheduled to run every day at **2:00 AM** and the results will be output as XML files to the vulscan-results directory.

## Step 1: Prepare the List of IPs

Create a file with the list of IP addresses that you want to scan, where each IP is on a new line.

### Example IP List:
Save this list in the file `/home/developer/ips.txt`:
```
216.6.139.210
216.6.136.131
216.6.136.132
```
Each line represents an IP address that will be scanned daily.

## Step 2: Create the Shell Script

Create a shell script that reads the list of IPs from the `ips.txt` file and runs Vulscan for each IP. The results will be saved in `/home/developer/vulscan/vulscan-results`.

Here’s the shell script:

```bash
#!/bin/bash

# runs VulScan on specific ips and outputs the results to the vulscan-results folder

# path to the file with the list of IPs
IP_FILE="/home/developer/ips.txt"

# current date
CUR_DATE=$(date '+%Y-%m-%d')

# output folder for scan results
OUTPUT_DIR="/home/developer/vulscan/vulscan-results/$CUR_DATE"

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
    sudo nmap  --script-args vulscanoutput=details --script=vulscan/vulscan.nse -sV -p- "$ip" -oX "$OUTPUT_FILE"
done < "$IP_FILE"
echo scanning complete...
```

This script:
- Reads IP addresses from `/home/developer/ips.txt`.
- Runs Vulscan for each IP address.
- Saves the scan results in `/home/developer/vulscan/vulscan-results` as XML files.

### Step 3: Make the Script Executable
Make the shell script executable with the following command:
```bash
chmod +x /home/developer/vulscan/vulscanscript.sh
```

## Step 4: Schedule the Script to Run Daily

To run the script every day at **2:00 AM**, schedule it using cron.

### Open the Crontab:
```bash
crontab -e
```
You may be prompted to enter a number to select which text editor you would like to use. I recommend choosing 1 for nano.

### Add the Cron Job:
Add the following line to the crontab to run the script every day at 9:40 AM:
```bash
0 2 * * * /home/developer/vulscan/vulscanscript.sh
```

This means:
- `0`: Run at the 0th minute.
- `2`: Run at 2 AM.
- `* * *`: Every day, every month, every year.

## Step 5: Check Cron Job Logs

You can check when the cron job starts by reviewing the cron logs.

### For Ubuntu/Debian:
Check the cron logs using the syslog:
```bash
grep CRON /var/log/syslog
```
By following these steps, you will have Vulscan automatically scan your list of IP addresses daily and store the results in XML files.
