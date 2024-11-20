import { GridRowsProp } from '@mui/x-data-grid';
// import { formatNumber } from 'functions/formatNumber';
import type { dataInterface } from './dataInterface'
//import React from 'react';

export async function getData(): Promise<dataInterface[]> {
  //connection is not currently working right now also it wont be local host when it is actually deployed
  const request = await fetch('http://localhost:3001/api/main_table')
  const data = await request.json()
  return data
}

export let scannerData: GridRowsProp = [];

// testing
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


//json has multiple objects
//each object has scanner scan_source, scan_date, scan_info
//can parse with var obj = JSON.parse(filter);
//with each obj add it as a prop


/*
Sorin

From the stack overflow link
https://stackoverflow.com/questions/75213694/how-to-auto-increment-row-id-when-inserting-new-row-in-mui-data-grid

this top half is here but in OrdersStatusTable.tsx the bottom half of this is already set up
i think that the work it getting put in the wrong places for sure
they all ready have a way to load up all this data there is the DataGrid thing at the bottom of file mentioned


idea:
move the data block to the other file
or move all this stuff to the old file and add it over there not sure what the best solution is


*/

//what type is data
//one that matches the format of the table but cause a wild amount of hook errors and such
/*function data2Grid(data: dataInterface[]){
  return data.map((item) => ({
    id: item.scanner,
    scanSource: item.scan_source,
    date: item.scan_date,
    scanInfo: item.scan_info,
   }));
}*/

//no hook error but does not load it in to the dashboard
function data2Grid(data: dataInterface[]){
  return data.map((item, index) => ({
    id: index + 1,
    scanner: item.scanner,
    scan_source: item.scan_source,
    scan_date: item.scan_date,
    scan_info: item.scan_info,
   }));
}






