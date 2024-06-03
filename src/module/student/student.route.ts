import express from 'express';
import { StudentControllers } from './studnet.controller';

const router = express.Router();

// will call controller
router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudents);
router.delete('/:studentId', StudentControllers.deleteStudents);

export const StudentRoutes = router;
