import { useRef } from 'react';
import { fontFamily } from 'theme/typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EChartsReactCore from 'echarts-for-react/lib/core';
import VisitorsChartLegends from './VisitorsChartLegends';
import TotalCVEChart from './TotalCVEsChart';

const WebsiteVisitors = () => {
  const chartRef = useRef<EChartsReactCore>(null);

  return (
    <Paper sx={{ height: 500 }}>
      {/* header */}
      <Stack alignItems="center" justifyContent="space-between" mb={-2}>
        <Typography variant="h6" fontWeight={400} fontFamily={fontFamily.workSans}>
          Total CVEs
        </Typography>
      </Stack>

      {/* polar bar chart */}
      <TotalCVEChart chartRef={chartRef} />

      {/* legends */}
      <VisitorsChartLegends chartRef={chartRef} />
    </Paper>
  );
};

export default WebsiteVisitors;
