export interface StatusButtonProps {
  $status: string;
}

export interface Booking {
  id: number;
  first_name: string;
  last_name: string;
  img: string | null;
  order_date: { date: string; time: string };
  check_in: { date: string; time: string };
  check_out: { date: string; time: string };
  room_type: string;
  status: string;
}
export interface BookingState {
  items: Booking[];
  status: string;
  error: string | null;
}