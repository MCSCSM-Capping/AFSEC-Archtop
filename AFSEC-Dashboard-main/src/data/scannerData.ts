import { GridRowsProp } from '@mui/x-data-grid';
// import { formatNumber } from 'functions/formatNumber';
import type { dataInterface } from './dataInterface'
import React, { useState, useEffect } from 'react';

export async function getData(): Promise<dataInterface[]> {
  const request = await fetch('http://localhost:3001/api/main_table')
  const data = await request.json()
  return data
}

// testing
(async () => {
  try {
    const data = await getData();
    console.log('Fetched data:', data);
    
    if (data.length > 0) {
      console.log('Data is holding:', data);
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

export async function data2Grid(){
  const scannerData: GridRowsProp = [];
  const [rows, setRows] = React.useState(scannerData);

  for (let i = 0; i < data.length; i++) {
              const newRow = {
                id: rows.length + 1,
                scanner: data[i]["payment_address"],
                scan_source:
                scan_date:
                scan_info:
              };
              setRows((prevRows) => [...prevRows, newRow]);
  }

  <DataGrid rows = scannerData.map((item) => ({
    id: i + 1,
    scanner: item.scanner,
    scan_source: item.scan_source,
    scan_date: item.scan_date,
    scan_info: item.scan_info
  }))
}





