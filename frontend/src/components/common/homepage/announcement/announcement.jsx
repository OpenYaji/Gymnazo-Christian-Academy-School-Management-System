import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowRight, FiAward, FiBookOpen, FiHeart, FiUsers } from 'react-icons/fi';
import AnnouncementModal from './AnnouncementModal';
import Carousel from './Carousel.jsx';

import Pic from '../../../../assets/img/team.png';
import Pic2 from '../../../../assets/img/announcementreal.jpg';
import Pic3 from '../../../../assets/img/fam.jpg';
import Pic4 from '../../../../assets/img/pic2.jpg';
import Pic5 from '../../../../assets/img/pic3.jpg';
import Pic6 from '../../../../assets/img/pic4.jpg';
import Pic7 from '../../../../assets/img/about1.jpg';
import Pic8 from '../../../../assets/img/tree.jpg';
import Pic9 from '../../../../assets/img/about3.jpg';
import Pic10 from '../../../../assets/img/library.jpg';
import Pic11 from '../../../../assets/img/about5.jpg';
import Pic12 from '../../../../assets/img/about6.jpg';

const Announcement = () => {
  const announcementsData = [
    { id: 1, title: "Parent-Teacher Association (PTA) General Assembly", category: 'Events', publishDate: '2025-10-15', summary: 'All parents and guardians are invited to the first PTA General Assembly for the school year to discuss upcoming activities and programs.', fullContent: `<p>We cordially invite you to our first Parent-Teacher Association (PTA) General Assembly on <strong>Saturday, November 8, 2025, at 9:00 AM</strong> in the school gymnasium.</p><p>Our agenda will include the introduction of new faculty, presentation of the school calendar, and planning for our upcoming Family Day. Your presence and participation are highly valued as we work together for our children's success. We look forward to seeing you there!</p>`, 
      imageUrl: `${Pic}`, isPinned: true },
    { id: 2, title: "NO CLASSES: October 24, 2025", category: 'General', publishDate: '2025-10-18', summary: 'Please be advised that there will be no classes on Friday, October 24, 2025, to allow our teachers to attend a professional development seminar.', fullContent: `<p>In our continuous effort to enhance our teaching methods, all faculty members will be participating in an in-service professional development day.</p><p>As such, there will be <strong>no classes for all grade levels on Friday, October 24, 2025</strong>. Regular classes will resume on Monday, October 27. Please guide your children in doing their homework during this time. Thank you for your understanding.</p>`, 
      imageUrl: `${Pic2}`, isPinned: false },
    { id: 3, title: "Annual Family Fun Day!", category: 'Events', publishDate: '2025-10-17', summary: 'Mark your calendars! Our much-awaited Family Fun Day is happening this November with exciting new games and activities.', fullContent: `<p>It's that time of the year again! Join us for a day of fun, food, and laughter at our Annual Family Fun Day on <strong>Saturday, November 22, 2025</strong>, from 8:00 AM to 4:00 PM at the school grounds.</p><p>Get ready for exciting games, inflatable castles, food booths, and special performances from our students. It's a perfect day to bond with family and the school community. See you there!</p>`, 
      imageUrl: `${Pic3}`, isPinned: false },
    { id: 4, title: "Book Fair Week is Coming!", category: 'Academic', publishDate: '2025-10-12', summary: 'Encourage the love for reading! Our school library will be hosting a Book Fair with a wide variety of fun and educational books.', fullContent: `<p>Let's open a world of adventure through reading! The annual Scholastic Book Fair will be held at the school library from <strong>November 3 to November 7, 2025</strong>.</p><p>A wide selection of affordable and educational books will be available for purchase. This is a wonderful opportunity to help your child build their own little library at home.</p>`, 
      imageUrl: `${Pic4}`, isPinned: false },
    { id: 5, title: "First Quarter Report Card Distribution", category: 'Academic', publishDate: '2025-10-10', summary: 'Report cards for the first quarter will be distributed to parents and guardians next week.', fullContent: `<p>The distribution of the First Quarter report cards will be on Friday, October 31, 2025, from 8:00 AM to 12:00 PM. Parents are requested to come to their child's respective classroom to receive the report card and have a brief conference with the adviser.</p>`, 
      imageUrl: `${Pic5}`, isPinned: false },
    { id: 6, title: "School Picture Day", category: 'Events', publishDate: '2025-10-09', summary: 'Smile! School picture day is scheduled for the first week of November. Please come in your best uniform.', fullContent: `<p>Get ready for your closeup! Our annual School Picture Day will be held on November 4-5, 2025. Please ensure students are in their complete and proper school uniform. Order forms will be sent home with the students next week.</p>`, 
      imageUrl: `${Pic6}`, isPinned: false },
  ];

  const carouselNewsData = [
      { id: 1, title: "Clean Classroom Award", description: "Grade 3 receives the award for the cleanest classroom for the month of September. Well done!", icon: <FiAward className="h-4 w-4 text-white" />, 
        image: `${Pic7}` },
      { id: 2, title: "Tree Planting Day", description: "Our students successfully participated in a community tree-planting day. Great job, everyone!", icon: <FiHeart className="h-4 w-4 text-white" />, 
        image: `${Pic8}` },
      { id: 3, title: "New Student Council", description: "Congratulations to the newly elected officers of the student council for this school year.", icon: <FiUsers className="h-4 w-4 text-white" />,
        image: `${Pic9}` },
      { id: 4, title: "Library Day", description: "Our school celebrates Library Day with fun activities and storytelling sessions for all grades.", icon: <FiBookOpen className="h-4 w-4 text-white" />, 
        image: `${Pic10}` }
  ];

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const categories = ['All', 'Academic', 'Events', 'General'];
  const pinnedAnnouncement = announcementsData.find(a => a.isPinned);
  const regularAnnouncements = announcementsData.filter(a => !a.isPinned);
  const filteredAnnouncements = activeFilter === 'All' ? regularAnnouncements : regularAnnouncements.filter(a => a.category === activeFilter);

  const leftVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className='w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8'>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-end mb-2">
            <div>
                <h2 className="text-2xl font-extrabold text-[#5B3E31] dark:text-amber-400 sm:text-3xl">LATEST ANNOUNCEMENT</h2>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={leftVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            
            <div>
              <div className="hidden sm:flex items-center border-b border-gray-200 dark:border-gray-700 mb-6">
                {categories.map(category => (
                  <button key={category} onClick={() => setActiveFilter(category)} className="relative px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    {category}
                    {activeFilter === category && (<motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" layoutId="filter-underline" />)}
                  </button>
                ))}
              </div>
              <div className="sm:hidden mb-4">
                <select 
                  onChange={(e) => setActiveFilter(e.target.value)} 
                  value={activeFilter}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
                >
                  {categories.map(category => (<option key={category} value={category}>{category}</option>))}
                </select>
              </div>
              
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                {filteredAnnouncements.map(item => (
                  <motion.div key={item.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} onClick={() => setSelectedAnnouncement(item)} className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative h-40 overflow-hidden"><img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" /></div>
                    <div className="p-4">
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-1">{item.category}</p>
                      <h5 className="text-base font-bold text-gray-900 dark:text-white mb-2 truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{item.title}</h5>
                    </div>
                  </motion.div>
                ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-1 order-first lg:order-last"
            variants={rightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
             <div className="lg:sticky top-32">
             <h2 className="flex justify-center text-2xl font-bold text-[#5B3E31] dark:text-amber-400 sm:text-3xl">NEWS</h2>
             <div className="flex justify-center">
                    <Carousel items={carouselNewsData} baseWidth={350} height={380} autoplay={true} autoplayDelay={3500} pauseOnHover={true} loop={true} />
                </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedAnnouncement && (<AnnouncementModal announcement={selectedAnnouncement} onClose={() => setSelectedAnnouncement(null)} />)}
      </AnimatePresence>
    </div>
  );
};

export default Announcement;