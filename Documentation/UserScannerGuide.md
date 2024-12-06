# User Guide on what to expect from the Scanners

Users can view the vulnerability and CVE data on the AFSEC Dashboard IP Detail Page.

On that page information like this can be found:
Source IP Address of the Scan
The date the IP was scanned
The CVE ID
The CVE Title
The Product causing the CVE
What protocol the CVE is using
What service the CVE is using


Users can expect this page to dynamically update as CVEs are detected by the scanner(s) running in the background.

If a user would like to manually scan IP(s) and they have access to the server hosting the AFSEC Dashboard a scan can be run by doing the following:

They must first move to the proper directory:
```bash
cd ~/AFSEC-Archtop/vulscan
```
The following script can then be run, where the IP addresses that you would like to scan are passed as an argument in a comma seperated list like so:
```bash
./provided_vulscan 8.8.8.8,9.9.9.9,10.10.10.10
```

or a single IP can be scanned like this:
```bash
./provided_vulscan 8.8.8.8
```

When the scan completes, as long as the other scripts that update the background DB are set to run frequently by an admin, the result of the scan will eventually dynamically update in the Dashboard.

If a user needs to see the original result of scan on the server, they can then do the following:

Navigate to this directory
```bash
cd ~/AFSEC-Archtop/vulscan/vulscan-results
```

Under this directory their will be folders corresponding to the date that scans were taken, the user can then enter their desired directory, for example:
```bash
cd 2024-12-02
```

Under this directory will be the resulting CSV files with a name corresponding to the IP Address of which was scanned.
These CSV files can be opened in Excel or other similar spreadsheet tools.

