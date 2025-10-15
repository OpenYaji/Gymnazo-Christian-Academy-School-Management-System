import React from 'react';
import a1 from '../../../assets/img/a1.png';
import a2 from '../../../assets/img/a2.png';
import a3 from '../../../assets/img/a3.png';
import a4 from '../../../assets/img/a4.png';

import SpotlightCard from '../../ui/SpotlightCard';

const UpdatesSection = () => {
  const cards = [
    {
      icon: a1,
      title: 'Biblical Foundation',
      content:
        "We hold a God-centered view, believing all truth is God's truth, and that the Bible is the inspired, infallible, and authoritative word containing this truth.",
    },
    {
      icon: a2,
      title: 'Divine Purpose',
      content:
        'All creation exists to glorify God. Humanity fulfills this purpose by accepting salvation through Jesus Christ and committing to His Lordship.',
    },
    {
      icon: a3,
      title: 'Christian Education',
      content:
        'Administrators and teachers are responsible for meeting the needs of learners in both Christian Life Perspective and Academic Excellence.',
    },
    {
      icon: a4,
      title: 'Wholesome Environment',
      content:
        'Our learning environment promotes Christian values and is characterized by a wholesome setting, encouraging both individual and cooperative learning.',
    },
  ];

  return (
    <div className="w-full relative z-20 -mt-3 px-15 pb-5 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="flex justify-center">
              <SpotlightCard
                className="custom-spotlight-card w-full h-full"
              >
                <div
                  className="p-4 rounded-lg shadow-xl text-stone-800 dark:text-gray-100 bg-[#F4D77D] dark:bg-gray-800 w-full h-full flex flex-col justify-between transition-colors duration-300"
                >
                  <div className="flex justify-center mb-3">
                    <div className="bg-[#5B3E31] dark:bg-amber-600 rounded-full p-2 flex items-center justify-center w-16 h-16 transition-colors duration-300">
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="h-10 w-10 object-contain opacity-100"
                      />
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-center mb-3">
                    {card.title}
                  </h3>

                  <p className="text-xs text-center leading-snug">
                    {card.content}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatesSection;