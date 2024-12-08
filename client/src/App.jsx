import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './routes/PrivateRoute';
import Cars from './pages/Cars';
import Agancies from './pages/Agancies';
import MyCars from './pages/mycars';
import AddCar from './pages/addcars';
import Profile from './pages/Profile';
import CarInfo from './pages/CarInfo';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car/:id" element={<CarInfo />} />
        <Route path="/agencies" element={<Agancies />} />

        <Route
          path="/mycars"
          element={
            <PrivateRoute>
              <MyCars />
            </PrivateRoute>
          }
        />
        <Route
          path="/addcar"
          element={
            <PrivateRoute>
              <AddCar />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
