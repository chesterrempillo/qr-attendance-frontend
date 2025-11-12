import React, { useEffect, useState } from "react";
import "./AttendanceList.css";

function AttendanceList() {
  const [attendance, setAttendance] = useState([]);
  const [status, setStatus] = useState("Fetching attendance records...");

  // Automatically choose backend URL based on environment
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000" // local backend
      : "https://qr-attendance-backend.onrender.com"; // deployed backend on Render

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        // ✅ Use correct backend route
        const res = await fetch(`${backendUrl}/attendance`);
        if (!res.ok) {
          const text = await res.text();
          console.error("Failed response:", text);
          setStatus("❌ Failed to fetch attendance.");
          return;
        }

        const data = await res.json();
        setAttendance(data.records || []);
        setStatus("");
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("⚠️ Cannot connect to backend.");
      }
    };

    fetchAttendance();
  }, [backendUrl]);

  return (
    <div className="attendance-list-container">
      <h2>📋 Attendance Records</h2>
      {status && <p>{status}</p>}
      {!status && attendance.length === 0 && <p>No records found.</p>}

      {attendance.length > 0 && (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Device</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{record.student_id}</td>
                <td>{record.name}</td>
                <td>{record.date}</td>
                <td>{record.time}</td>
                <td>{record.device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceList;
