import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import CurrentBalanceDisplay from '../common/transaction/payment/CurrentBalanceDisplay';
import SelectAmountStep from '../common/transaction/payment/SelectAmountStep';
import ChooseMethodStep from '../common/transaction/payment/ChooseMethodStep';
import OtpVerificationStep from '../common/transaction/payment/OtpVerificationStep';
import ReviewSummaryStep from '../common/transaction/payment/ReviewSummaryStep';
import ProcessingStep from '../common/transaction/payment/ProcessingStep';
import SuccessStep from '../common/transaction/payment/SuccessStep';

const MOCK_BALANCE = 10400.00;
const MOCK_FEES = {
  'Tuition Fee': 5600.00,
  'Uniform Fee': 3400.00,
  'Books Fee': 1400.00,
};
const MOCK_DUE_DATE = 'September 29, 2025';
const MOCK_TXN_REF = 'TXN-942157';
const CORRECT_OTP = '123456';


const PaymentPortalPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Select, 2: Method/Verify, 3: Review, 4: Processing, 5: Success
  const [otpStepStage, setOtpStepStage] = useState('chooseMethod'); // 'chooseMethod', 'getOtp', 'enterOtp'
  const [paymentDetails, setPaymentDetails] = useState({
    amount: MOCK_FEES['Tuition Fee'],
    method: 'GCash',
    phoneNumber: '',
    selectedFee: 'Tuition Fee', // Add state for selected fee if needed
  });
  const navigate = useNavigate();

  // Navigation functions
  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  const goToStep = (step) => setCurrentStep(step);

  const handleMethodConfirm = () => {
    if (paymentDetails.method === 'GCash' || paymentDetails.method === 'Paymaya') {
      setOtpStepStage('getOtp');
    } else {
      goToStep(3);
    }
  };

  const handleOtpVerified = () => {
    goToStep(3);
  };

  const handlePayNow = () => {
    goToStep(4);
    console.log("Simulating payment processing for:", paymentDetails);
    setTimeout(() => {
      const isSuccess = true; // Force success
      if (isSuccess) {
        goToStep(5);
      } else {
        console.error("Simulated Payment Failed");
        alert("Payment failed.");
        goToStep(3);
      }
    }, 2500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <SelectAmountStep
                    fees={MOCK_FEES}
                    dueDate={MOCK_DUE_DATE}
                    onProceed={nextStep}
                    onReturn={() => navigate('/student-dashboard/transaction')}
                    setPaymentDetails={setPaymentDetails} // Pass if fee selection is needed
                 />;
      case 2:
        if (otpStepStage === 'chooseMethod') {
          return <ChooseMethodStep
                    onConfirm={handleMethodConfirm}
                    onBack={prevStep}
                    setPaymentDetails={setPaymentDetails}
                 />;
        } else {
          return <OtpVerificationStep
                    onConfirm={handleOtpVerified}
                    onBack={() => setOtpStepStage('chooseMethod')} // Go back to choosing method within step 2
                    setPaymentDetails={setPaymentDetails}
                    paymentDetails={paymentDetails}
                    stepStage={otpStepStage}
                    setStepStage={setOtpStepStage}
                    correctOtp={CORRECT_OTP}
                 />;
        }
      case 3:
        const reviewBackAction = () => {
             if (paymentDetails.method === 'GCash' || paymentDetails.method === 'Paymaya') {
                 // Go back to OTP entry stage within step 2
                 setCurrentStep(2);
                 setOtpStepStage('enterOtp');
             } else {
                 // Go back to Choose Method stage within step 2
                 setCurrentStep(2);
                 setOtpStepStage('chooseMethod');
             }
        };
        return <ReviewSummaryStep
                    onConfirm={handlePayNow}
                    onBack={reviewBackAction}
                    paymentDetails={paymentDetails}
                    fees={MOCK_FEES} // Pass fees for breakdown
                    txnRef={MOCK_TXN_REF}
               />;
      case 4:
        return <ProcessingStep />;
      case 5:
        return <SuccessStep
                    onReturn={() => navigate('/student-dashboard')}
                    onViewSummary={() => alert('Summary page TBD.')}
                />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="h-[30rem] bg-[#fff] dark:bg-slate-900 rounded-2xl">
      <div className="max-w-4xl mx-auto lg:pt-6 ">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Payment
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <CurrentBalanceDisplay balance={MOCK_BALANCE} />
          </div>
          <div className="md:col-span-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 md:p-8 shadow-md">
            {renderStepContent()}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default PaymentPortalPage;

