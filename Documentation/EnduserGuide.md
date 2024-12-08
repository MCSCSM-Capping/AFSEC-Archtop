# Discovered CVEs Page User Guide

## The Top Card Statistic Values

Above the main table, there are 3 statistic cards that keep track of the amount of IPs scanned, the amount of open ports found, and the amount of CVEs detected. 

Along with these values, there are percentages that go along with them. These percentages will update based on prior day data versus current day data. A positive value means the value went up, a negative value means the value went down.

## The Main Table

The main table has a variety of values for each column that it keeps track of for each scanned IP.
- ID of the row (this is needed due to the data object used for the table, but it is also useful for organization)
- Scanner that found the CVE (useful for when multiple vulnerability scanners are used)
- Scan source (the IP of the scanned host)
- Date the IP was scanned
- Protocol the CVE was involved with
- Service the CVE was involved with
- Product the CVE was found on
- CVE ID
- CVE Description
- Other information (essentially the previous values but in one large information dump)

## General Information
Some values may be long and won't fit in their respective column. Hovering over these values with the mouse cursor allows the entire value to be visible.

These columns can be sorted from greatest to least or least to greatest by clicking on the respective column header.

At the end of each row, there is an edit and delete button for that particular row. The delete button will delete the row visually for that instance. But, when the table is refreshed, it will be back and still be present in the database. The edit button only allows the user to edit the date for the row for that instance. But, when the table is refreshed, it will revert to the old date and still be the old date in the database.

There is a search bar in the upper right-hand corner of the table. This search allows the user to select a date and search for a specific value (a specific IP, a specific scanner, etc). 







