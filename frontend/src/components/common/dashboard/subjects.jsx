import React from 'react';
import Folder from '../../ui/Folder';

const subjectItems = [
  { name: 'English', color: '#4A90E2', desktopClass: 'lg:row-start-1 lg:col-start-1' },
  { name: 'Math', color: '#D0021B', desktopClass: 'lg:col-start-3' },
  { name: 'Science', color: '#50E3C2', desktopClass: 'lg:col-start-5' },
  { name: 'Filipino', color: '#F8E71C', desktopClass: 'lg:row-start-3' },
  { name: 'PE', color: '#F5A623', desktopClass: 'lg:col-start-3 lg:row-start-3' },
  { name: 'AP', color: '#BD10E0', desktopClass: 'lg:col-start-5 lg:row-start-3' },
  { name: 'ESP', color: '#9013FE', desktopClass: 'lg:row-start-5' },
  { name: 'ESP', color: '#9013FE', desktopClass: 'lg:row-start-5' },
  { name: 'ESP', color: '#9013FE', desktopClass: 'lg:row-start-5' },

];

const Subjects = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 sm:p-8">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:h-[80vh] lg:grid-cols-6 lg:grid-rows-6 lg:gap-4">
        {subjectItems.map((subject) => (
          <div
            key={subject.name}
            className={`flex flex-col items-center justify-center gap-4 lg:col-span-2 lg:row-span-2 ${subject.desktopClass}`}
          >
            <Folder
              color={subject.color}
              size={1.7}
              items={[
                <div key="content" className="flex h-full w-full items-center justify-center p-2 text-center text-lg font-bold">
                  {subject.name}
                </div>
              ]}
            />
            <p className="text-center text-base font-bold text-slate-900 dark:text-slate-50 sm:text-xl">
              {subject.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;