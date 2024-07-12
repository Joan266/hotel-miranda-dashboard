import { Routes, Route } from 'react-router-dom';
import { DashBoard } from './components/DashBoard';
import { Bookings } from './components/Bookings';
import { BookingDetails } from './components/BookingDetails';
import { Reviews } from './components/Reviews';
import { Rooms } from './components/Rooms';
import { Employees } from './components/Employees';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme';
import { EditTableElement } from './components/EditTableElement';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fontFamily};
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  #root {
    width: 100%;
    height: 100vh;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute><Layout/></PrivateRoute>}>
            <Route index element={<DashBoard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<BookingDetails />} />
            <Route path="bookings/:id/edit" element={<EditTableElement />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="employees" element={<Employees />} />
          </Route>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}