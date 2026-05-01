import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Jab bhi koi "/" par jayega, Home component load hoga */}
        <Route path="/" element={<Home />} />
        
        {/* Baaki pages hum baad mein add karenge */}
        {/* <Route path="/neo" element={<NeoRadar />} /> */}
      </Routes>
    </Router>
  );
}

export default App;