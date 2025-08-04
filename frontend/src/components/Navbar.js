import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: 10, backgroundColor: '#1976d2', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: 20 }}>
          Employee Check-in System
        </Link>
      </div>
      <div>
        {!user && (
          <>
            <Link to="/login" style={{ marginRight: 15, color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
        {user && user.role === 'employee' && (
          <>
            <Link to="/attendance" style={{ marginRight: 15, color: 'white', textDecoration: 'none' }}>Attendance</Link>
            <Link to="/profile" style={{ marginRight: 15, color: 'white', textDecoration: 'none' }}>Profile</Link>
            <button onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</button>
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <Link to="/admin" style={{ marginRight: 15, color: 'white', textDecoration: 'none' }}>Admin Dashboard</Link>
            <button onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;