import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, History, Download } from 'lucide-react';

const QuickActionsCard = () => {
  const actions = [
    { id: 1, title: "Current Grades", icon: <Eye className="w-8 h-8" />, tooltipText: "See your grades for this school year", path: "/student-dashboard/academic/current-grades", button:"View" },
    { id: 2, title: "Previous Grades", icon: <History className="w-8 h-8" />, tooltipText: "Look at grades from past school years", path: "/student-dashboard/academic/previous-grades" , button:"View" },
    { id: 3, title: "Download Report Card", icon: <Download className="w-8 h-8" />, action: () => alert("Download feature coming soon!"), tooltipText: "Download your official report card", button:"Download" }
  ];

  const cardClasses = "relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-left";

  const CardContent = ({ action }) => (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 mb-4 bg-gray-100 dark:bg-slate-700 rounded-xl flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:bg-[#F4D77D] group-hover:text-gray-800 dark:group-hover:bg-amber-500 dark:group-hover:text-gray-900 transition-all duration-300">
          {action.icon}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">
          {action.title}
        </h3>
        <div className="w-full px-4 py-2 bg-[#F4D77D] dark:bg-[#F3D67D] text-gray-800 dark:text-gray-900 rounded-full text-sm font-semibold group-hover:bg-amber-400 dark:group-hover:bg-amber-400 transition-all duration-300">
          {action.button}
        </div>
      </div>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
        {action.tooltipText || action.title}
      </span>
    </>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {actions.map((action) => (
        action.path ? (
          <Link key={action.id} to={action.path} className={cardClasses}>
            <CardContent action={action} />
          </Link>
        ) : (
          <button key={action.id} onClick={action.action} className={cardClasses}>
            <CardContent action={action} />
          </button>
        )
      ))}
    </div>
  );
};

export default QuickActionsCard;
