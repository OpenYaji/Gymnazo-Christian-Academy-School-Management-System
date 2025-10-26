import React from 'react';
import { Pencil } from 'lucide-react';
import DefaultProfilePic from '../../../assets/img/jhego.jpg';

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-md">

      <div className="relative h-40 bg-gradient-to-r from-amber-300 to-orange-400 rounded-t-2xl">
        <button className="absolute top-4 right-4 bg-black/10 backdrop-blur-sm p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-black/20 transition">
          <Pencil size={16} />
        </button>
      </div>

      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          
          <div className="flex items-end"> 
            <img
              src={user.profilePictureURL || DefaultProfilePic}
              alt="Profile" 
              className="relative z-10 w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 object-cover -mt-14 flex-shrink-0"
            />
            <div className="ml-4 mb-4 sm:mb-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{user.fullName}</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                <span className="text-green-400 text-xl dark:text-green-500">•</span>
                <p className=" bg-yellow-300 dark:bg-yellow-300 rounded-xl text-sm p-1 font-normal text-black dark:text-black">{user.role || 'Student'}</p>
              </div>
            </div>
            
          </div>

          <div className="mt-4 sm:mt-0">
            <button className="text-sm font-semibold border border-gray-200 dark:border-slate-600 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              Change Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;