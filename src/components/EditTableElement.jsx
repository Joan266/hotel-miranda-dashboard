import { useParams } from 'react-router-dom';
export const EditTableElement = ({properties, elementFunction}) => {
  const { id } = useParams();
  return(
    <h1>Booking Details id: {id}</h1>
  )
}