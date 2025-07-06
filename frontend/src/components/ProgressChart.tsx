import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

type ChartType = 'line' | 'bar';

interface ChartDataPoint {
  date: string;
  value: number;
}

interface Dataset {
  name: string;
  values: ChartDataPoint[];
  color?: string;
}

interface ProgressChartProps {
  type: ChartType;
  data: Dataset[] | ChartDataPoint[];
  colors?: string[];
  yLabel?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  type,
  data,
  colors = ['#f97316', '#ef4444'],
  yLabel,
}) => {
  // Format dates for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Prepare data based on chart type
  const chartData = {
    labels:
      Array.isArray(data) && data.length > 0
        ? data.map((d: any) =>
            formatDate('date' in d ? d.date : d.values[0]?.date),
          )
        : ['No data yet'],
    datasets:
      Array.isArray(data) && 'name' in data[0]
        ? (data as Dataset[]).map((dataset, i) => ({
            label: dataset.name,
            data: dataset.values.map((v) => v.value),
            backgroundColor: dataset.color || colors[i % colors.length],
            borderColor: dataset.color || colors[i % colors.length],
            borderWidth: 2,
            tension: type === 'line' ? 0.3 : undefined,
            fill: type === 'line',
          }))
        : [
            {
              label: yLabel || 'Value',
              data: (data as ChartDataPoint[]).map((d) => d.value),
              backgroundColor: colors[0],
              borderColor: colors[0],
              borderWidth: 2,
              tension: type === 'line' ? 0.3 : undefined,
              fill: type === 'line',
            },
          ],
  };

  const options: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e5e7eb',
          font: {
            size: 14,
            weight: 'bold' as const,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#f3f4f6',
        bodyColor: '#e5e7eb',
        borderColor: '#4b5563',
        borderWidth: 1,
        padding: 12,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
        title: {
          display: !!yLabel,
          text: yLabel,
          color: '#9ca3af',
        },
      },
    },
  };

  return (
    <div className="h-80">
      {type === 'line' ? (
        <Line data={chartData} options={options} />
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default ProgressChart;
