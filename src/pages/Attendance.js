import React, { useState } from "react";
import "./Attendance.css";

function Attendance() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("");

  const backendUrl = "https://qr-attendance-backend.onrender.com"; // Render backend

  const recordAttendance = async () => {
    if (!studentId) {
      setStatus("⚠️ Enter Student ID");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/record_attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Device-ID": window.navigator.userAgent
        },
        body: JSON.stringify({ student_id: studentId })
      });
      const data = await res.json();
      if (res.ok) setStatus("✅ " + data.message);
      else setStatus("❌ " + (data.error || "Failed"));
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Cannot connect to backend");
    }
  };

  return (
    <div className="attendance-container">
      <h2>📌 Attendance Check-In</h2>
      <input type="text" placeholder="Enter Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} />
      <button onClick={recordAttendance}>Submit</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Attendance;
