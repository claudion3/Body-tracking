// components/ProgressSection.tsx
import React, { useState } from 'react';
import ProgressChart from './ProgressChart';

interface Entry {
  date: string;
  value: number;
}

type Range = 'weekly' | 'monthly' | 'yearly';

interface ProgressSectionProps {
  title: string;
  type: 'line' | 'bar';
  yLabel: string;
  colors: string[];
  data: Entry[] | { name: string; values: Entry[] }[];
}

function filterDataByRange(
  data: Entry[] | { name: string; values: Entry[] }[] | undefined,
  range: Range,
): Entry[] | { name: string; values: Entry[] }[] {
  if (!data) return [];

  const now = new Date();
  const cutoff = new Date(
    range === 'weekly'
      ? now.setDate(now.getDate() - 7)
      : range === 'monthly'
        ? now.setMonth(now.getMonth() - 1)
        : now.setFullYear(now.getFullYear() - 1),
  );

  if ('date' in data[0]) {
    return (data as Entry[]).filter((e) => new Date(e.date) >= cutoff);
  }

  return (data as { name: string; values: Entry[] }[]).map((group) => ({
    name: group.name,
    values: group.values.filter((e) => new Date(e.date) >= cutoff),
  }));
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  title,
  type,
  yLabel,
  colors,
  data,
}) => {
  const [range, setRange] = useState<Range>('monthly');
  const filteredData = filterDataByRange(data, range);

  return (
    <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <select
          className="bg-gray-900 text-white border border-gray-700 px-3 py-1 rounded"
          value={range}
          onChange={(e) => setRange(e.target.value as Range)}
        >
          <option value="weekly">Last 7 days</option>
          <option value="monthly">Last 30 days</option>
          <option value="yearly">Last 12 months</option>
        </select>
      </div>
      <ProgressChart
        type={type}
        yLabel={yLabel}
        data={filteredData || []}
        colors={colors}
      />
    </div>
  );
};

export default ProgressSection;
