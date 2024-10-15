import { Routes, Route } from 'react-router-dom';
import { DashBoard } from './pages/DashBoard';
import { Bookings } from './pages/bookings/Bookings';
import { BookingForm } from './pages/bookings/BookingsForm';
import { BookingView } from './pages/bookings/BookingsView';
import { Reviews } from './pages/reviews/Reviews';
import { Rooms } from './pages/rooms/Rooms';
import { RoomForm } from './pages/rooms/RoomsForm';
import { RoomsView } from './pages/rooms/RoomsView';
import { Users } from './pages/users/Users';
import { UserForm } from './pages/users/UsersForm';
import { UsersView } from './pages/users/UsersView';
import { Login } from './pages/Login';
import { Layout } from './pages/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from 'styled-components';
import './App.css'
import { theme } from './styles/theme';
import React from 'react';


export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PrivateRoute><Layout/></PrivateRoute>}>
            <Route index element={<DashBoard />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id/update" element={<BookingForm />} />
            <Route path="bookings/create" element={<BookingForm />} />
            <Route path="bookings/:id" element={<BookingView />} />
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