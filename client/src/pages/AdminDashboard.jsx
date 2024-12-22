import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminAuth from '../components/AdminAuth';

const AdminDashboard = () => {
  const [routines, setRoutines] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRoutines();
    }
  }, [isAuthenticated]);

  const fetchRoutines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/routines/admin/routines');
      setRoutines(response.data);
    } catch (error) {
      console.error('Error fetching routines:', error);
    }
  };

  const deleteRoutine = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/routines/admin/routines/${id}`);
      fetchRoutines();
    } catch (error) {
      console.error('Error deleting routine:', error);
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticate={setIsAuthenticated} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
      <Link to="/admin/create-routine" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-6 inline-block">
        Create New Routine
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {routines.map((routine) => (
              <tr key={routine._id}>
                <td className="px-6 py-4 whitespace-nowrap">{routine.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{routine.duration} weeks</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/admin/edit-routine/${routine._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteRoutine(routine._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;

