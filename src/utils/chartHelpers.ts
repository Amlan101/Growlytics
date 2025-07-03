import { IntradayDataPoint } from 'models/Stock';

export const generateChartLabels = (chartData: IntradayDataPoint[]): string[] => {
  if (!chartData || chartData.length === 0) return [];
  
  const labelInterval = Math.floor(chartData.length / 6);
  
  return chartData.map((point, index) => 
    index % labelInterval === 0
      ? point.timestamp.split(' ')[1]?.slice(0, 5) || ''
      : ''
  );
};

export const extractChartValues = (chartData: IntradayDataPoint[]): number[] => {
  return chartData.map(point => point.close);
};

export interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
  }>;
}

export const transformChartData = (chartData: IntradayDataPoint[] | null): ChartData | null => {
  if (!chartData || chartData.length === 0) {
    return null;
  }

  return {
    labels: generateChartLabels(chartData),
    datasets: [
      {
        data: extractChartValues(chartData),
      },
    ],
  };
};