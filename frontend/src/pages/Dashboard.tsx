import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProgressChart from '../components/ProgressChart';
import MeasurementForm from '../components/ProgressForm';

interface ProgressEntry {
  date: string;
  weight: number;
  hipSize: number;
  waistSize: number;
}

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch data function that can be reused
  const fetchProgressData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await axios.get('/api/progress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries(response.data || []);
    } catch (err) {
      console.error('Error fetching progress data:', err);
      // setError(
      //   err.response?.data?.message ||
      //     err.message ||
      //     'Failed to load progress data. Please try again later.',
      // );
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  const handleNewMeasurementSuccess = () => {
    setShowForm(false);
    fetchProgressData(); // Refresh data after successful submission
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Loading your progress data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="bg-gray-800/80 p-6 rounded-xl border border-red-500/50 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchProgressData}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const isEmpty = entries.length === 0;
  console.log('entries', entries);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header with Profile Button */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-400">
            Progress Dashboard
          </h1>

          <div className="flex items-center space-x-3">
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 border border-gray-700 group"
              aria-label="Go to profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-orange-400 group-hover:text-orange-300 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="hidden sm:inline">My Profile</span>
            </Link>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="hidden sm:inline">Add Measurement</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400">Current Weight</p>
            <p className="text-2xl font-bold">
              {entries[0]?.weight || '--'} kg
            </p>
          </div>
          <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400">Hip Size</p>
            <p className="text-2xl font-bold">
              {entries[0]?.hipSize || '--'} cm
            </p>
          </div>
          <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400">Waist Size</p>
            <p className="text-2xl font-bold">
              {entries[0]?.waistSize || '--'} cm
            </p>
          </div>
          <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400">Total Entries</p>
            <p className="text-2xl font-bold">{entries.length}</p>
          </div>
        </div>

        {/* Measurement Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
              <MeasurementForm
                onSuccess={handleNewMeasurementSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {isEmpty ? (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 text-center">
            <div className="max-w-md mx-auto">
              {isEmpty && (
                <h2 className="text-xl font-bold text-orange-400 mb-4">
                  No Measurements Found Yet
                </h2>
              )}

              <p className="text-gray-300 mb-6">
                Start tracking your fitness journey by adding your first
                measurement!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition font-medium"
              >
                Add First Measurement
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Weight Progress</h2>
                <ProgressChart
                  type="line"
                  data={entries.map((e) => ({ date: e.date, value: e.weight }))}
                  colors={['#f97316']}
                  yLabel="kg"
                />
              </div>
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Body Measurements</h2>
                <ProgressChart
                  type="bar"
                  data={[
                    {
                      name: 'Hip Size',
                      values: entries.map((e) => ({
                        date: e.date,
                        value: e.hipSize,
                      })),
                    },
                    {
                      name: 'Waist Size',
                      values: entries.map((e) => ({
                        date: e.date,
                        value: e.waistSize || 0,
                      })),
                    },
                  ]}
                  colors={['#f97316', '#ef4444']}
                  yLabel="cm"
                />
              </div>
            </div>

            {/* Recent Entries Table */}
            <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden">
              <div className="flex justify-between items-center p-6">
                <h2 className="text-xl font-bold">Recent Measurements</h2>
                {entries.length > 5 && (
                  <button className="text-sm text-orange-400 hover:underline">
                    View All
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Weight</th>
                      <th className="p-4 text-left">Hip</th>
                      <th className="p-4 text-left">Waist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.slice(0, 5).map((entry, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700 last:border-0 hover:bg-gray-700/50"
                      >
                        <td className="p-4">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td className="p-4">{entry.weight} kg</td>
                        <td className="p-4">{entry.hipSize} cm</td>
                        <td className="p-4">{entry.waistSize} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
