export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: boolean;
  phonenumber: string;
  joindate: Date;
  days?: string;
  token?: string;
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


interface Column<T> {
  label: string;
  display: (item: T) => React.ReactNode;
  sort?: string;
}

interface Status {
  label: string;
  value: boolean | string;
}