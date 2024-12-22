import Routine from '../models/routineModel.js';

export const createRoutine = async (req, res) => {
  try {
    const newRoutine = new Routine(req.body);
    const savedRoutine = await newRoutine.save();
    res.status(201).json(savedRoutine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getRoutines = async (req, res) => {
  try {
    const routines = await Routine.find();
    res.status(200).json(routines);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRoutine = async (req, res) => {
  try {
    const routine = await Routine.findById(req.params.id);
    if (!routine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json(routine);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRoutine = async (req, res) => {
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json(updatedRoutine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteRoutine = async (req, res) => {
  try {
    const deletedRoutine = await Routine.findByIdAndDelete(req.params.id);
    if (!deletedRoutine) {
      return res.status(404).json({ message: 'Routine not found' });
    }
    res.status(200).json({ message: 'Routine deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//admin routines

export const getAdminRoutines = async (req, res) => {
  try {
    const routines = await Routine.find().sort({ createdAt: -1 });
    res.status(200).json(routines);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createAdminRoutine = async (req, res) => {
  const routine = req.body;
  const newRoutine = new Routine(routine);
  try {
    await newRoutine.save();
    res.status(201).json(newRoutine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateAdminRoutine = async (req, res) => {
  const { id: _id } = req.params;
  const routine = req.body;
  try {
    const updatedRoutine = await Routine.findByIdAndUpdate(_id, routine, { new: true });
    res.json(updatedRoutine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdminRoutine = async (req, res) => {
  const { id } = req.params;
  try {
    await Routine.findByIdAndDelete(id);
    res.json({ message: 'Routine deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


