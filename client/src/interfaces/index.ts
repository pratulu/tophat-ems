export interface IEmployees {
  _id: string;
  firstName: string;
  lastName: string;
  primaryContactNumber: string;
  secondaryContactNumber: string;
  primaryAddress: string;
  secondaryAddress: string;
  officialEmail: string;
  personalEmail: string;
  dateOfBirth: Date;
  designation: string;
  department: string;
  experience: string;
  dateOfJoining: Date;
  dateOfReleiving: Date;
  documents: string[];
  role: string;
  _updatedAt: Date;
  _createdAt: Date;
}
export interface ICandidates {
  _id: string;
  firstName: string;
  lastName: string;
  personalEmail: string;
  primaryContactNumber: string;
  currentLocation: string;
  baseLocation: string;
  readyToRelocate: boolean;
  noticePeriod: string;
  currentCTC: string;
  expectedCTC: string;
  communation: string[];
  technology: string;
  experience: string;
  hrInCharge: string;
  status: string[];
  _updatedAt: Date;
  _createdAt: Date;
}

export interface IUsers {
  _id: string;
  userId: string;
  password: string;
  role: string;
  _updatedAt: Date;
  _createdAt: Date;
}

export interface IRoute {
  key?: string;
  path?: string;
  Element: React.FC;
}

export interface IAttendance {
  _id?: string;
  employeeId: string;
  date: string;
  status: string;
  notes?: string;
}
