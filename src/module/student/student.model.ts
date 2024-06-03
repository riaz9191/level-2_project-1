import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student.interface';
import { StudentControllers } from './studnet.controller';
import bcrypt from 'bcrypt';
import config from '../../config';

const useNameSchema = new Schema<TUserName>({
  fName: {
    type: String,
    required: [true, 'First name is required'],
    maxlength: [20, 'First Name cant be more then 20 words'],
    trim: true,
    validate: function (value) {
      console.log(value);
    },
  },
  lName: { type: String, required: [true, 'Last name is required'] },
});

const guardianSchema = new Schema<TGuardian>({
  name: { type: String, required: [true, 'Guardian name is required'] },
  relation: { type: String, required: [true, 'Guardian relation is required'] },
  contact: { type: String, required: [true, 'Guardian contact is required'] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password cant be more then 20 char'],
  },
  name: {
    type: useNameSchema,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Gender is required'],
  },
  dob: { type: String },
  contact: { type: String, required: [true, 'Contact number is required'] },
  email: { type: String, required: [true, 'Email address is required'] },
  address: { type: String, required: [true, 'Address is required'] },
  localGuardian: {
    type: guardianSchema,
    required: [true, 'Local guardian is required'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood group is required'],
  },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    required: [true, 'Status is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  toJSON:{
    virtuals:true
  }
});

//virtual
studentSchema.virtual('fullName').get(function(){
  return `${this.name.fName} ${this.name.lName}`
})

//pre save middleware/hook : will work on create function/method
studentSchema.pre('save', async function (next) {
  // console.log(this,'pre hook: save data')
  const user = this; //document
  // hashing password and save in db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});
//post save middleware/hook
studentSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook: after save data');
  doc.password = '';
  next();
});

//query middle ware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExist = async function(id:string){
//   const existingUser = await Student.findOne({id})
//   return existingUser
// }
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
