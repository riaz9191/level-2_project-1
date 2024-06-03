import { Model } from 'mongoose';

// import { Schema, model, connect } from 'mongoose';
export type TUserName = {
  fName: string;
  lName: string;
};
export type TGuardian = {
  name: string;
  relation: string;
  contact: string;
};
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TStudent = {
  id: string;
  password: string,
  name: TUserName;
  gender: 'male' | 'female';
  dob?: string;
  contact: string;
  email: string;
  address: string;
  localGuardian: TGuardian;
  bloodGroup: TBloodGroup;
  isActive: 'active' | 'inactive';
  isDeleted: boolean
};

//for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

//for creating instance
// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
