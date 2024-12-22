import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const RoutineBuilder = () => {
  const [routine, setRoutine] = useState({
    name: '',
    duration: 8,
    milestones: [],
    steps: []
  });

  const handleInputChange = (e) => {
    setRoutine({ ...routine, [e.target.name]: e.target.value });
  };

  const addMilestone = () => {
    setRoutine({
      ...routine,
      milestones: [...routine.milestones, { week: routine.milestones.length + 1, benefit: '' }]
    });
  };

  const updateMilestone = (index, benefit) => {
    const updatedMilestones = [...routine.milestones];
    updatedMilestones[index].benefit = benefit;
    setRoutine({ ...routine, milestones: updatedMilestones });
  };

  const addStep = () => {
    setRoutine({
      ...routine,
      steps: [...routine.steps, { name: '', description: '' }]
    });
  };

  const updateStep = (index, field, value) => {
    const updatedSteps = [...routine.steps];
    updatedSteps[index][field] = value;
    setRoutine({ ...routine, steps: updatedSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/routines', routine);
      console.log('Routine created:', response.data);
      // Reset form or redirect
    } catch (error) {
      console.error('Error creating routine:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-12"
    >
      <h2 className="text-3xl font-bold mb-8">Create a New Routine</h2>
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
              <span>Week {milestone.week}:</span>
              <input
                type="text"
                value={milestone.benefit}
                onChange={(e) => updateMilestone(index, e.target.value)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Enter benefit"
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
                onChange={(e) => updateStep(index, 'name', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Step name"
              />
              <textarea
                value={step.description}
                onChange={(e) => updateStep(index, 'description', e.target.value)}
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
            Create Routine
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default RoutineBuilder;

