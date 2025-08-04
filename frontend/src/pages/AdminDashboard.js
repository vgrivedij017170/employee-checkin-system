import React, { useEffect, useState } from 'react';import axiosInstance from '../api/axiosConfig';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const usersRes = await axiosInstance.get('/users');
        setEmployees(usersRes.data);

        const attendanceRes = await axiosInstance.get('/attendance/all');
        setAttendance(attendanceRes.data);
      } catch {
        alert('Failed to load admin data');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', paddingBottom: '50px' }}> {/* Added paddingBottom */}
      <h2>Admin Dashboard</h2>

      <h3>Employees</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 40 }}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.photo ? <img src={emp.photo} alt={emp.name} style={{ width: 60, borderRadius: '50%' }} /> : '-'}</td>
              <td>{emp.name}</td>              <td>{new Date(emp.dob).toLocaleDateString()}</td>
              <td>{emp.mobile}</td>
              <td>{emp.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Attendance Records</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Check-in Time</th>
            <th>Check-in Photo</th>
            <th>Check-out Time</th>
            <th>Check-out Photo</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record._id}>
              <td>{record.user.name}</td>
              <td>{new Date(record.checkInTime).toLocaleString()}</td>
              <td><img src={record.checkInPhoto} alt="In" style={{ width: 80, borderRadius: 5 }} /></td>
              <td>{record.checkOutTime ? new Date(record.checkOutTime).toLocaleString() : 'Not checked out'}</td>
              <td>{record.checkOutPhoto ? <img src={record.checkOutPhoto} alt="Out" style={{ width: 80, borderRadius: 5 }} /> : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Developer Credit */}
      <p style={{ marginTop: '50px', fontSize: '0.8em', color: '#666' }}>
        Developed by <a href="https://linktr.ee/gourav017" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'none' }}>Gourav Trivedi</a>      </p>
    </div>
  );
};

export default AdminDashboard;