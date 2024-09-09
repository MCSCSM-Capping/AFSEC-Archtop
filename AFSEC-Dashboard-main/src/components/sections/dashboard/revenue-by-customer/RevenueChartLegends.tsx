import { useState } from 'react';
import { revenueData } from './index';
import Stack from '@mui/material/Stack';
import EChartsReactCore from 'echarts-for-react/lib/core';
import RevenueChartLegend from './RevenueChartLegend';

interface LegendsProps {
  chartRef: React.RefObject<EChartsReactCore>;
  sm?: boolean; // check smaller screen or not
}

const legendsData = [
  {
    id: 1,
    type: 'Low',
  },
  {
    id: 2,
    type: 'Medium',
  },
  {
    id: 3,
    type: 'High',
  },
  {
    id: 4,
    type: 'Critical',
  },
];

const RevenueChartLegends = ({ chartRef, sm }: LegendsProps) => {
  const [toggleColor, setToggleColor] = useState({
    low: true,
    medium: true,
    high: true,
    critical: true,
  });

  const handleLegendToggle = (seriesName: string) => {
    const echartsInstance = chartRef.current?.getEchartsInstance();
    if (!echartsInstance) return;

    if (seriesName === 'Low') {
      setToggleColor({ ...toggleColor, low: !toggleColor.low });
    } else if (seriesName === 'Medium') {
      setToggleColor({ ...toggleColor, medium: !toggleColor.medium });
    } else if (seriesName === 'High') {
      setToggleColor({ ...toggleColor, high: !toggleColor.high });
    } else if (seriesName === 'Critical') {
      setToggleColor({ ...toggleColor, critical: !toggleColor.critical });
    }

    const option = echartsInstance.getOption() as echarts.EChartsOption;

    if (Array.isArray(option.series)) {
      const series = option.series.map((s) => {
        if (s.name === seriesName && s.type === 'bar') {
          const isBarVisible = (s.data as number[]).some((value) => value !== 0);
          return {
            ...s,
            data: isBarVisible
              ? (s.data as number[]).map(() => 0)
              : revenueData.series.find((s) => s.name === seriesName)?.data || [],
          };
        }
        return s;
      });
      echartsInstance.setOption({ series });
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent={sm ? 'center' : 'flex-start'}
      spacing={2}
      pt={sm ? 3 : 0}
      width={sm ? 1 : 'auto'}
    >
      {legendsData.map((item) => (
        <RevenueChartLegend
          key={item.id}
          data={item}
          toggleColor={toggleColor}
          handleLegendToggle={handleLegendToggle}
        />
      ))}
    </Stack>
  );
};

export default RevenueChartLegends;
