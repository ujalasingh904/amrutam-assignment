import express from 'express';
import { 
  getRoutines, 
  getRoutine, 
  createRoutine, 
  updateRoutine, 
  deleteRoutine,
  getAdminRoutines,
  createAdminRoutine,
  updateAdminRoutine,
  deleteAdminRoutine
} from '../controllers/routineController.js';

const router = express.Router();


router.get('/', getRoutines);
router.get('/:id', getRoutine);
router.post('/', createRoutine);
router.patch('/:id', updateRoutine);
router.delete('/:id', deleteRoutine);


router.get('/admin/routines', getAdminRoutines);
router.post('/admin/routines', createAdminRoutine);
router.patch('/admin/routines/:id', updateAdminRoutine);
router.delete('/admin/routines/:id', deleteAdminRoutine);

export default router;

