export interface Room {
  id: number;
  room_type: string;
  bed_type: string;
  floor_room: number;
  facilities: string[];
  rate: number;
  status: string;
}

export interface RoomState {
  items: Room[];
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | null;
}
