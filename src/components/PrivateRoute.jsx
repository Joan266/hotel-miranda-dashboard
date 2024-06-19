import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, auth, ...rest }) {
  return auth ? <Component {...rest} /> : <Navigate to="/login" />;
}

export default PrivateRoute;
