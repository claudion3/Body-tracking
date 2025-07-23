import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
  key?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  className,
}) => (
  <div
    className={`bg-gray-900/60 p-4 rounded-lg border border-gray-700 flex flex-col items-center justify-center min-w-[120px] max-w-[160px] w-full h-full space-y-2 ${className || ''}`}
    style={{ wordBreak: 'break-word', overflow: 'hidden' }}
  >
    {icon && (
      <div className="p-2 bg-orange-500/20 rounded-full mb-2 flex items-center justify-center">
        {icon}
      </div>
    )}
    <p
      className="text-gray-400 text-xs text-center truncate w-full"
      title={label}
    >
      {label}
    </p>
    <p
      className="text-xl font-bold text-center break-words w-full"
      style={{ wordBreak: 'break-word' }}
    >
      {value}
    </p>
  </div>
);

export default StatCard;
