# Script Documentation: Transfer data from all scanners to main table

This is documentation for the script `scanner_main.py`. This script will take the data from the the scanner table, currently spiderfoot and vulscan, and add it to the main table.

# Step 1: Set up the connection

The `conn` value is what will make the connection to the postgres database, using the database name, username, password, host, and port. Then a `cursor` is made with teh connection in order let python execute commands agenst the database.

# Step 2: Setting up the Select Query and Execute

The `select_query` varaible is how the python script will get the data from the table. The query will `select *` from the table that is having its data transfered so that all the data from the table is being added to the main table.

Once the query is made it is then executed with the `cursor`. We assign all the data fetched from the `cursor.fetall()` to a value called `data`. After that we cna go through all the data that was selected from the table with a for loop.

# Step 3: Getting the data and Inserting into the main_table

As the for loop is going through all the rows of the data from the query, we cna grab parts of the data to make the new data to add to the main table. In order to do this we can use the `row` that the for loop is currently on, and access a specific column by using the columns index. For example, if the ip column is the first column on the table then that would be `row[0]` (it does start at zero). That can be used to set up the data for the `main_table`. There is `scanner` this will be the name of the scanner that is being transfered. Thent he `scan_source` this is to store what is being scanned, in this case it will be a ip address and sometimes a port depending on the scanner. Next is the `scan_date` this is the date to help with organization on the dashboard. Finally the `scan_info` this will be what the scanner pulled from its scan on the ip. Once all the data is set up as the user wants then the insert query is made.

This insert query is stored in the value `insert_query`. This query will have the headers that are in the `main_table` table. Then the values are labeled with the `%s` these will be replaced later with the values set before when the query is executed. For a insert query the execute is a bit different, `cursor.execute(insert_query, (scanner, scan_source, scan_date, scan_info))`. For the execute query the query is give as well as the datat that needs to be inserted in for the `%s`.

# Step 4: Next Scanner

After the for loop is done for that one scanner if there are more the `select_query` will chnage for the next scanner and follow the same steps as before. Once all the scanners are inserted into the `main_table` then the cursor will be closed and therefor the connection as well.