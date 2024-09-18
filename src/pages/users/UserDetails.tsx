import { useParams } from 'react-router-dom';

interface Params {
  id: string;
}

export const UserDetails: React.FC = () => {
  const { id } = useParams<Params>();

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {id}</p>
    </div>
  );
};
