export interface ChartDataPoint {
  date: string;
  value: number;
}

export const filterDataByRange = (
  data: ChartDataPoint[],
  range: 'weekly' | 'monthly' | 'yearly'
): ChartDataPoint[] => {
  const now = new Date();
  const dayMs = 1000 * 60 * 60 * 24;

  return data.filter((point) => {
    const date = new Date(point.date);
    const diff = now.getTime() - date.getTime();

    switch (range) {
      case 'weekly':
        return diff <= dayMs * 7;
      case 'monthly':
        return diff <= dayMs * 30;
      case 'yearly':
        return diff <= dayMs * 365;
      default:
        return true;
    }
  });
};
