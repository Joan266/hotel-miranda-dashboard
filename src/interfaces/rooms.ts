export interface RoomInterface {
  _id: string;  
  name: string;                 
  bedtype: string;                 
  code: string;                   
  facilities?: string[];          
  rate: number;                   
  offer: number;                   
  photourl?: string;                   
  status: 'available' | 'booked' | 'maintenance' | 'unavailable'; 
}
export interface RoomFormInterface {
  name: string;                 
  bedtype: string;                 
  code: string;                   
  facilities?: string[];          
  rate: number;                   
  offer: number;                   
  photourl?: string;                   
  status: 'available' | 'booked' | 'maintenance' | 'unavailable'; 
}

export interface RoomState {
  items: RoomInterface[];
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | null;
}
