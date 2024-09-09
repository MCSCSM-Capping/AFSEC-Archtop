import { fontFamily } from 'theme/typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

interface LegendProps {
  data: {
    id: number;
    type: string;
  };
  toggleColor: {
    low: boolean;
    medium: boolean;
    high: boolean;
    critical: boolean;
  };
  handleLegendToggle: (seriesName: string) => void;
}

const RevenueChartLegend = ({ data, toggleColor, handleLegendToggle }: LegendProps) => {
  let color = '';

  if (toggleColor.low && data.type === 'Low') {
    color = 'neutral.main';
  } else if (toggleColor.medium && data.type === 'Medium') {
    color = 'secondary.lighter';
  } else if (toggleColor.high && data.type === 'High') {
    color = 'secondary.light';
  } else if (toggleColor.critical && data.type === 'Critical') {
    color = 'primary.main';
  } else {
    color = 'text.secondary';
  }

  return (
    <ButtonBase onClick={() => handleLegendToggle(data.type)} disableRipple>
      <Stack spacing={0.5} alignItems="center">
        <Box height={8} width={8} bgcolor={color} borderRadius={1} />
        <Typography variant="body2" color="text.secondary" fontFamily={fontFamily.workSans}>
          {data.type}
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

export default RevenueChartLegend;
