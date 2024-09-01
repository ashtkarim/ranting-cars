import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
