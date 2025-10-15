import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/img/gymnazu.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className='w-full shadow-md sticky top-0 z-50'>
<div className='flex justify-between items-center h-16 sm:h-20 bg-gray-100 dark:bg-gray-800 px-4 sm:px-0 transition-colors duration-300'>
    <div className='flex items-center'>
        <a href="#home">
            <img 
                src={Logo} 
                alt='Gymnazo' 
                className='h-10 w-10 sm:h-14 sm:w-14 sm:ml-7 border-[#5B3E31] dark:border-amber-400 border-2 rounded-full'
            />
        </a>
        <div className='ml-2 sm:ml-4 text-[#5B3E31] dark:text-amber-400 transition-colors duration-300'>
            <div className='font-bold text-xs sm:text-base'>GYMNAZO CHRISTIAN ACADEMY</div>
            <div className='text-[10px] sm:text-sm'>NOVALICHES</div>
        </div>
    </div>

        <div className='flex items-center gap-2 sm:gap-4'>
          <button
            onClick={toggleDarkMode}
            className="relative w-8 h-8 rounded-full bg-white dark:bg-gray-700 border border-[#5B3E31] dark:border-amber-400 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
            aria-label="Toggle dark mode"
          >
            <svg
              className={`absolute w-4 h-4 text-orange-500 transition-all duration-300 ${
                isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z" />
            </svg>

            <svg
              className={`absolute w-4 h-4 text-amber-400 transition-all duration-300 ${
                isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2Z" />
            </svg>
          </button>

          <button className='bg-[#F4D77D] hover:bg-amber-300 dark:bg-amber-500 dark:hover:bg-amber-400 text-black lg:mr-10 font-bold py-1.5 px-3 sm:py-2 sm:px-4 border-2 border-[#5B3E31] dark:border-amber-600 rounded-full shadow-3xl text-xs sm:text-base transition-colors duration-300'>
            <Link to="/login">LOGIN</Link>
          </button>

          <button 
            onClick={toggleMenu}
            className='lg:hidden flex flex-col justify-center items-center w-8 h-8 sm:mr-4'
            aria-label="Toggle menu"
          >
            <span className={`bg-[#5B3E31] dark:bg-amber-400 h-0.5 w-6 rounded transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`bg-[#5B3E31] dark:bg-amber-400 h-0.5 w-6 rounded mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`bg-[#5B3E31] dark:bg-amber-400 h-0.5 w-6 rounded mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>

      <nav className='hidden lg:flex justify-center gap-14 h-8 bg-[#F4D77D] dark:bg-gray-700 text-[#5B3E31] dark:text-amber-400 py-2 text-sm font-bold transition-colors duration-300'>
        <a href="#home" className='hover:text-[#ffffff] transition duration-150'>HOME</a>
        <a href="#about-us" className='hover:text-[#ffffff] transition duration-150'>ABOUT US</a>
        <a href="#announcement" className='hover:text-[#ffffff] transition duration-150'>ANNOUNCEMENT</a>
        <a href="#contact-us" className='hover:text-[#ffffff] transition duration-150'>CONTACT US</a>
      </nav>

      <nav className={`lg:hidden bg-[#F4D77D] dark:bg-gray-700 text-[#5B3E31] dark:text-amber-400 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className='flex flex-col items-center py-4 gap-4 font-bold text-sm'>
          <a 
            href="#home" 
            className='hover:text-[#ffffff] transition duration-150 w-full text-center py-2'
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </a>
          <a 
            href="#about-us" 
            className='hover:text-[#ffffff] transition duration-150 w-full text-center py-2'
            onClick={() => setIsMenuOpen(false)}
          >
            ABOUT US
          </a>
          <a 
            href="#announcement" 
            className='hover:text-[#ffffff] transition duration-150 w-full text-center py-2'
            onClick={() => setIsMenuOpen(false)}
          >
            ANNOUNCEMENT
          </a>
          <a 
            href="#contact-us" 
            className='hover:text-[#ffffff] transition duration-150 w-full text-center py-2'
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT US
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;