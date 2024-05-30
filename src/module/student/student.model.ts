import { Schema, model, connect } from 'mongoose';
import { Guardian, Student, UserName } from './student.interface';

const useNameSchema = new Schema<UserName>({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
});
const guardianSchema = new Schema<Guardian>({
  name: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: useNameSchema,
  gender: { type: String, enum: ['male', 'female'], required: true },
  dob: { type: String },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  localGuardian: guardianSchema,
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  isActive: { type: String, enum: ['active', 'inactive'], required: true },
});

// const StudentModel = model<Student>('Student', studentSchema);

export const StudentModel = model<Student>("Student",studentSchema);

