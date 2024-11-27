#!/usr/bin/env python3

# goes through the scanner tables and gets the info from those tables and adds it to the main table of the dashboard to interact with
import psycopg2


def main():
    user = "postgres"   # postgresql user
    db = "afsec"    # postgresql database
    scanner = "" # the scanner we are getting the info from 
    scan_source = "" # the ip and or port that is being scanned
    scan_date = "" # the date of the scan
    scan_info = "" # the actual info in the scan, CVE, specific data and such

    # connect to the postgresql db
    conn = psycopg2.connect(database = db,
                        user = user,
                        password = "capping2024",
                        host = "localhost",
                        port = "5432")
    cursor = conn.cursor()

    # the query that will be executed
    select_query = """SELECT * FROM vulscan_data;"""

    # executes the query agentst the connected database
    cursor.execute(select_query)

    # get the data from the executed database
    data = cursor.fetchall()

    # output to user to make sure that the user knows what step the db is on
    print("Starting move to Vulscan")

    for row in data:
        # either vulscan or spiderfoot
        scanner = "Vulscan"
        # vulscan: ip + port
        scan_source = row[0] + " : " + row[4]
        # vulscan: scan_date
        scan_date = row[9]
        # vulscan: host + os + protocol + service + product + id + title
        scan_info = row[1] + " : " + row[2] + " : " + row[3] + " : " + row[5] + " : " + row[6] + " : " + row[7] +  " : " + row[8] + " : "

        # the new insert query to insert the data into the main table
        insert_query = """INSERT INTO main_table (scanner, scan_source, scan_date, scan_info) VALUES (%s, %s, %s, %s);"""

        # execute the query agents the database (inserting the dats from the vulscan table to the main table)
        cursor.execute(insert_query, (scanner, scan_source, scan_date, scan_info))

        #commits any pending transactions to the database
        conn.commit()

    # prints out to the user that vulscan is done
    print("Done with Vulscan")

    # the query that will be executed
    select_query = """SELECT * FROM spiderfoot_data;"""

    # executes the query agentst the connected database
    cursor.execute(select_query)

    # get the data from the executed database
    data = cursor.fetchall()

    # output to user to make sure that the user knows what step the db is on
    print("Starting move to Spiderfoot")

    for row in data:
        # either vulscan or spiderfoot
        scanner = "Spiderfoot"
        # spiderfoot:
        scan_source = row[3]
        # spiderfoot:
        scan_date = row[4]
        # spiderfoot:
        scan_info = row[0] + " : " + row[1] + " : " + row[2] + " : "

        # the new insert query to insert the data into the main table
        insert_query = """INSERT INTO main_table (scanner, scan_source, scan_date, scan_info) VALUES (%s, %s, %s, %s);"""

        # execute the query agents the database (inserting the dats from the vulscan table to the main table)
        cursor.execute(insert_query, (scanner, scan_source, scan_date, scan_info))

        #commits any pending transactions to the database
        conn.commit()

    # prints out to the user that vulscan is done
    print("Done with Spiderfoot")

    # prints out to the user that vulscan is done
    print("Done with transfering data to main table. Closing connection")

    # closes the connection
    cursor.close()


# start script
if __name__ == "__main__":
    main()
