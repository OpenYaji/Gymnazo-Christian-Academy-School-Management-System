import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const GradesTable = ({ subjects, onSubjectClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getRemarkColor = (remarks) => {
    if (remarks === 'In Progress') return 'text-blue-600 dark:text-blue-400';
    if (remarks === 'Excellent') return 'text-green-600 dark:text-green-400';
    return 'text-gray-600 dark:text-gray-400';
  };
  
  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text"
            placeholder="Search subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700"
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select className="w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 appearance-none">
            <option>All Quarters</option>
            <option>1st Quarter</option>
            <option>2nd Quarter</option>
          </select>
        </div>
      </div>

 
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400">
            <tr>
              <th className="p-3 font-semibold">Subjects</th>
              <th className="p-3 font-semibold text-center">1</th>
              <th className="p-3 font-semibold text-center">2</th>
              <th className="p-3 font-semibold text-center">3</th>
              <th className="p-3 font-semibold text-center">4</th>
              <th className="p-3 font-semibold text-center">Final Grade</th>
              <th className="p-3 font-semibold">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.map((subject) => (
              <tr 
                key={subject.id} 
                onClick={() => onSubjectClick(subject)}
                className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30 cursor-pointer"
              >
                <td className="p-3 font-semibold text-gray-800 dark:text-gray-200">{subject.name}</td>
                <td className="p-3 text-center">{subject.q1 || 'N/A'}</td>
                <td className="p-3 text-center">{subject.q2 || 'N/A'}</td>
                <td className="p-3 text-center">{subject.q3 || 'N/A'}</td>
                <td className="p-3 text-center">{subject.q4 || 'N/A'}</td>
                <td className="p-3 font-bold text-center text-gray-800 dark:text-gray-100">{subject.final || 'N/A'}</td>
                <td className={`p-3 font-semibold ${getRemarkColor(subject.remarks)}`}>{subject.remarks}</td>
              </tr>
            ))}
            <tr className="bg-amber-50 dark:bg-amber-900/20 font-bold">
              <td className="p-3" colSpan="5">General Average</td>
              <td className="p-3 text-center text-amber-700 dark:text-amber-400">87.6</td>
              <td className="p-3 text-amber-700 dark:text-amber-400">Excellent</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesTable;