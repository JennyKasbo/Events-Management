import React, { useEffect } from 'react';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './Context/Authcontext';
import { ThemeLocaleProvider } from './Context/ThemeLocaleContext';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Error from './Pages/Error/Error';
import Events from './Pages/Events/Events';
import CreateEvent from './Pages/Events/CreateEvent';
import Logs from './Pages/Logs/Logs';
import Layout from './Layout/Layout/Layout';
import Loading from './Components/Loading/Loading';
import ProtectedRoute from './Components/ProtectedRoute';

const App: React.FC = () => {
  const { loading } = useAuth(); 
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeLocaleProvider>
      <Routes>
        <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/events" replace />} />
        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="logs" element={<Logs />} />
      </Route>

      <Route path="*" element={<Navigate to="/error" replace />} />      
      </Routes>
    </ThemeLocaleProvider>
  );
};

export default App;
