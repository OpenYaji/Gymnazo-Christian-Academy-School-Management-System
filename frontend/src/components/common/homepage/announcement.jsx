import React from 'react'
import ModelViewer from '../../ui/ModelViewer'
import Carousel from '../../ui/Carousel'
import AnnounceCard from '../../ui/announceCard'
import Pic1 from '../../../assets/img/pic6.jpg'
import Pic2 from '../../../assets/img/about7.jpg'

const announcement = () => {
  const ViewAllButton = () => (
    <button
      className="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1 text-center font-medium text-sm text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-900/50 lg:px-5 lg:py-2 lg:text-base"
    >
      <div className="flex items-center gap-2 lg:gap-3">
        <div
          className="h-2 w-2 rounded-full bg-base-brown dark:bg-amber-400 transition-all duration-300 group-hover:scale-[100.8]"
        ></div>
        <span
          className="inline-block transition-all duration-300 group-hover:translate-x-8 group-hover:opacity-0 lg:group-hover:translate-x-12"
        >
          View All
        </span>
      </div>

      <div
        className="absolute top-0 z-10 flex h-full w-full translate-x-8 items-center justify-center gap-2 bg-base-brown dark:bg-amber-500 text-white dark:text-gray-900 opacity-0 transition-all duration-300 group-hover:-translate-x-3 group-hover:opacity-100 lg:translate-x-12 lg:group-hover:-translate-x-5"
      >
        <div className="flex items-center gap-2 whitespace-nowrap lg:gap-3">
          <span className="leading-none font-medium">View All</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 leading-none lg:h-4 lg:w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12h14"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 6l6 6-6 6"
            ></path>
          </svg>
        </div>
      </div>
    </button>
  );

  return (
    <div className='w-full bg-white dark:bg-gray-900 transition-colors duration-300'>

      <div className='w-full pb-10'>
        <div className='hidden lg:flex lg:justify-around lg:items-start gap-6 px-4 pt-10'>
          <div className='flex-1 max-w-[900px] bg-gray-100 dark:bg-gray-800 rounded-lg p-8 transition-colors duration-300'>
            <div className='flex justify-center items-center mb-8'>
              <h3 className='mr-10 text-4xl font-bold text-base-brown dark:text-amber-400 transition-colors duration-300 pb-2'>LATEST ANNOUNCEMENTS</h3>
            </div>

            <div className='grid grid-cols-2 gap-8'>
              <AnnounceCard
                image={Pic1} 
              />
              <AnnounceCard
                image={Pic2} 
              />
            </div>
          </div>

          <div className='flex-shrink-0 flex flex-col'>
            <h3 className='flex justify-center text-4xl font-bold text-base-brown dark:text-amber-400 mb-4 transition-colors duration-300'>NEWS</h3>
            <div className='flex justify-center items-start flex-1'>
              <Carousel
                baseWidth={400}
                height={420}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                loop={true}
                round={false}
              />
            </div>
          </div>
        </div>
        <div className='hidden lg:flex justify-center mt-3'>
          <ViewAllButton />

        </div>

        {/* Mobile/Tablet Layout (up to lg: breakpoint) */}
        <div className='lg:hidden space-y-8 px-4'>
          <div className='bg-[#f8e19e] dark:bg-gray-800 rounded-lg p-8 transition-colors duration-300'>
            <div className='flex justify-between items-center mb-8'>
              <h3 className='text-3xl font-bold text-base-brown dark:text-amber-400 transition-colors duration-300'>Latest Announcements</h3>
              <ViewAllButton />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='mx-auto'>
                <AnnounceCard />
              </div>
              <div className='mx-auto'>
                <AnnounceCard />
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-3xl font-bold text-gray-800 dark:text-amber-400 mb-4 text-center transition-colors duration-300'>LATEST NEWS</h3>
            <div className='flex justify-center'>
              <Carousel
                baseWidth={400}
                height={420}
                autoplay={true}
                autoplayDelay={3000}
                pauseOnHover={true}
                loop={true}
                round={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default announcement