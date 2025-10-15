import React, { useState } from 'react';
import { Edit, X, Save, AlertCircle } from 'lucide-react';

const InfoField = ({ label, value, isEditing, onChange, name, readOnly = false }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">{label}</label>
    {isEditing && !readOnly ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 w-full p-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700"
      />
    ) : (
      <p className={`mt-1 p-2 rounded-md ${readOnly && isEditing ? 'bg-gray-100 dark:bg-slate-700' : ''}`}>
        {value}
      </p>
    )}
  </div>
);

const PersonalInfo = ({ personalData, academicData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(personalData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    if (formData.email !== personalData.email) {
      console.log("Email changed. Triggering verification process...");
    }
    if (formData.phone !== personalData.phone) {
      console.log("Phone changed. Triggering OTP verification...");
    }
    setIsEditing(false);
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Personal Information</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-semibold bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600">
            <Edit size={14} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => { setIsEditing(false); setFormData(personalData); }} className="flex items-center gap-2 text-sm font-semibold bg-gray-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600">
              <X size={14} /> Cancel
            </button>
            <button onClick={handleSave} className="flex items-center gap-2 text-sm font-semibold bg-amber-400 text-stone-900 px-3 py-1.5 rounded-lg hover:bg-amber-500">
              <Save size={14} /> Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="Full Name" value={formData.fullName} isEditing={isEditing} readOnly />
        <InfoField label="Email Address" name="email" value={formData.email} isEditing={isEditing} onChange={handleInputChange} />
        <InfoField label="Age" value={formData.age} isEditing={isEditing} readOnly />
        <InfoField label="Birthday" value={formData.birthday} isEditing={isEditing} readOnly />
        <div className="md:col-span-2">
          <InfoField label="Address" name="address" value={formData.address} isEditing={isEditing} onChange={handleInputChange} />
        </div>
        <InfoField label="Phone Number" name="phone" value={formData.phone} isEditing={isEditing} onChange={handleInputChange} />
        <InfoField label="Status" value={academicData.status} isEditing={isEditing} readOnly />

        <hr className="md:col-span-2 my-2 border-gray-100 dark:border-slate-700" />
        
        <InfoField label="Grade & Section" value={academicData.gradeSection} isEditing={isEditing} readOnly />
        <InfoField label="Adviser" value={academicData.adviser} isEditing={isEditing} readOnly />
        <InfoField label="Gender" name="gender" value={formData.gender} isEditing={isEditing} onChange={handleInputChange} />
        <InfoField label="Nationality" name="nationality" value={formData.nationality} isEditing={isEditing} onChange={handleInputChange} />
      </div>

      {isEditing && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-500/30 rounded-lg text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5"/>
          <span>Changing your Email or Phone Number will require a verification step before the update is applied.</span>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;