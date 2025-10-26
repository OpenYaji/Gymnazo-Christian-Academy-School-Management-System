import React from 'react';
import StepIndicator from './StepIndicator'; // Import StepIndicator

const ReviewSummaryStep = ({ onConfirm, onBack, paymentDetails, fees, txnRef }) => (
    <div>
        <StepIndicator currentStep={3} />
        <h3 className="text-lg font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">Review Summary</h3>

        <div className="p-4 border border-gray-200 dark:border-slate-600 rounded-lg mb-6 space-y-3 text-sm">
             <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Payment Method</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{paymentDetails.method}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Recipient</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">Gymnazo Christian Academy</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Reference No.</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{txnRef}</span>
            </div>
             <hr className="border-gray-100 dark:border-slate-700"/>
             {/* Show only the selected fee for payment */}
             <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">{paymentDetails.selectedFee || 'Tuition Fee'}</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">₱ {paymentDetails.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
             {/* Optionally show other fees if needed, or just the total */}
             {/* {Object.entries(fees).map(([fee, amount]) => (
                 <div key={fee} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">{fee}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">₱ {amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
             ))} */}
             <hr className="border-gray-100 dark:border-slate-700"/>
             <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-800 dark:text-gray-100">Total Paid</span>
                <span className="text-gray-800 dark:text-gray-100">₱ {paymentDetails.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onBack} className="flex-1 py-3 text-sm font-semibold rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-amber-400 text-stone-900 text-sm font-bold rounded-lg hover:bg-amber-500 transition-colors">Pay Now</button>
        </div>
    </div>
);

export default ReviewSummaryStep;
