import json
import csv
import sys

# Check that the right arguments are provided
if len(sys.argv) != 3:
    print("Usage: python3 json2csv.py <input_json_file> <output_csv_file>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

# Read JSON data
with open(input_file, 'r') as json_file:
    data = json.load(json_file)

# Check if data is in the correct format (a list of dictionaries)
if isinstance(data, list) and all(isinstance(item, dict) for item in data):
    # Get headers from the first dictionary's keys
    headers = data[0].keys()

    # Write CSV data
    with open(output_file, 'w', newline='') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=headers)
        writer.writeheader()
        writer.writerows(data)

    print(f"Converted {input_file} to {output_file}")
else:
    print("JSON data is not in the expected format: a list of dictionaries.")
    sys.exit(1)