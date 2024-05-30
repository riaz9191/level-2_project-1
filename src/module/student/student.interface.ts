// import { Schema, model, connect } from 'mongoose';
export type UserName = {
  fName: string;
  lName: string;
};
export type Guardian = {
  name: string;
  relation: string;
  contact: string;
};
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dob?: string;
  contact: string;
  email: string;
  address: string;
  localGuardian: Guardian;
  bloodGroup: BloodGroup;
  isActive: 'active' | 'inactive';
};
