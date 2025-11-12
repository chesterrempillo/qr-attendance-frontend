import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRGenerator from "./pages/QRGenerator";
import Attendance from "./pages/Attendance";
import AttendanceList from "./pages/AttendanceList";
import Landing from "./pages/Landing"; // ✅ new landing page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />  {/* QR scans go here */}
        <Route path="/qr" element={<QRGenerator />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
      </Routes>
    </Router>
  );
}

export default App;
