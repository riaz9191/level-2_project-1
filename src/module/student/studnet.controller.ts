import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { error } from 'console';
import { z } from 'zod';
import studentValidationSchema from './studnet.validation';

const createStudent = async (req: Request, res: Response) => {
  try {

    //creating schema validation using zod
    // const studentValidationSchema = z.object({
    //   id:z.string(),
    //   name:z.string().max(20,{message:"first name cant be more then 20 char"})
    // })


    const { student: studentData } = req.body;

    //data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData)

    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: true,
      message: err.message ||  'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudents();
    res.status(200).json({
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message ||  'Something went wrong',
      error: err,
    });
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const {studentId}= req.params
    const result = await StudentServices.getSingleStudents(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: true,
      message: err.message ||  'Something went wrong',
      error: err,
    });
  }
};
const deleteStudents = async (req: Request, res: Response) => {
  try {
    const {studentId}= req.params
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: true,
      message: err.message ||  'Something went wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudents
};
