import { Schema, model } from 'mongoose';
import { Guardian, Student, UserName } from './student.interface';

const useNameSchema = new Schema<UserName>({
  fName: { type: String, required: [true, 'First name is required'] },
  lName: { type: String, required: [true, 'Last name is required'] },
});

const guardianSchema = new Schema<Guardian>({
  name: { type: String, required: [true, 'Guardian name is required'] },
  relation: { type: String, required: [true, 'Guardian relation is required'] },
  contact: { type: String, required: [true, 'Guardian contact is required'] },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: [true, 'Student ID is required'], unique: true },
  name: { type: useNameSchema, required: [true, 'Student name is required'] },
  gender: { type: String, enum: ['male', 'female'], required: [true, 'Gender is required'] },
  dob: { type: String },
  contact: { type: String, required: [true, 'Contact number is required'] },
  email: { type: String, required: [true, 'Email address is required'] },
  address: { type: String, required: [true, 'Address is required'] },
  localGuardian: { type: guardianSchema, required: [true, 'Local guardian is required'] },
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], 
    required: [true, 'Blood group is required'] 
  },
  isActive: { 
    type: String, 
    enum: ['active', 'inactive'], 
    required: [true, 'Status is required'] 
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
