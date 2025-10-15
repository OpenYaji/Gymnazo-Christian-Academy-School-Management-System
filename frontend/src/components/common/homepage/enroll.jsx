import React, { useState } from 'react';
import Bg from '../../../assets/img/bg.png';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost/Gymazo-Student-Side/backend/api/admission.php';

const PrivacyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-stone-800/95 dark:bg-gray-900/95 text-white p-6 sm:p-8 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl backdrop-blur-sm border border-stone-700 dark:border-gray-600 transition-colors duration-300">
                <h2 className="text-xl sm:text-2xl font-bold text-[#F4D77D] dark:text-amber-400 border-b border-white/50 dark:border-gray-600 pb-2 mb-4 transition-colors duration-300">
                    Privacy Policy & Data Sharing Agreement
                </h2>
                
                <div className="text-sm space-y-3 max-h-64 overflow-y-auto pr-2">
                    <p>
                        **1. Data Collection:** By submitting this form, you consent to the Gymnazo Christian Academy (GCA) collecting and processing the personal and sensitive information provided herein (including student name, birthdate, contact details, academic history, and parent/guardian information).
                    </p>
                    <p>
                        **2. Purpose of Processing:** The data collected will be used solely for the purpose of student admission, enrollment, record-keeping, and communication necessary for the educational services provided by GCA, in compliance with the Data Privacy Act of 2012 (RA 10173).
                    </p>
                    <p>
                        **3. Data Sharing:** We may share necessary student data with government agencies such as the Department of Education (DepEd) and the Private Education Assistance Committee (PEAC) for mandatory reporting and program administration (e.g., ESC/voucher programs). Data will not be shared with unauthorized third parties.
                    </p>
                    <p>
                        **4. Security:** GCA implements reasonable security measures to protect your personal data against unauthorized access, disclosure, alteration, and destruction.
                    </p>
                    <p>
                        **5. Consent:** Your signature/confirmation acknowledges that you have read, understood, and agreed to the terms of this Privacy Policy and Consent Form.
                    </p>
                </div>
                
                <div className="mt-6 flex justify-end">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="bg-[#F4D77D] dark:bg-amber-500 hover:bg-amber-300 dark:hover:bg-amber-400 text-black font-bold py-2 px-6 rounded-lg shadow-md transition duration-200"
                    >
                        Close & Confirm Reading
                    </button>
                </div>
            </div>
        </div>
    );
};

