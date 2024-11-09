### Table information

In the SQL folder are the the table stuckers for the postgres database. The `maintable.sql` file is the one that I will be descibing here.
This table will be the main table that the dashboard will communicate with to gather data for the dashboard. With that there are some different conventions used in order to make the table.
It will select data form the indivudual scanner table and then insert that data into the main table once it is formatted correctly.

1. `Scanner`:
 The scanner column will specify which scanner the data is coming from. This is important since Vulcan and Spiderfoot produce different data. Also when new scanners are added then a new name can be added.

2. `Scan_Source`:
 This column will be the IP/thing that is being scanned. For Spiderfoot, this is the source column, and then for Vulscan, this is the combination of the IP and the port that is currently being scanned. Vulscan will scan all open ports on the specified IP so it's best to combine the two and let that represent the source. Each new scanner should have a way of specifying the source as well.

3. `Scan_Date`:
 This column will use the date that is added to the specific scanners table. Either manually added in the individual table or the scanner provides it itself. This is used for records and keeps track of all the scans.

4. `Scan_Info`:
 This column will use the rest of the data provided by the scanner. Concat it into one string and then insert that string in as the info for that scanner. This is done since each scanner is going to produce different data. So instead of having an empty block in the database, it will be one column with all the data from the scanner.