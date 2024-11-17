import { GridRowsProp } from '@mui/x-data-grid';
// import { formatNumber } from 'functions/formatNumber';
import type { dataInterface } from './dataInterface'

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

// Scan data
export const scannerData: GridRowsProp = [
  {
    id: 'Vulscan',
    scanSource: 'ip + port',
    date: new Date('Jan 30, 2024'),
    scanInfo: 'The Cisco Small Business 200 Series Smart Switch 1.2.7.76 and earlier, Small Business 300 Series Managed Switch 1.2.7.76 and earlier, and Small Business 500 Series Stackable Managed Switch 1.2.7.76 and earlier allow remote attackers to cause a denial of service (SSL/TLS layer outage) via malformed (1) SSH or (2) SSL packets, aka Bug ID CSCua30246. - Link:  (5)',
  },
];
