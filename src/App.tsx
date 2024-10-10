import { Routes, Route } from 'react-router-dom';
import { DashBoard } from './pages/DashBoard';
import { Bookings } from './pages/bookings/Bookings';
import { BookingDetails } from './pages/bookings/BookingDetails';
import { Reviews } from './pages/reviews/Reviews';
import { Rooms } from './pages/rooms/Rooms';
import { RoomForm } from './pages/rooms/Rooms';
import { RoomsView } from './pages/rooms/Rooms';
import { Users } from './pages/users/Users';
import { UserForm } from './pages/users/UsersForm';
import { UsersView } from './pages/users/UsersView';
import { Login } from './pages/Login';
import { Layout } from './pages/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme';
import React from 'react';

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
            <Route path="reviews" element={<Reviews />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="rooms/:id/update" element={<RoomForm />} />
            <Route path="rooms/create" element={<RoomForm />} />
            <Route path="rooms/:id" element={<RoomsView />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id/update" element={<UserForm />} />
            <Route path="users/create" element={<UserForm />} />
            <Route path="users/:id" element={<UsersView />} />
          </Route>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}