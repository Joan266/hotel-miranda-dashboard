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
  orderdate?: Date;
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

export type BookingStatus = 'refund' | 'booked' | 'cancelled' | 'pending';
export interface StatusButtonProps {
  $status: BookingStatus;
}

export const statusColors: Record<BookingStatus, string> = {
  refund: '#E23428',
  booked: '#5AD07A',
  cancelled: '#BEBEBE',
  pending: '#6D6D6D',
};

export const statusBackgroundColors: Record<BookingStatus, string> = {
  refund: '#FFEDEC',
  booked: '#E8FFEE',
  cancelled: '#575757',
  pending: '#E2E2E2',
};
export const getStatusColor = (status: BookingStatus) => statusColors[status];
export const getStatusBackgroundColor = (status: BookingStatus) => statusBackgroundColors[status];