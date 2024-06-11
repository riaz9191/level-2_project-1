import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser } from "./user.interface";

const createStudentIntoDB = async (password:string,student: TStudent) => {
    //create a user object
    const user:NewUser = {}
    user.password = password || (config.default_password as string)
    // set student role 
    user.role = 'student'

    //set manually gen id
    user.id = "2030100001"
    // create a user
  const result = await User.create(user); //built in static method
  return result;
};


export const UserServices = {
    createStudentIntoDB
}