import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import VisitorsChartLegend from './VisitorsChartLegend';
import EChartsReactCore from 'echarts-for-react/lib/core';

interface LegendsProps {
  chartRef: React.RefObject<EChartsReactCore>;
}

export const legendsData = [
  {
    id: 1,
    type: 'Critical',
    rate: '80%',
  },
  {
    id: 2,
    type: 'High',
    rate: '55%',
  },
  {
    id: 3,
    type: 'Medium',
    rate: '70%',
  },
  {
    id: 4,
    type: 'Low',
    rate: '40%',
  },
];

const VisitorsChartLegends = ({ chartRef }: LegendsProps) => {
  const theme = useTheme();
  const [toggleColor, setToggleColor] = useState({
    Critical: true,
    High: true,
    Medium: true,
    Low: true,
  });

  useEffect(() => {
    const handleBodyClick = (e: MouseEvent) => {
      handleToggleLegend(e as unknown as React.MouseEvent, null);
    };
    document.body.addEventListener('click', handleBodyClick);
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const getActiveColor = (type: string) => {
    if (type === 'Critical') {
      return theme.palette.primary.main;
    } else if (type === 'High') {
      return theme.palette.secondary.main;
    } else if (type === 'Medium') {
      return theme.palette.secondary.lighter;
    } else if (type === 'Low') {
      return theme.palette.neutral.main;
    }
  };

  const getDisableColor = (type: string) => {
    if (type === 'Critical') {
      return theme.palette.primary.dark;
    } else if (type === 'High') {
      return theme.palette.secondary.darker;
    } else if (type === 'Medium') {
      return theme.palette.secondary.dark;
    } else if (type === 'Low') {
      return theme.palette.neutral.darker;
    }
  };

  const handleToggleLegend = (e: React.MouseEvent, type: string | null) => {
    e.stopPropagation();
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (!echartsInstance) return;

    const option = echartsInstance.getOption() as echarts.EChartsOption;

    if (type === 'Critical') {
      setToggleColor({ Critical: true, High: false, Medium: false, Low: false });
    } else if (type === 'High') {
      setToggleColor({ Critical: false, High: true, Medium: false, Low: false });
    } else if (type === 'Medium') {
      setToggleColor({ Critical: false, High: false, Medium: true, Low: false });
    } else if (type === 'Low') {
      setToggleColor({ Critical: false, High: false, Medium: false, Low: true });
    } else {
      setToggleColor({ Critical: true, High: true, Medium: true, Low: true });
    }

    if (Array.isArray(option.series)) {
      const series = option.series.map((s) => {
        if (Array.isArray(s.data)) {
          s.data.forEach((item) => {
            if (type !== null && item.itemStyle && item.itemStyle.color) {
              if (type === item.type) {
                item.itemStyle.color = getActiveColor(item.type);
              } else {
                item.itemStyle.color = getDisableColor(item.type);
              }
            } else {
              item.itemStyle.color = getActiveColor(item.type);
            }
          });
        }
        return s;
      });

      echartsInstance.setOption({ series });
    }
  };

  return (
    <Stack mt={-1} spacing={1.5} direction="column">
      {legendsData.map((item) => (
        <VisitorsChartLegend
          key={item.id}
          data={item}
          toggleColor={toggleColor}
          handleToggleLegend={handleToggleLegend}
        />
      ))}
    </Stack>
  );
};

export default VisitorsChartLegends;
