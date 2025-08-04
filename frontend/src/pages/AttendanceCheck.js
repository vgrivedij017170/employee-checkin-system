import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosConfig';
import CameraCapture from '../components/CameraCapture';
import Clock from '../components/Clock';

const AttendanceCheck = () => {
  const { user } = useContext(AuthContext);
  const [lastAttendance, setLastAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Checkbox_icon.svg';

  useEffect(() => {
    fetchLastAttendance();
  }, []);

  const fetchLastAttendance = async () => {
    try {
      const res = await axiosInstance.get('/attendance/myattendances');
      setLastAttendance(res.data[0] || null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckIn = async (photo) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axiosInstance.post('/attendance/checkin', { photo });
      setMessage('Check-in recorded successfully');      setLastAttendance(res.data.attendance);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Check-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async (photo) => {
    if (!lastAttendance?._id) {
      setMessage('Please check-in first');
      return;
    }
    if (lastAttendance.checkOutTime) {
      setMessage('Already checked out');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await axiosInstance.post(`/attendance/checkout/${lastAttendance._id}`, { photo });
      setMessage('Check-out recorded successfully');
      setLastAttendance(res.data.attendance);
    } catch (error) {      setMessage(error.response?.data?.message || 'Check-out failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center', paddingBottom: '50px' }}> {/* Added paddingBottom */}
      <img src={logoUrl} alt="Logo" style={{ width: 80 }} />
      <h1>Employee Check-in/Check-out System</h1>
      <Clock />
      <CameraCapture
        onCapture={(imgData) => {
          if (!lastAttendance || lastAttendance.checkOutTime) {
            handleCheckIn(imgData);
          } else {
            handleCheckOut(imgData);
          }
        }}
      />
      {loading && <p>Processing...</p>}
      {message && <p>{message}</p>}
      {lastAttendance && (
        <div style={{ marginTop: 20, textAlign: 'left', border: '1px solid #ccc', padding: 10 }}>
          <h3>Last Attendance Record</h3>
          <p><strong>Check-in Time:</strong> {new Date(lastAttendance.checkInTime).toLocaleString()}</p>
          <img src={lastAttendance.checkInPhoto} alt="Check In" style={{ width: 100, borderRadius: 10 }} />
          <p><strong>Check-out Time:</strong> {lastAttendance.checkOutTime ? new Date(lastAttendance.checkOutTime).toLocaleString() : 'Not checked out yet'}</p>
          {lastAttendance.checkOutPhoto && <img src={lastAttendance.checkOutPhoto} alt="Check Out" style={{ width: 100, borderRadius: 10 }} />}
        </div>
      )}

      {/* Developer Credit */}
      <p style={{ marginTop: '50px', fontSize: '0.8em', color: '#666' }}>
        Developed by <a href="https://linktr.ee/gourav017" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>Gourav Trivedi</a>
      </p>
    </div>
  );
};

export default AttendanceCheck;