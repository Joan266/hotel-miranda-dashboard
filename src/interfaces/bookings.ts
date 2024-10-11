export interface BookingInterface {
  _id: string;  
  firstname: string;
  lastname: string;       
  orderdate: Date;
  checkin: Date,
  checkout: Date,                    
  photourl?: string;                   
  description?: string;                   
  status: 'cancelled' | 'booked' | 'pending' | 'refund'; 
}
export interface BookingFormInterface {
  firstname: string;
  lastname: string;       
  orderdate: Date;
  checkin: Date,
  checkout: Date,                    
  photourl?: string;                   
  description?: string;                   
  status: 'cancelled' | 'booked' | 'pending' | 'refund'; 
}

export interface BookingState {
  items: BookingInterface[];
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | null;
}

export interface StatusButtonProps {
  $status: string;
}