const SuccessModal = ({ isOpen, trackingNumber, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-stone-800/95 dark:bg-gray-900/95 text-white p-6 sm:p-8 rounded-lg w-full max-w-md shadow-2xl backdrop-blur-sm border border-stone-700 dark:border-gray-600">
                <div className="text-center">
                    <div className="mb-4">
                        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#F4D77D] mb-4">
                        Application Submitted Successfully!
                    </h2>
                    <p className="text-sm mb-4">
                        Your admission application has been received. Please save your tracking number for future reference.
                    </p>
                    <div className="bg-stone-900/50 p-4 rounded-lg mb-6">
                        <p className="text-xs text-gray-400 mb-1">Tracking Number</p>
                        <p className="text-2xl font-bold text-amber-400">{trackingNumber}</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="bg-[#F4D77D] hover:bg-amber-300 text-black font-bold py-2 px-8 rounded-lg transition duration-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Enroll = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [formData, setFormData] = useState({
        enrolleeType: '',
        studentFirstName: '',
        studentLastName: '',
        birthdate: '',
        gender: '',
        address: '',
        contactNumber: '',
        emailAddress: '',
        guardianFirstName: '',
        guardianLastName: '',
        relationship: '',
        guardianContact: '',
        guardianEmail: '',
        gradeLevel: '',
        previousSchool: ''
    });

    const gradeLevels = [
        "Pre-Elem", "Kinder", "Grade 1", "Grade 2", "Grade 3",
        "Grade 4", "Grade 5", "Grade 6"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasAgreed) {
            alert("Please read and agree to the Privacy Policy to submit the form.");
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });

            submitData.append('privacyAgreement', 'agreed');

            // Submit to backend
            const response = await fetch(`${API_URL}?action=submit`, {
                method: 'POST',
                body: submitData
            });

            const result = await response.json();

            if (result.success) {
                setTrackingNumber(result.tracking_number);
                setSuccessModalOpen(true);
                
                setFormData({
                    enrolleeType: '',
                    studentFirstName: '',
                    studentLastName: '',
                    birthdate: '',
                    gender: '',
                    address: '',
                    contactNumber: '',
                    emailAddress: '',
                    guardianFirstName: '',
                    guardianLastName: '',
                    relationship: '',
                    guardianContact: '',
                    guardianEmail: '',
                    gradeLevel: '',
                    previousSchool: ''
                });
                setHasAgreed(false);
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred while submitting the form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6">
            <PrivacyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <SuccessModal 
                isOpen={successModalOpen} 
                trackingNumber={trackingNumber}
                onClose={() => setSuccessModalOpen(false)}
            />
            
            <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: `url(${Bg})` }}
            ></div>
            <div className="absolute inset-0 bg-stone-900/60 dark:bg-black/70 transition-colors duration-300"></div>

            <div className="relative z-10 w-full max-w-5xl">
                <div className='relative top-0 left-0 w-full mb-2 z-10 transition-all duration-300'>
                    <div className='w-full flex justify-start'>
                        <Link 
                            to="/" 
                            className='flex items-center gap-2 text-white dark:text-amber-400 font-bold hover:text-white dark:hover:text-amber-300 transition duration-150 text-sm px-4 group'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className='inline'>Back to Home</span>
                        </Link>
                    </div>
                </div>

                <form className="relative" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-5 gap-4 auto-rows-fr">
                        <div className="col-span-5 lg:col-span-2 space-y-4 p-4 rounded-lg backdrop-blur-sm bg-stone-800/60 dark:bg-gray-900/70 shadow-xl border border-stone-700 dark:border-gray-600 transition-colors duration-300">
                            <h2 className="text-lg font-bold text-white border-b border-white/40 dark:border-gray-600 pb-1 mb-2 transition-colors duration-300">
                                Student Information
                            </h2>

                            <div className="space-y-1">
                                <label htmlFor="enrolleeType" className="sr-only">Enrollee Type</label>
                                <select 
                                    id="enrolleeType" 
                                    name="enrolleeType"
                                    value={formData.enrolleeType}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full h-8 px-3 bg-white/90 dark:bg-gray-700 dark:text-gray-100 text-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-sm transition-colors duration-300"
                                >
                                    <option value="">Select Enrollee Type</option>
                                    <option value="returnee">Returnee</option>
                                    <option value="new">New Enrollee</option>
                                    <option value="transferee">Transferee</option>
                                </select>
                            </div>
                            
                            <div className="flex space-x-2">
                                <Input 
                                    label="Student First Name" 
                                    name="studentFirstName" 
                                    type="text" 
                                    value={formData.studentFirstName}
                                    onChange={handleInputChange}
                                    required
                                    className="flex-1" 
                                />
                                <Input 
                                    label="Student Last Name" 
                                    name="studentLastName" 
                                    type="text"
                                    value={formData.studentLastName}
                                    onChange={handleInputChange}
                                    required
                                    className="flex-1" 
                                />
                            </div>
                            
                            <div className="flex space-x-2">
                                <Input 
                                    label="Birthdate" 
                                    name="birthdate" 
                                    type="date"
                                    value={formData.birthdate}
                                    onChange={handleInputChange}
                                    required
                                    className="flex-1" 
                                />
                                <div className="flex-1 min-w-[120px]">
                                    <label className="sr-only">Gender</label>
                                    <div className="flex items-center space-x-2 h-8 text-sm">
                                        <label className="flex items-center space-x-1 text-white">
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="male"
                                                checked={formData.gender === 'male'}
                                                onChange={handleInputChange}
                                                required
                                                className="h-3 w-3 text-amber-400" 
                                            />
                                            <span>Male</span>
                                        </label>
                                        <label className="flex items-center space-x-1 text-white">
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="female"
                                                checked={formData.gender === 'female'}
                                                onChange={handleInputChange}
                                                required
                                                className="h-3 w-3 text-amber-400" 
                                            />
                                            <span>Female</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <Input 
                                label="Address" 
                                name="address" 
                                type="text"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                            
                            <div className="flex space-x-2">
                                <Input 
                                    label="Contact Number" 
                                    name="contactNumber" 
                                    type="tel"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                    className="flex-1" 
                                />
                                <Input 
                                    label="Email Address" 
                                    name="emailAddress" 
                                    type="email"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    className="flex-1" 
                                />
                            </div>

                            <div className="pt-2 text-[10px] font-medium text-white leading-tight">
                                <p className="mb-0.5">
                                    <span className='font-bold text-amber-400'>For Old Students:</span> Report Card (No failing grades)
                                </p>
                                <p className="mb-0.5">
                                    <span className='font-bold text-amber-400'>For Transferees:</span>
                                </p>
                                <ul className="list-disc list-inside ml-2 space-y-0 text-[9px]">
                                    <li>Good Moral Certificate</li>
                                    <li>Birth Certificate (PSA)</li>
                                    <li>Certificate of Completion</li>
                                    <li>SF10 Form 137</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-span-5 lg:col-span-3 lg:col-start-3 space-y-4">
                            <div className="space-y-4 p-4 rounded-lg backdrop-blur-sm bg-stone-800/60 dark:bg-gray-900/70 shadow-xl border border-stone-700 dark:border-gray-600 transition-colors duration-300">
                                <h2 className="text-lg font-bold text-white border-b border-white/40 dark:border-gray-600 pb-1 mb-2 transition-colors duration-300">
                                    Parent/Guardian Information
                                </h2>
                                
                                <div className="flex space-x-2">
                                    <Input 
                                        label="Guardian First Name" 
                                        name="guardianFirstName" 
                                        type="text"
                                        value={formData.guardianFirstName}
                                        onChange={handleInputChange}
                                        required
                                        className="flex-1" 
                                    />
                                    <Input 
                                        label="Guardian Last Name" 
                                        name="guardianLastName" 
                                        type="text"
                                        value={formData.guardianLastName}
                                        onChange={handleInputChange}
                                        required
                                        className="flex-1" 
                                    />
                                </div>
                                
                                <div className="flex space-x-2">
                                    <Input 
                                        label="Relationship" 
                                        name="relationship" 
                                        type="text"
                                        value={formData.relationship}
                                        onChange={handleInputChange}
                                        required
                                        className="flex-1" 
                                    />
                                    <Input 
                                        label="Contact Number" 
                                        name="guardianContact" 
                                        type="tel"
                                        value={formData.guardianContact}
                                        onChange={handleInputChange}
                                        required
                                        className="flex-1" 
                                    />
                                </div>
                                <Input 
                                    label="Email Address" 
                                    name="guardianEmail" 
                                    type="email"
                                    value={formData.guardianEmail}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-4 p-4 rounded-lg backdrop-blur-sm bg-stone-800/60 dark:bg-gray-900/70 shadow-xl border border-stone-700 dark:border-gray-600 transition-colors duration-300">
                                <h2 className="text-lg font-bold text-white border-b border-white/40 dark:border-gray-600 pb-1 mb-2 transition-colors duration-300">
                                    Academic Information
                                </h2>
                                <div className="flex space-x-2">
                                    <div className="flex-1">
                                        <label htmlFor="gradeLevel" className="sr-only">Grade Level Applying for</label>
                                        <select 
                                            id="gradeLevel" 
                                            name="gradeLevel"
                                            value={formData.gradeLevel}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full h-8 px-3 bg-white/90 dark:bg-gray-700 dark:text-gray-100 text-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-sm placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
                                        >
                                            <option value="">Grade Level Applying for</option>
                                            {gradeLevels.map(level => (
                                                <option key={level} value={level.toLowerCase().replace(' ', '')}>{level}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <Input 
                                        label="Previous School (if applicable)" 
                                        name="previousSchool" 
                                        type="text"
                                        value={formData.previousSchool}
                                        onChange={handleInputChange}
                                        className="flex-1" 
                                    />
                                </div>
                            </div>
                            
                            <div className="p-4 rounded-lg backdrop-blur-sm bg-stone-800/60 dark:bg-gray-900/70 shadow-xl border border-stone-700 dark:border-gray-600 text-sm text-white space-y-3 transition-colors duration-300">
                                <div className="flex items-start space-x-2">
                                    <input 
                                        id="privacyAgreement" 
                                        name="privacyAgreement" 
                                        type="checkbox" 
                                        checked={hasAgreed}
                                        onChange={(e) => setHasAgreed(e.target.checked)}
                                        required
                                        className="mt-1 h-4 w-4 text-amber-400 border-gray-300 rounded focus:ring-amber-400 bg-white"
                                    />
                                    <label htmlFor="privacyAgreement" className="text-sm font-medium">
                                        I have read and agree to the 
                                        <button 
                                            type="button" 
                                            onClick={() => setIsModalOpen(true)}
                                            className="text-[#F4D77D] dark:text-amber-400 hover:text-amber-300 dark:hover:text-amber-300 font-bold underline ml-1 transition-colors duration-300"
                                        >
                                            Privacy Policy & Data Sharing Agreement.
                                        </button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-center pt-6">
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-[#F4D77D] dark:bg-amber-500 hover:bg-amber-300 dark:hover:bg-amber-400 text-black font-extrabold py-2 px-10 border-2 border-[#5B3E31] dark:border-amber-600 rounded-lg shadow-3xl text-base transition duration-200 uppercase ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="absolute bottom-2 right-4 flex items-center space-x-2 z-10">
                <div className="h-6 w-6 bg-blue-700 dark:bg-blue-600 rounded-sm transition-colors duration-300"></div> 
                <div className="h-6 w-6 bg-green-600 dark:bg-green-500 rounded-sm transition-colors duration-300"></div> 
            </div>
        </div>
    );
};

const Input = ({ label, name, type, value, onChange, required = false, className = '' }) => (
    <div className={className}>
        <label htmlFor={name} className="sr-only">{label}</label>
        <input 
            id={name} 
            name={name} 
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={label} 
            className="w-full h-8 px-3 bg-white/90 dark:bg-gray-700 dark:text-gray-100 text-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-amber-400 focus:border-amber-400 text-sm placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
        />
    </div>
);

export default Enroll;