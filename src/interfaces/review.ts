export interface ReviewInterface {
  _id: string;  
  firstname: string;
  lastname: string;       
  reviewdate: Date;                
  comment?: string;                   
  rate: number;                   
  status: boolean; 
}
export interface ReviewFormInterface {
  firstname: string;
  lastname: string;       
  reviewdate: Date;                
  comment?: string;                   
  rate: number;                   
  status: boolean; 
}



