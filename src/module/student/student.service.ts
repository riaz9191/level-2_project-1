import { TStudent } from './student.interface';
import { Student } from './student.model';

// const createStudentIntoDB = async (student: TStudent) => {
//   if (await Student.isUserExists(student.id)) {
//     throw new Error("User already exist")
//   }
//   const result = await Student.create(student); //built in static method
//   return result;
// };
// const createStudentIntoDB = async (studentData: TStudent) => {
//   const student = new Student(studentData) //create an instance
//   if( await student.isUserExist(studentData.id)){
//     throw new Error("User already exist")
//   }
//   const result = student.save() //built in instance method
//   return result;
// };

const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudents = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([
    {$match:{id:id}}
  ])
  return result;
};
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleted:true});
  return result;
};

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudents,
  getSingleStudents,
  deleteStudentFromDB
};
