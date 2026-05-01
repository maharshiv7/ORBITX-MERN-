import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav id="top-navbar" style={{ opacity: 1, pointerEvents: 'auto' }}>
            <Link to="/" className="nav-logo">OrbitX</Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/iss" className="nav-live">
                    <span className="pulsing-dot"></span> Live Tracker
                </Link>
                <Link to="/universe" style={{ color: '#ffdd00' }}>
                    <i className="fas fa-star"></i> My Universe
                </Link>            
                <button id="nav-auth-btn" className="auth-btn">
                    🔑 Login / Sign Up
                </button>
            </div>
        </nav>
    );
}

export default Navbar;