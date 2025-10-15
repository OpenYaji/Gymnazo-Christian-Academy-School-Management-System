import React from 'react';
import { KeyRound, ShieldCheck, Smartphone, LogOut } from 'lucide-react';

const SecurityAction = ({ icon, title, description, buttonText, tooltipText }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b border-gray-100 dark:border-slate-700">
    <div className="flex items-center gap-4 mb-3 sm:mb-0">
      {icon}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
    <div className="relative group">
      <button className="bg-gray-100 dark:bg-slate-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex-shrink-0">
        {buttonText}
      </button>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs font-bold rounded-md px-2 py-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out whitespace-nowrap z-10">
        {tooltipText}
      </span>
    </div>
  </div>
);


const SecuritySettings = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Security Settings
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Keep your account safe and secure.
      </p>

      <div className="space-y-2">
        <SecurityAction 
          icon={<KeyRound className="text-amber-500" />}
          title="Change Password"
          description="Last changed on Oct 10, 2025"
          buttonText="Change"
          tooltipText="Update your password"
        />
        <SecurityAction 
          icon={<ShieldCheck className="text-green-500" />}
          title="Two-Factor Authentication"
          description="Your account is protected."
          buttonText="Manage"
          tooltipText="Manage your 2FA settings" 
        />
        <SecurityAction 
          icon={<Smartphone className="text-blue-500" />}
          title="Login Activity"
          description="Last login from Quezon City, Philippines"
          buttonText="View History"
          tooltipText="See recent login locations" 
        />
        <SecurityAction 
          icon={<LogOut className="text-red-500" />}
          title="Active Sessions"
          description="Log out from all other devices."
          buttonText="Log Out All"
          tooltipText="Remotely log out everywhere"
        />
      </div>
    </div>
  );
};

export default SecuritySettings;