import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '../../config';

import GradesSummary from '../common/academic/grades/GradesSummary';
import GradesTable from '../common/academic/grades/GradesTable';
import GradeDetailModal from '../common/academic/grades/GradeDetailModal';
import GradeTrendChart from '../common/academic/grades/GradeTrendChart';

const CurrentGradesPage = () => {
    const [gradesData, setGradesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/api/academics/getCurrentGrades.php`, {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setGradesData(response.data.data);
                } else {
                    setError(response.data.message || 'Failed to fetch grades data.');
                }
            } catch (err) {
                setError('An error occurred while fetching grades.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGrades();
    }, []);

    if (loading) {
        return <div className="p-8 text-center">Loading Current Grades...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    if (!gradesData || !gradesData.subjects || gradesData.subjects.length === 0) {
        return <div className="p-8 text-center">No current grades are available at this time.</div>;
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Current Grades
                </h1>
                <Link 
                    to="/student-dashboard/academic"
                    className="flex items-center gap-2 text-sm font-semibold bg-white dark:bg-slate-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors border border-gray-200 dark:border-slate-600"
                >
                    <ArrowLeft size={16} />
                    Back to Academic
                </Link>
            </div>

            <div className="flex flex-col gap-8">
                <GradesSummary data={gradesData.summary} />
                <GradesTable subjects={gradesData.subjects} onSubjectClick={setSelectedSubject} />
                <GradeTrendChart subjects={gradesData.subjects} />
            </div>

            <GradeDetailModal 
                subject={selectedSubject}
                onClose={() => setSelectedSubject(null)}
            />
        </>
    );
};

export default CurrentGradesPage;
