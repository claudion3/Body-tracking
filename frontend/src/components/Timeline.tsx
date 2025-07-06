// import React from 'react';

// interface TimelineEntry {
//   date: string;
//   weight: number;
//   hipSize: number;
// }

// interface TimelineProps {
//   entries: TimelineEntry[];
// }

// const Timeline: React.FC<TimelineProps> = ({ entries }) => {
//   if (entries.length === 0) {
//     return (
//       <div className="text-center text-gray-600">
//         No progress entries found. Start tracking your progress!
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {entries.map((entry, index) => (
//         <div key={index} className="flex items-start space-x-4">
//           <div className="flex-shrink-0">
//             <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
//           </div>
//           <div className="flex-1">
//             <div className="text-lg font-semibold">{entry.date}</div>
//             <div className="text-sm text-gray-600">Weight: {entry.weight} kg</div>
//             <div className="text-sm text-gray-600">Hip Size: {entry.hipSize} cm</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Timeline;