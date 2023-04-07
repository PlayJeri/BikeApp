import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StationListPage from './pages/StationListPage';
import StationPage from './pages/StationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stations" element={<StationListPage />} />
        <Route path="/station/:id" element={<StationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
