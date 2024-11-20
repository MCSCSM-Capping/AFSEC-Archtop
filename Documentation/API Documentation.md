# API Information

## How to Start up the API

### Start a new terminal window

### Change directory to the pg-api folder
```bash
cd \developer\home\AFSEC-Archtop\pg-api
```

### Launch the server file
```bash
node server.js
```

## Endpoints
	There are currently only 3 endpoints created for API access.
	
	These 2 are for testing:
	### Launch a new browser window after the API has been started
	Navigate to: 
		1. http://localhost:3001
			* This is a blanket page that when called displays the message 'hello world'
		2. http://localhost:3001/test-db
			* This returns a json response showing whether or not the API's connection to the PostgreSQL database was successful
			
	### Endpoint for accessing the main_table
		1. http://localhost:3001/api/main_table
			* This endpoint simply does a SELECT \* on the table and returns the query in json format
