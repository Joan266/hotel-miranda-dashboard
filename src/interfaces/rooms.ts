
interface Room {
  id: number;
  room_type: string;
  bed_type: string;
  floor_room: number;
  facilities: string[];
  rate: number;
  status: string;
}

interface RoomState {
  items: Room[];
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface Column<T> {
  label: string;
  display: (item: T) => React.ReactNode;
  sort?: string;
}

interface Status {
  label: string;
  value: string;
}

