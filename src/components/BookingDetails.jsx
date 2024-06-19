import { useParams } from 'react-router-dom';
export const BookingDetails = () => {
  const { id } = useParams();
  return(
    <h1>Booking Details id: {id}</h1>
  )
}