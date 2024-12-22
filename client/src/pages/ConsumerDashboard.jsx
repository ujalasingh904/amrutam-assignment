import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConsumerDashboard = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/routines');
        setRoutines(response.data);
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    };

    fetchRoutines();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <h2 className="text-3xl font-bold mb-8">Your Routines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.map((routine) => (
          <motion.div
            key={routine._id}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h3 className="text-xl font-semibold mb-2">{routine.name}</h3>
            <p className="text-gray-600 mb-4">{routine.duration} weeks</p>
            <Link
              to={`/routine/${routine._id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ConsumerDashboard;

