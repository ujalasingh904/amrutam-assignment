import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const RoutineDetails = () => {
  const { id } = useParams();
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/routines/${id}`);
        setRoutine(response.data);
      } catch (error) {
        console.error('Error fetching routine:', error);
      }
    };

    fetchRoutine();
  }, [id]);

  if (!routine) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <h2 className="text-3xl font-bold mb-8">{routine.name}</h2>
      <p className="text-xl mb-6">Duration: {routine.duration} weeks</p>

      <h3 className="text-2xl font-semibold mb-4">Milestones</h3>
      <ul className="list-disc pl-6 mb-8">
        {routine.milestones.map((milestone, index) => (
          <li key={index} className="mb-2">
            Week {milestone.week}: {milestone.benefit}
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mb-4">Steps</h3>
      <div className="space-y-6">
        {routine.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h4 className="text-xl font-semibold mb-2">{step.name}</h4>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RoutineDetails;

