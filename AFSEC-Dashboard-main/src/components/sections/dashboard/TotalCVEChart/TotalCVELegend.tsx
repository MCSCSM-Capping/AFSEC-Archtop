import { fontFamily } from 'theme/typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

interface LegendProps {
  data: {
    id: number;
    type: string;
    rate: string;
  };
  toggleColor: {
    Critical: boolean;
    High: boolean;
    Medium: boolean;
    Low: boolean;
  };
  handleToggleLegend: (e: React.MouseEvent<HTMLButtonElement>, type: string | null) => void;
}

const TotalCVELegend = ({ data, toggleColor, handleToggleLegend }: LegendProps) => {
  let color = '';

  if (toggleColor.Critical && data.type === 'Critical') {
    color = 'primary.main';
  } else if (toggleColor.High && data.type === 'High') {
    color = 'secondary.main';
  } else if (toggleColor.Medium && data.type === 'Medium') {
    color = 'secondary.lighter';
  } else if (toggleColor.Low && data.type === 'Low') {
    color = 'neutral.main';
  } else {
    color = 'text.secondary';
  }

  return (
    <Stack alignItems="center" justifyContent="space-between">
      <ButtonBase onClick={(e) => handleToggleLegend(e, data.type)} disableRipple>
        <Stack spacing={1} alignItems="center">
          <Box height={8} width={8} bgcolor={color} borderRadius={1} />
          <Typography variant="body1" color="text.secondary" fontFamily={fontFamily.workSans}>
            {data.type}
          </Typography>
        </Stack>
      </ButtonBase>
      <Typography variant="body1" color="text.primary" fontFamily={fontFamily.workSans}>
        {data.rate}
      </Typography>
    </Stack>
  );
};

export default TotalCVELegend;
