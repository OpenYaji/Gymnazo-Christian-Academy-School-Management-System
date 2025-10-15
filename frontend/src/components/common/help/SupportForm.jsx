import React from 'react';
import { MessageSquare, List, Paperclip } from 'lucide-react';

const SupportForm = () => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Submit a Ticket</h2>
      <form className="space-y-4">
        <div className="relative group">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <div className="relative">
            <List className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select id="category" className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-amber-400 outline-none appearance-none">
              <option>Technical Support</option>
              <option>Billing Question</option>
              <option>General Feedback</option>
              <option>Report an Issue</option>
            </select>
          </div>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
            Select the category of your issue
          </span>
        </div>

        <div className="relative group">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
          <textarea 
            id="message" 
            rows="5"
            placeholder="Please describe your issue or question in detail..."
            className="w-full p-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:ring-2 focus:ring-amber-400 outline-none"
          ></textarea>
           <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
            Describe your issue in detail here
          </span>
        </div>

        <div className="relative group">
          <label htmlFor="attachment" className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700">
            <Paperclip className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Attach a file (Optional)</span>
          </label>
          <input type="file" id="attachment" className="hidden" />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
            Attach a screenshot or document
          </span>
        </div>

        <div className="relative group">
          <button type="submit" className="w-full bg-amber-400 text-stone-900 font-bold py-2.5 rounded-lg hover:bg-amber-500 transition-colors">
            Submit Ticket
          </button>
           <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
            Send your ticket to the support team
          </span>
        </div>
      </form>
    </div>
  );
};

export default SupportForm;