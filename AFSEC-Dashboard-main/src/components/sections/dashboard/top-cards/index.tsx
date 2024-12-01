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
  const cvePercentage = 0;

  // Map to track unique ip's and ports
  const ipMap = new Map<string, Set<number>>(); 
  
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item && item.scan_source) {
      // Split the IP and the port
      const [ip, portString] = item.scan_source.split(" : ");
      // Parse port if it exists
      const port = portString ? parseInt(portString, 10) : null; 
  
      // If the IP is not in the map, add it with a new Set for ports
      if (!ipMap.has(ip)) {
        console.log("new ip: " + ip);
        ipMap.set(ip, new Set());
        ipsScanned++;
      }
  
      // Deal with ports if they exist
      if (port !== null) {

        // Obtain all of the current ports
        const ports = ipMap.get(ip)!;
        
        // If the port is new for this IP, add it
        if (!ports.has(port)) {
          console.log("new port:" + port);
          ports.add(port);
          openPorts++;
        }
      }
    }
  }

  // Initalizing previous values 
  const [ipsScanned_PREV, setIpsScanned_PREV] = useState(0);
  const [openPorts_PREV, setOpenPorts_PREV] = useState(0);
  const [cvesDetected_PREV, setCvesDetected_PREV] = useState(0);

  console.log(ipsScanned_PREV);
  console.log(openPorts_PREV);
  console.log(cvesDetected_PREV);

  // Calculate rates
  const ipsScanned_RATE = ((ipsScanned - ipsScanned_PREV) / ipsScanned_PREV) * 100;
  const openPorts_RATE = ((openPorts - openPorts_PREV) / openPorts_PREV) * 100;
  const cvesDetected_RATE = ((cvesDetected - cvesDetected_PREV) / cvesDetected_PREV) * 100;

  // Update previous values
  useEffect(() => {
    setIpsScanned_PREV(ipsScanned);
    setOpenPorts_PREV(openPorts);
    setCvesDetected_PREV(cvesDetected);
  }, [ipsScanned, openPorts, cvesDetected]);
  

  // Statistics at the top of the table
  const cardsData = [
    // IPS Scanned
    {
      id: 1,
      title: 'IPs Scanned',
      value: ipsScanned,
      rate: ipsScanned_RATE.toString() + '%',
      isUp: true,
      icon: 'mingcute:world-2-fill',
    },
    // Open ports found
    {
      id: 2,
      title: 'Open Ports',
      value: openPorts,
      rate: openPorts_RATE.toString() + '%',
      isUp: false,
      icon: 'mingcute:target-fill',
    },
    // CVEs detected
    {
      id: 3,
      title: 'CVEs Detected',
      value: cvesDetected,
      rate: cvesDetected_RATE.toString() + '%',
      isUp: true,
      icon: 'mingcute:report-fill',
    },
    // CVE percentage
    // {
    //   id: 4,
    //   title: 'CVE Percentage',
    //   value: cvePercentage,
    //   rate: cvesDetected_RATE.toString() + '%',
    //   isUp: true,
    //   icon: 'mingcute:heartbeat-fill',
    // },
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
