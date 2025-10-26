import React from 'react';
import { ChevronDown } from 'lucide-react';
import StepIndicator from './StepIndicator'; // Import StepIndicator

// Pass down MOCK data as props
const SelectAmountStep = ({ fees, dueDate, onProceed, onReturn, setPaymentDetails }) => {
  // If you need to allow selecting different fees:
  const handleFeeChange = (event) => {
      const selectedFee = event.target.value;
      setPaymentDetails(prev => ({
          ...prev,
          selectedFee: selectedFee,
          amount: fees[selectedFee]
      }));
  };

  return (
    <div>
      <StepIndicator currentStep={1} />
      <h3 className="text-lg font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">Make a Payment</h3>

      <div className="mb-4">
          <label htmlFor="term" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Term</label>
           <div className="relative">
               <select
                  id="term"
                  onChange={handleFeeChange} // Add onChange if needed
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-400"
               >
                  {/* Dynamically populate options if needed */}
                  <option value="Tuition Fee">Tuition Fee</option>
                  {/* <option value="Uniform Fee">Uniform Fee</option> */}
               </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
          </div>
      </div>

      <div className="flex justify-between mb-4 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Due Date</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{dueDate}</span>
      </div>
      <div className="flex justify-between mb-6 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Amount</span>
          {/* Display the amount based on the selected fee */}
          <span className="font-bold text-lg text-gray-800 dark:text-gray-100">₱ {fees['Tuition Fee']?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      </div>

      <div className="flex gap-4">
        <button onClick={onReturn} className="flex-1 py-3 text-sm font-semibold rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Return</button>
        <button onClick={onProceed} className="flex-1 py-3 bg-amber-400 text-stone-900 text-sm font-bold rounded-lg hover:bg-amber-500 transition-colors">Proceed</button>
      </div>
    </div>
  );
};

export default SelectAmountStep;
