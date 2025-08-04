import React, { useState, useContext } from 'react';
import axiosInstance from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      login(res.data.token);
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/attendance');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', paddingBottom: '50px' }}> {/* Added paddingBottom */}
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Password:</label><br />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button style={{ marginTop: 15 }} type="submit">Login</button>
      </form>
      <p style={{ marginTop: 10 }}>
        New user? <Link to="/register">Register here</Link>
      </p>

      {/* Developer Credit */}
      <p style={{ marginTop: '50px', fontSize: '0.8em', color: '#666' }}>
        Developed by <a href="https://linktr.ee/gourav017" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>Gourav Trivedi</a>
      </p>
    </div>
  );
};

export default Login;