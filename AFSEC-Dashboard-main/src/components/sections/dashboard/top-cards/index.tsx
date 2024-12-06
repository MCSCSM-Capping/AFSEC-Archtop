import Grid from '@mui/material/Grid';
import TopCard from './TopCard';
import { useEffect, useState } from 'react';
import { scannerData } from 'data/scannerData';
import { GridRowsProp } from '@mui/x-data-grid';


// Obtaining scanner data
const useScannerData = (): GridRowsProp => {
  const [data, setData] = useState<GridRowsProp>([]);

  useEffect(() => {
    // Set data from scannerData
    setData([...scannerData]);

    // Dynamically updating scannerData every 5mins in case of changes
    const interval = setInterval(() => {
      setData([...scannerData]);
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return data;
};

// Creating each card
const TopCards = () => {
  // Obtaining scannerData
  const data = useScannerData();
  console.log(data);

  // Values for the cards
  let ipsScanned = 0;
  let openPorts = 0;
  const cvesDetected = data.length;

  // Today's date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayScan = month + '/' + day + '/' + year;

  // Yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayYear = yesterday.getFullYear();
  const yesterdayMonth = String(yesterday.getMonth() + 1).padStart(2, '0');
  const yesterdayDay = String(yesterday.getDate()).padStart(2, '0');
  const yesterdayScan = yesterdayMonth + '/' + yesterdayDay + '/' + yesterdayYear;

  // Arrays to track statistics
  const todayIPs: Array<object> = [];
  const yesterdayIPs: Array<object> = [];

  const todayPorts: Array<object> = [];
  const yesterdayPorts: Array<object> = [];

  const todayCVEs: Array<object> = [];
  const yesterdayCVEs: Array<object> = [];

  // Map to track unique ip's and ports
  const ipMap = new Map<string, Set<number>>(); 
  
  // Find new ip's and ports
  // Also finds their dates for the % rate
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    // Date of the item
    const itemDate = new Date(item.scan_date);
    const formattedDate = [
      String(itemDate.getMonth() + 1).padStart(2, '0'),
      String(itemDate.getDate()).padStart(2, '0'),
      itemDate.getFullYear(),           
    ].join('/'); 


    if (item && item.scan_source) {
      // Split the IP and the port
      const [ip, portString] = item.scan_source.split(" : ");
      // Parse port if it exists
      const port = portString ? parseInt(portString, 10) : null; 
  
      // If the IP is not in the map, add it with a new Set for ports
      if (!ipMap.has(ip)) {
        ipMap.set(ip, new Set());
        ipsScanned++;

        // Add to the ips date array for statistics
        if (formattedDate === todayScan){
          todayIPs.push(item);
        }
        if (formattedDate === yesterdayScan){
          yesterdayIPs.push(item);
        }
      }
  
      // Deal with ports if they exist
      if (port !== null) {

        // Obtain all of the current ports
        const ports = ipMap.get(ip)!;
        
        // If the port is new for this IP, add it
        if (!ports.has(port)) {
          ports.add(port);
          openPorts++;
          
          // Add to the ports date array for statistics
          if (formattedDate === todayScan){
            todayPorts.push(item);
          }
          if (formattedDate === yesterdayScan){
            yesterdayPorts.push(item);
          }
        }
      }
    }
  }

  // Getting the scanned data from yesterday and also today's current data
  for (let i = 0; i < data.length; i++){
    const item = data[i];
    const itemDate = new Date(item.scan_date);

    const formattedDate = [
      String(itemDate.getMonth() + 1).padStart(2, '0'),
      String(itemDate.getDate()).padStart(2, '0'),
      itemDate.getFullYear(),           
    ].join('/'); 

    if (formattedDate === todayScan){
      todayCVEs.push(item);
    }
    if (formattedDate === yesterdayScan){
      yesterdayCVEs.push(item);
    }
  }

  // So we don't get undefined values
  // IP's scanned rate
  let ipsScanned_RATE;
  if(yesterdayIPs.length === 0){
    ipsScanned_RATE = 0;
  }
  else{
    ipsScanned_RATE = ((todayIPs.length - yesterdayIPs.length) / yesterdayIPs.length) * 100;
  }

  // Open Ports rate
  let openPorts_RATE;
  if(yesterdayPorts.length === 0){
    openPorts_RATE = 0;
  }
  else{
    openPorts_RATE = ((todayPorts.length - yesterdayPorts.length) / yesterdayPorts.length) * 100;
  }

  // Detected CVEs rate
  let cvesDetected_RATE;
  if(yesterdayCVEs.length === 0){
    cvesDetected_RATE = 0;
  }
  else{
    cvesDetected_RATE = ((todayCVEs.length - yesterdayCVEs.length) / yesterdayCVEs.length) * 100;
  }

  // Changing rate visual on cards
  let upRateIPs = true;
  let upRatePorts = true;
  let upRateCVEs = true;
  if(ipsScanned_RATE < 0){
    upRateIPs = false;
  }
  if(ipsScanned_RATE > 0 ){
    upRateIPs = true;
  }
  if(openPorts_RATE < 0 ){
    upRatePorts = false;
  }
  if(openPorts_RATE > 0 ){
    upRatePorts = true;
  }
  if(cvesDetected_RATE < 0 ){
    upRateCVEs = false;
  }
  if(cvesDetected_RATE > 0 ){
    upRateCVEs = true;
  }

  // Statistics at the top of the table
  const cardsData = [
    // IPS Scanned
    {
      id: 1,
      title: 'IPs Scanned',
      value: ipsScanned,
      rate: ipsScanned_RATE.toString() + '%',
      isUp: upRateIPs,
      icon: 'mingcute:world-2-fill',
    },
    // Open ports found
    {
      id: 2,
      title: 'Open Ports',
      value: openPorts,
      rate: openPorts_RATE.toString() + '%',
      isUp: upRatePorts,
      icon: 'mingcute:target-fill',
    },
    // CVEs detected
    {
      id: 3,
      title: 'CVEs Detected',
      value: cvesDetected,
      rate: cvesDetected_RATE.toString() + '%',
      isUp: upRateCVEs,
      icon: 'mingcute:report-fill',
    },
  ];

  return (
    <Grid container spacing={{ xs: 2.5, sm: 3, lg: 3.75 }}>
      {cardsData.map((item) => {
        return (
          <TopCard
            key={item.id}
            title={item.title}
            value={item.value}
            rate={item.rate}
            isUp={item.isUp}
            icon={item.icon}
          />
        );
      })}
    </Grid>
  );
};

export default TopCards;
