import { GridRowsProp } from '@mui/x-data-grid';
import type { dataInterface } from './dataInterface'

export let scannerData: GridRowsProp = [];
apiCall();  // initial api call
setInterval(apiCall, 300000); // interval to dynamically call the api every 5 minutes

// calls getData and data2Grid
async function apiCall(){
  try {
    const data = await getData();
    console.log('Fetched data:', data);
    
    if (data.length > 0) {
      console.log('Data is holding:', data);

      scannerData = data2Grid(data);
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function parsing(index:number, data:string): string {
  let parse = "";
  const regex = /:/g;

  const instance = index; 
  let counter = 0; 

  for (const match of data.matchAll(regex)) {
      counter++;
      if (counter === instance) {
          const start = match.index + 1; 
          const end = data.indexOf(":", start); 
          parse = data.substring(start, end); 
          break; 
      }
  }
  
  console.log(parse)  
  if(parse === ''|| parse === " "){
    parse = "N/A"
    console.log(parse)
  }
  return parse;
}

// grabs json from api
export async function getData(): Promise<dataInterface[]> {
  const request = await fetch('http://localhost:3001/api/main_table')
  const data = await request.json()
  return data
}

// maps data from json to table format
function data2Grid(data: dataInterface[]){
  return data.map((item, index) => ({
    id: index + 1,
    scanner: item.scanner,
    scan_source: item.scan_source,
    scan_date: new Date(item.scan_date),
    protocol: parsing(1, item.scan_info),
    service: parsing(2, item.scan_info),
    product: parsing(3, item.scan_info),
    cve: parsing(4, item.scan_info),
    title: parsing(5, item.scan_info),
    scan_info: item.scan_info,

    // below is not added in yet but these should be ideally mapped as well
    /*
    scan_ip: string
    scan_port: string
    scan_protocol: string
    scan_service: string
    scan_product: string
    scan_cve_id: string
    scan_title: string
    */
   }));
}
