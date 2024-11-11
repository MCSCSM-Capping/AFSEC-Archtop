#!/usr/bin/env python3

# goes through each csv in the output directory. Moves specific information into the vulscan_data db.

import os
from datetime import date
import re
import psycopg2


def main():
    cur_date = date.today().isoformat()
    csv_dir = f"/home/developer/vulscan/vulscan-results/{cur_date}" # path to output folder for scan results
    user = "postgres"   # postgresql user
    db = "afsec"    # postgresql database
    table = "vulscan_data"  # postgresql table
    id_pattern = r"ID:(.*)- Title:"
    title_pattern = r"Title:(.*)- Link:"
    scaner = ""
    scan_source = ""
    scan_date = ""
    scan_info = ""

    # connect to the postgresql db
    conn = psycopg2.connect(database = db,
                        user = user,
                        password = "capping2024",
                        host = "localhost",
                        port = "5432")
    cursor = conn.cursor()

    select_query = """SELECT * FROM vulscan_data;"""

    cursor.execute(select_query)

    data = cursor.fetchall()

    for row in data:
        # either vulscan or spiderfoot
        scanner = "Vulscan"
        # vulscan: ip + port
        scan_source = row[0] + " : " + row[4]
        # vulscan: scan_date
        scan_date = row[9]
        # vulscan: host + os + protocol + service + product + id + title
        scan_info = row[1] + " : " + row[2] + " : " + row[3] + " : " + row[5] + " : " + row[6] + " : " + row[7] +  " : " + row[8]

        insert_query = """INSERT INTO main_table (scanner, scan_source, scan_date, scan_info) VALUES (%s, %s, %s, %s);"""

        cursor.execute(insert_query, (scanner, scan_source, scan_date, scan_info))

        conn.commit()

        cursor.close()


