
# SpiderFoot Automation

This guide explains how to automate daily scans of a list of IP addresses using SpiderFoot, running in a Docker container. The scans will be scheduled to run every day at **9:40 AM** and the results will be exported as CSV files.

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

Create a shell script that reads the list of IPs from the `ips.txt` file and runs SpiderFoot for each IP. The results will be saved in `/home/developer/spiderscans`.

Here’s the shell script:

```bash
#!/bin/bash

# Path to the file with the list of IPs
IP_FILE="/home/developer/ips.txt"

# Output folder for scan results inside the Docker container
CONTAINER_OUTPUT_DIR="/home/spiderfoot/output"

# Docker container name
CONTAINER_NAME="busy_leakey"

# Loop through each IP address in the file
while read -r ip; do
    # Skip empty lines
    if [ -z "$ip" ]; then
        continue
    fi

    echo $ip

    # Define output file name
    OUTPUT_FILE="$CONTAINER_OUTPUT_DIR/${ip}-$(date +%F).csv"

    # Run a scan for each IP in the running Docker container
    sudo docker exec "busy_leakey" /bin/sh -c "python3 /home/spiderfoot/sf.py -s "$ip" -o csv > "$OUTPUT_FILE""


done < "$IP_FILE"
```

This script:
- Reads IP addresses from `/home/developer/ips.txt`.
- Runs SpiderFoot for each IP address.
- Saves the scan results in `/home/developer/spiderscans` as CSV files.

### Step 3: Make the Script Executable
Make the shell script executable with the following command:
```bash
chmod +x /home/developer/spiderscript.sh
```

## Step 4: Schedule the Script to Run Daily

To run the script every day at **9:40 AM**, schedule it using cron.

### Open the Crontab:
```bash
crontab -e
```
You may be prompted to enter a number to select which text editor you would like to use. I recommend choosing 1 for nano.

### Add the Cron Job:
Add the following line to the crontab to run the script every day at 9:40 AM:
```bash
40 9 * * * /home/developer/spiderscript.sh
```

This means:
- `40`: Run at the 40th minute.
- `9`: Run at 9 AM.
- `* * *`: Every day, every month, every year.

## Step 5: Check Cron Job Logs

You can check when the cron job starts by reviewing the cron logs.

### For Ubuntu/Debian:
Check the cron logs using the syslog:
```bash
grep CRON /var/log/syslog
```
By following these steps, you will have SpiderFoot automatically scan your list of IP addresses daily and store the results in CSV files.
