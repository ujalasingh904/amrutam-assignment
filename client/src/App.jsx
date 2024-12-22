import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import CreateRoutine from './pages/CreateRoutine';
import EditRoutine from './pages/EditRoutine';
import ConsumerDashboard from './pages/ConsumerDashboard';
import RoutineDetails from './pages/RoutineDetails';
import AdminAuth from './components/AdminAuth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <AdminAuth onAuthenticate={setIsAuthenticated} />;
    }
    return children;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AnimatePresence >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/create-routine"
                element={
                  <ProtectedRoute>
                    <CreateRoutine />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/edit-routine/:id"
                element={
                  <ProtectedRoute>
                    <EditRoutine />
                  </ProtectedRoute>
                }
              />
              <Route path="/dashboard" element={<ConsumerDashboard />} />
              <Route path="/routine/:id" element={<RoutineDetails />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

