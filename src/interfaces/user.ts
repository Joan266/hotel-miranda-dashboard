export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: boolean;
  phonenumber: string;
  joindate: Date;
  days?: string;
  hours?: string;
  jobdesk?: string;
}
export interface CreateUser {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  joindate: Date;
  status?: boolean;
  days?: string;
  hours?: string;
  jobdesk?: string;
}
