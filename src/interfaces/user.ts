export interface User {
  _id: string;               
  firstname: string;        
  lastname: string;         
  email: string;            
  status: boolean;          
  password: string;          
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
  password: string;      
  joindate: Date;
  status?: boolean;
  days?: string;
  photoUrl?: string;
  description?: string;
  hours?: string;
  jobdesk?: string;
}

