import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import { AuthContext } from '../context/AuthContext';

const EmployeeProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchAttendance();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get('/auth/me');
      setProfile(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axiosInstance.get('/attendance/myattendances');
      setAttendanceList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', paddingBottom: '50px' }}> {/* Added paddingBottom */}
      <h2>My Profile</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {profile.photo && (
          <img src={profile.photo} alt="Profile" style={{ width: 120, borderRadius: '50%', marginRight: 20 }} />
        )}
        <div>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
          <p><strong>Mobile:</strong> {profile.mobile}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      </div>
      <h3 style={{ marginTop: 30 }}>Attendance History</h3>
      {attendanceList.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Check-in Time</th>
              <th>Check-in Photo</th>
              <th>Check-out Time</th>
              <th>Check-out Photo</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.checkInTime).toLocaleString()}</td>
                <td><img src={record.checkInPhoto} alt="In" style={{ width: 80, borderRadius: 5 }} /></td>
                <td>{record.checkOutTime ? new Date(record.checkOutTime).toLocaleString() : 'Not checked out'}</td>
                <td>{record.checkOutPhoto ? <img src={record.checkOutPhoto} alt="Out" style={{ width: 80, borderRadius: 5 }} /> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}      {/* Developer Credit */}
      <p style={{ marginTop: '50px', fontSize: '0.8em', color: '#666' }}>
        Developed by <a href="https://linktr.ee/gourav017" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>Gourav Trivedi</a>
      </p>    </div>
  );
};

export default EmployeeProfile;