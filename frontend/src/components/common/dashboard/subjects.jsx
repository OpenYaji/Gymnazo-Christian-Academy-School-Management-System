import { useState, useEffect } from 'react';
import { Clock, User, BookOpen, X } from 'lucide-react';
import axios from 'axios';
import EngImg from '../../../assets/img/eng1.jpg';
import MathImg from '../../../assets/img/math1.png';
import FilipinoImg from '../../../assets/img/fil1.jpg';
import ScienceImg from '../../../assets/img/sci2.jpg';
import APImg from '../../../assets/img/ap1.png';
import MapehImg from '../../../assets/img/mapeh1.png';


const SubjectCard = ({ subject, onClick }) => {
  // Sample background images - you can replace with actual subject-themed images
  const subjectImages = {
    'ENGLISH': EngImg,
    'MATH': MathImg,
    'FILIPINO': FilipinoImg,
    'SCIENCE': ScienceImg,
    'ARALING PANLIPUNAN': APImg,
    'MAPEH': MapehImg,
    'EDUKASYON SA PAGPAPAKATAO': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    'COMPUTER': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400',
    'default': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400'
  };

  const getBackgroundImage = (subjectName) => {
    return subjectImages[subjectName?.toUpperCase()] || subjectImages['default'];
  };

  return (
    <div
      onClick={() => onClick(subject)}
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-48 border border-gray-200 dark:border-slate-700"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${getBackgroundImage(subject.name)})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-4">
        {/* Bottom Info */}
        <div className="space-y-2">
          <h3 className="text-white font-bold text-lg truncate">{subject.name}</h3>

          {subject.schedule && (
            <div className="flex items-center gap-2 text-white/90 text-xs">
              <Clock size={14} />
              <span>{subject.schedule}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-white/80 text-xs">
              <User size={12} />
              <span className="truncate max-w-[150px]">{subject.teacher || 'Teacher Name'}</span>
            </div>
            <button className="text-[#F4D77D] text-xs font-semibold hover:underline">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubjectModal = ({ subject, isOpen, onClose }) => {
  if (!isOpen || !subject) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 dark:border-slate-700">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white pr-8">{subject.name}</h2>
          {subject.schedule && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mt-2">
              <Clock size={16} />
              <span>{subject.schedule}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Teacher Info */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
            <div className="bg-[#F4D77D] p-2 rounded-full">
              <User size={20} className="text-gray-800" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Teacher</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">{subject.teacher || 'Not Assigned'}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {subject.description || 'No description available for this subject.'}
            </p>
          </div>

          {/* Additional Info */}
          {subject.room && (
            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Room:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{subject.room}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-[#F4D77D] hover:bg-[#f0cd5e] text-gray-800 font-semibold rounded-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('/backend/api/subjects/getStudentSubjects.php', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.data.success) {
        setSubjects(response.data.subjects || []);
      }
    } catch (err) {
      console.error('Error fetching subjects:', err);
      // Fallback sample data for demonstration
      setSubjects([
        { id: 1, name: 'ENGLISH', teacher: 'Ms. Sarah Johnson', schedule: 'Mon, Wed, Fri - 8:00 AM', description: 'Learn grammar, reading comprehension, and writing skills.', room: 'Room 101' },
        { id: 2, name: 'MATH', teacher: 'Mr. John Smith', schedule: 'Mon-Fri - 9:00 AM', description: 'Basic arithmetic, algebra, and problem-solving techniques.', room: 'Room 102' },
        { id: 3, name: 'FILIPINO', teacher: 'Gng. Maria Santos', schedule: 'Tue, Thu - 10:00 AM', description: 'Pag-aaral ng wika, panitikan, at kultura ng Pilipinas.', room: 'Room 103' },
        { id: 4, name: 'SCIENCE', teacher: 'Mrs. Emily Davis', schedule: 'Mon, Wed - 1:00 PM', description: 'Explore biology, chemistry, physics, and earth science.', room: 'Room 201' },
        { id: 5, name: 'ARALING PANLIPUNAN', teacher: 'Mr. Roberto Cruz', schedule: 'Tue, Thu - 2:00 PM', description: 'Kasaysayan, heograpiya, at lipunang pag-aaral.', room: 'Room 202' },
        { id: 6, name: 'MAPEH', teacher: 'Coach Mark Lee', schedule: 'Fri - 3:00 PM', description: 'Music, Arts, Physical Education, and Health education.', room: 'Gym' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSubject(null), 300);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4D77D]"></div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">My Subjects</h2>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No subjects scheduled yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={handleSubjectClick}
            />
          ))}
        </div>
      )}

      <SubjectModal
        subject={selectedSubject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Subjects;
