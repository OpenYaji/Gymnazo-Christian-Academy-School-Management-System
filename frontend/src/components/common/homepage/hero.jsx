import React from 'react';
import Girl from '../../../assets/img/girl.png';
import Bg from '../../../assets/img/bg.png';
import Logo from '../../../assets/img/gymnazu.png';
import SplitText from "../../ui/SplitText";
import ShinyText from '../../ui/ShinyText';
import { Link } from 'react-router-dom';

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

const Hero = () => {

    const line1 = "GYMNAZO CHRISTIAN";
    const line2 = "ACADEMY";

    return (
        <div id="home" className="relative w-full h-screen bg-cover bg-center pt-[84px] -mt-[84px] transition-colors duration-300"
            style={{ backgroundImage: `url(${Bg})` }}>

            <div className="absolute inset-0 bg-black opacity-50 dark:opacity-70 z-0 transition-opacity duration-300"></div>
            <div className="relative z-2 flex flex-col lg:flex-row h-full items-center justify-center lg:justify-between px-4 sm:px-10 lg:px-20 text-white">

                <div className="max-w-xl text-center lg:text-left mb-10 lg:mb-0">

                    <h1 className="text-xl sm:text-2xl font-light mb-2">Welcome to the,</h1>

                    <h2 className="font-extrabold mb-4 lg:mb-6 leading-tight">
                        <SplitText
                            text={line1}
                            className="block text-3xl sm:text-4xl lg:text-5xl"
                            delay={200}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign='center'
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                        <SplitText
                            text={line2}
                            className="block text-3xl sm:text-4xl lg:text-5xl"
                            delay={400}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign='center'
                            onLetterAnimationComplete={handleAnimationComplete}
                        />
                    </h2>

                    <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-10">
                        <ShinyText
                            text="Affordable and Accessible Quality Education"
                            disabled={false}
                            speed={3}
                            className='custom-class'
                        />
                    </p>

                    <div className="flex justify-center lg:justify-start space-x-4">
                        <button className="border border-white text-white py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold hover:bg-white hover:text-black dark:hover:bg-gray-200 dark:hover:text-gray-900 transition duration-300">
                            READ MORE
                        </button>

                        <button className="bg-[#F4D77D] dark:bg-amber-500 text-black py-3 px-4 sm:px-6 text-xs sm:text-sm font-bold shadow-lg hover:bg-yellow-500 dark:hover:bg-amber-400 rounded-lg transition duration-300">
                            <Link to="/admission">ENROLL NOW</Link>
                        </button>
                    </div>
                </div>

                <div className="relative h-full flex items-end justify-center lg:justify-end mt-10 lg:mt-0 hidden lg:flex">
                    <img
                        src={Girl}
                        alt="Student"
                        className="h-[50vh] lg:h-[80vh] object-cover relative z-10 block dark:opacity-90"
                    />
                    <img
                        src={Logo}
                        alt="Gymnazo Logo Overlay"
                        className="absolute right-20 top-10 w-100 h-100 opacity-70 dark:opacity-50 z-1 hidden xl:block transition-opacity duration-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;