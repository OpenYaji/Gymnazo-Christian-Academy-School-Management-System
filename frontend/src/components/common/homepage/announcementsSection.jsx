import React from 'react';

const AnnouncementCard = ({ image, title, description }) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-200 dark:border-gray-700'>
      <div className='relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700'>
        {image ? (
          <img src={image} alt={title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-600'>
            <svg className='w-16 h-16 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd' />
            </svg>
          </div>
        )}
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4'>
          <span className='text-white text-xs font-semibold bg-red-600 px-2 py-1 rounded'>ENROLLMENT</span>
        </div>
      </div>
      <div className='p-4'>
        <h4 className='text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2'>
          {title}
        </h4>
        <p className='text-xs text-gray-600 dark:text-gray-400 line-clamp-2'>
          {description}
        </p>
      </div>
    </div>
  );
};

const ComingUpCard = () => {
  return (
    <div className='bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-md border border-amber-200 dark:border-gray-600 transition-colors duration-300'>
      <h3 className='text-xl font-bold text-gray-900 dark:text-gray-100 mb-4'>Coming up</h3>
      <div className='space-y-4'>
        <div className='flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
          <div className='flex-shrink-0'>
            <div className='w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center'>
              <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                </svg>
            </div>
          </div>
          <div>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-gray-200'>Event Name</h4>
            <p className='text-xs text-gray-600 dark:text-gray-400'>Date and Time</p>
            <p className='text-xs text-gray-600 dark:text-gray-400'>Location</p>
          </div>
        </div>
        <div className='flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm'>
          <div className='flex-shrink-0'>
            <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
              <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
              </svg>
            </div>
          </div>
          <div>
            <h4 className='text-sm font-semibold text-gray-900 dark:text-gray-200'>Another Event</h4>
            <p className='text-xs text-gray-600 dark:text-gray-400'>Date and Time</p>
            <p className='text-xs text-gray-600 dark:text-gray-400'>Location</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnouncementsSection = () => {
  const announcements = [
    {
      image: 'https://images.unsplash.com/photo-1517842067-bc650b2f374a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'New Fitness Class Starting Soon',
      description: 'Get ready to sweat! Our new fitness class will help you reach your goals.',
    },
    {
      image: 'https://images.unsplash.com/photo-1532614338840-ab30cf70aa34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Special Offer on Personal Training',
      description: 'Achieve your fitness goals faster with our personalized training programs.',
    },
  ];

  return (
    <section className='py-12 bg-gray-50 dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center'>
          Announcements
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {announcements.map((announcement, index) => (
            <AnnouncementCard key={index} {...announcement} />
          ))}
          <div className='md:col-span-1 lg:col-span-1'>
            <ComingUpCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;