import { GridRowsProp } from '@mui/x-data-grid';
// import { formatNumber } from 'functions/formatNumber';
import type { dataInterface } from './dataInterface'
//import React from 'react';

export async function getData(): Promise<dataInterface[]> {
  //connection is not currently working right now also it wont be local host when it is actually deployed
  const request = await fetch('http://localhost:3001/api/main_table')
  return await request.json()
}

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

export let scannerData: GridRowsProp = []; //empty table prop

// continuously fetch api data
(async () => {
  try {
    const fetcheddata = await getData();
    if (fetcheddata.length > 0) {
      console.log('Data check:', fetcheddata);
      scannerData = data2Grid(fetcheddata);
    } else {
      console.log('No data found.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();