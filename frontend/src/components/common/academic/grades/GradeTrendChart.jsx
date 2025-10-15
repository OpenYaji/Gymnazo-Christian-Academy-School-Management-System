import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GradeTrendChart = ({ subjects }) => {
  const chartData = subjects.map(subject => ({
    name: subject.name,
    '1st Quarter': subject.q1,
    '2nd Quarter': subject.q2,
  }));

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-md">
      <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Grade Trends by Quarter</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[70, 100]} tick={{ fontSize: 12 }}/>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                border: '1px solid #ccc',
                backdropFilter: 'blur(5px)',
              }} 
            />
            <Legend wrapperStyle={{ fontSize: '14px' }}/>
            <Bar dataKey="1st Quarter" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="2nd Quarter" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GradeTrendChart;