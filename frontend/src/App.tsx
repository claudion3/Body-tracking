import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProgressForm from './components/ProgressForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress" element={<ProgressForm />} />
      </Routes>
    </Router>
  );
};

export default App;