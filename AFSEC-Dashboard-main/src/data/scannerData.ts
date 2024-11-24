import { GridRowsProp } from '@mui/x-data-grid';
import type { dataInterface } from './dataInterface'

// grabs json from api
export async function getData(): Promise<dataInterface[]> {
  const request = await fetch('http://localhost:3001/api/main_table')
  const data = await request.json()
  return data
}

export let scannerData: GridRowsProp = [];

// calls getData and data2Grid
(async () => {
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
})();

// maps data from json to table format
function data2Grid(data: dataInterface[]){
  return data.map((item, index) => ({
    id: index + 1,
    scanner: item.scanner,
    scan_source: item.scan_source,
    scan_date: new Date(item.scan_date),
    scan_info: item.scan_info,
   }));
}
