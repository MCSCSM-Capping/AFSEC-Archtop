import { GridRowsProp } from '@mui/x-data-grid';
import type { dataInterface } from './dataInterface'

export async function getData(): Promise<dataInterface[]> {
  //connection is not currently working right now also it wont be local host when it is actually deployed
  const request = await fetch('http://localhost:3001/api/main_table')
  const data = await request.json()
  return data
}

export let scannerData: GridRowsProp = []; //empty table prop

// continuously fetch api data
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

// function to map the fetched data into the gridrowsprop format
export function data2Grid(data: dataInterface[]): GridRowsProp {
  return data.map((item, index) => ({
    id: index + 1,
    scanner: item.scanner,
    scanSource: item.scan_source,
    date: new Date(item.scan_date),
    scanInfo: item.scan_info,
   }));
}





