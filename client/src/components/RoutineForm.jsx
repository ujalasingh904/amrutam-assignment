import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const RoutineForm = ({ isEditing = false }) => {
  const [routine, setRoutine] = useState({
    name: '',
    duration: 8,
    milestones: [],
    steps: []
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEditing && id) {
      fetchRoutine();
    }
  }, [isEditing, id]);

  const fetchRoutine = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/routines/${id}`);
      setRoutine(response.data);
    } catch (error) {
      console.error('Error fetching routine:', error);
    }
  };

  const handleInputChange = (e) => {
    setRoutine({ ...routine, [e.target.name]: e.target.value });
  };

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...routine.milestones];
    updatedMilestones[index][field] = value;
    setRoutine({ ...routine, milestones: updatedMilestones });
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...routine.steps];
    updatedSteps[index][field] = value;
    setRoutine({ ...routine, steps: updatedSteps });
  };

  const addMilestone = () => {
    setRoutine({
      ...routine,
      milestones: [...routine.milestones, { week: routine.milestones.length + 1, benefit: '' }]
    });
  };

  const addStep = () => {
    setRoutine({
      ...routine,
      steps: [...routine.steps, { name: '', description: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.patch(`http://localhost:5000/api/routines/admin/routines/${id}`, routine);
      } else {
        await axios.post('http://localhost:5000/api/routines/admin/routines', routine);
      }
      navigate('/admin');
    } catch (error) {
      console.error('Error saving routine:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <h2 className="text-3xl font-bold mb-8">{isEditing ? 'Edit Routine' : 'Create New Routine'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Routine Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={routine.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (weeks)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={routine.duration}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Milestones</h3>
          {routine.milestones.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="number"
                value={milestone.week}
                onChange={(e) => handleMilestoneChange(index, 'week', e.target.value)}
                className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Week"
              />
              <input
                type="text"
                value={milestone.benefit}
                onChange={(e) => handleMilestoneChange(index, 'benefit', e.target.value)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Benefit"
              />
            </div>
          ))}
          <button type="button" onClick={addMilestone} className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
            Add Milestone
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Steps</h3>
          {routine.steps.map((step, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                type="text"
                value={step.name}
                onChange={(e) => handleStepChange(index, 'name', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Step name"
              />
              <textarea
                value={step.description}
                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Step description"
                rows="3"
              ></textarea>
            </div>
          ))}
          <button type="button" onClick={addStep} className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
            Add Step
          </button>
        </div>
        <div>
          <button type="submit" className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600">
            {isEditing ? 'Update Routine' : 'Create Routine'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RoutineForm;

