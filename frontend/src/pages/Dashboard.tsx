import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MeasurementForm from '../components/ProgressForm';
import Header from '../components/shared/Header.tsx';
import StatCard from '../components/shared/StatCard';
import Modal from '../components/shared/Modal';
import ProgressSection from '../components/ProgressSection.tsx';

interface ProgressEntry {
  date: string;
  weight: number;
  hipSize: number;
  waistSize: number;
}

const INITIAL_VISIBLE = 5;
const LOAD_MORE_COUNT = 5;

const Dashboard: React.FC = () => {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const fetchProgressData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/progress', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(response.data || []);
      setVisibleCount(INITIAL_VISIBLE); // reset visible count on refetch
    } catch (err: any) {
      console.error('Error fetching progress data:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load progress data. Please try again later.',
      );
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
    fetchProgressData();
  };

  const isEmpty = entries.length === 0;

  const toggleViewAll = () => {
    if (visibleCount === INITIAL_VISIBLE) {
      setVisibleCount(Math.min(entries.length, visibleCount + LOAD_MORE_COUNT));
    } else {
      setVisibleCount(INITIAL_VISIBLE);
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, entries.length));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <div className="bg-gray-800/80 p-6 rounded-xl border border-red-500/50 max-w-md text-center">
          <h2 className="text-xl font-bold text-red-400 mb-2">
            Oops! Something went wrong.
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="pt-20 max-w-6xl mx-auto p-4 sm:p-8">
        <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700 mb-8 mt-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold text-orange-400">Your Progress</h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center space-x-2 self-start md:self-auto"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: 'Current Weight',
                value: `${entries[0]?.weight || '--'} kg`,
              },
              { label: 'Hip Size', value: `${entries[0]?.hipSize || '--'} cm` },
              {
                label: 'Waist Size',
                value: `${entries[0]?.waistSize || '--'} cm`,
              },
              { label: 'Entries Logged', value: entries.length.toString() },
            ].map((stat, idx) => (
              <StatCard key={idx} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>

        {showForm && (
          <Modal
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            title="Add Measurement"
          >
            <MeasurementForm
              onSuccess={handleNewMeasurementSuccess}
              onCancel={() => setShowForm(false)}
            />
          </Modal>
        )}

        {isEmpty ? (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 text-center">
            <h2 className="text-xl font-bold text-orange-400 mb-4">
              No Data Yet
            </h2>
            <p className="text-gray-300 mb-6">
              Kickstart your fitness journey by adding your first measurement!
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 font-medium transition"
            >
              Add First Measurement
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Weight Progress</h2>
                <ProgressSection
                  title="Weight Progress"
                  type="line"
                  yLabel="kg"
                  colors={['#f97316']}
                  data={entries.map((e) => ({ date: e.date, value: e.weight }))}
                />
              </div>
              <div className="bg-gray-800/80 p-6 rounded-xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4">Hip & Waist Progress</h2>
                <ProgressSection
                  title="Hip & Waist Progress"
                  type="bar"
                  yLabel="cm"
                  colors={['#f97316', '#ef4444']}
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
                        value: e.waistSize,
                      })),
                    },
                  ]}
                />
              </div>
            </div>

            {/* Scrollable, expandable list with lazy load */}
            <div className="bg-gray-800/80 rounded-xl border border-gray-700 overflow-hidden max-h-[400px] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">Recent Measurements</h2>
                {entries.length > INITIAL_VISIBLE && (
                  <button
                    onClick={toggleViewAll}
                    className="text-sm text-orange-400 hover:underline"
                  >
                    {visibleCount === INITIAL_VISIBLE ? 'View All' : 'Collapse'}
                  </button>
                )}
              </div>
              <div className="overflow-y-auto flex-grow">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700 sticky top-0 bg-gray-800/90 z-10">
                      <th className="p-4 text-left">Date</th>
                      <th className="p-4 text-left">Weight</th>
                      <th className="p-4 text-left">Hip</th>
                      <th className="p-4 text-left">Waist</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.slice(0, visibleCount).map((entry, index) => (
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

              {visibleCount < entries.length &&
                visibleCount !== INITIAL_VISIBLE && (
                  <div className="p-4 border-t border-gray-700 flex justify-center">
                    <button
                      onClick={loadMore}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg hover:from-orange-600 hover:to-red-700 transition"
                    >
                      Load More
                    </button>
                  </div>
                )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
