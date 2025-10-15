import React from 'react';
import { Ticket } from 'lucide-react';

const TicketStatus = () => {
  const tickets = [
    { id: '#84321', category: 'Billing', subject: 'Incorrect uniform fee', status: 'Resolved', updated: 'Oct 05, 2025' },
    { id: '#84199', category: 'Technical', subject: 'Cannot access grades on mobile', status: 'In Progress', updated: 'Oct 10, 2025' },
    { id: '#84056', category: 'General', subject: 'Inquiry about school event', status: 'Open', updated: 'Oct 11, 2025' },
  ];

  const statusColors = {
    Resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'In Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Open: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">My Support Tickets</h2>
      <div className="space-y-3">
        {tickets.map(ticket => (
          <div key={ticket.id} className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <Ticket className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">{ticket.subject}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {ticket.id} &bull; {ticket.category} &bull; Last updated: {ticket.updated}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[ticket.status]}`}>
              {ticket.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketStatus;