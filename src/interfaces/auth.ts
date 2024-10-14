export interface AuthInterface {
  token:string,
  user:{
  _id: string;               
  firstname: string;        
  lastname: string;         
  email: string;            
  status: boolean;          
  password: string;          
  phonenumber: string;      
  joindate: Date;   
  photoUrl?: string;
  token?: string;
  description?: string;        
  jobdesk?: string;     }   
}