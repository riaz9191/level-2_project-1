import { z } from "zod";

// Define Zod schema for UserName
const userNameSchema = z.object({
    fName: z
      .string()
      .max(20, 'First Name cannot be more than 20 characters')
      .nonempty('First name is required')
      .trim(),
    lName: z.string().nonempty('Last name is required'),
  });
  
  // Define Zod schema for Guardian
  const guardianSchema = z.object({
    name: z.string().nonempty('Guardian name is required'),
    relation: z.string().nonempty('Guardian relation is required'),
    contact: z.string().nonempty('Guardian contact is required'),
  });
  
  // Define Zod schema for Student
  const studentValidationSchema = z.object({
    id: z.string().nonempty('Student ID is required'),
    password:z.string().max(20),
    name: userNameSchema,
    gender: z.enum(['male', 'female']).refine(val => ['male', 'female'].includes(val), {
      message: 'Gender is required',
    }),
    dob: z.string().optional(),
    contact: z.string().nonempty('Contact number is required'),
    email: z.string().email('Invalid email address').nonempty('Email address is required'),
    address: z.string().nonempty('Address is required'),
    localGuardian: guardianSchema,
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).refine(val => ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(val), {
      message: 'Blood group is required',
    }),
    isActive: z.enum(['active', 'inactive']).refine(val => ['active', 'inactive'].includes(val), {
      message: 'Status is required',
    }),
    isDeleted:z.boolean()
  });
  
  export default studentValidationSchema