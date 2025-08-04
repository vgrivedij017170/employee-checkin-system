import React, { useState, useContext } from 'react';
import axiosInstance from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobile: '',
    email: '',
    password: '',    photo: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert('Photo size must be less than 1MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axiosInstance.post('/auth/register', formData);
      login(res.data.token);
      navigate('/attendance');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', paddingBottom: '50px' }}> {/* Added paddingBottom */}
      <h2>Register as Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label><br />
          <input required type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Date of Birth:</label><br />
          <input required type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <div>
          <label>Mobile Number:</label><br />
          <input required type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label><br />
          <input required type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label><br />
          <input required type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Profile Photo (optional):</label><br />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          {formData.photo && <img src={formData.photo} alt="Profile" style={{ width: 100, marginTop: 10, borderRadius: '50%' }} />}
        </div>
        <button style={{ marginTop: 15 }} type="submit">Register</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Already registered? <Link to="/login">Login here</Link>
      </p>

      {/* Developer Credit */}
      <p style={{ marginTop: '50px', fontSize: '0.8em', color: '#666' }}>
        Developed by <a href="https://linktr.ee/gourav017" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>Gourav Trivedi</a>
      </p>
    </div>
  );
};

export default Register;