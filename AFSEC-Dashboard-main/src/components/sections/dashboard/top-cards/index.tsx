import Grid from '@mui/material/Grid';
import TopCard from './TopCard';

// Statistics at the top of the table
const cardsData = [
  // IPS Scanned
  {
    id: 1,
    title: 'IPs Scanned',
    value: '51.8K',
    rate: '28.4%',
    isUp: true,
    icon: 'mingcute:world-2-fill',
  },
  // Open ports found
  {
    id: 2,
    title: 'Open Ports',
    value: '3.6K',
    rate: '12.6%',
    isUp: false,
    icon: 'mingcute:target-fill',
  },
  // CVEs detected
  {
    id: 3,
    title: 'CVEs Detected',
    value: '756',
    rate: '3.1%',
    isUp: true,
    icon: 'mingcute:report-fill',
  },
  // CVE percentage
  {
    id: 4,
    title: 'CVE Percentage',
    value: '1.49%',
    rate: '3.1%',
    isUp: true,
    icon: 'mingcute:heartbeat-fill',
  },
];

// Creating each card
const TopCards = () => {
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
