import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRGenerator from "./pages/QRGenerator";
import Attendance from "./pages/Attendance";
import AttendanceList from "./pages/AttendanceList"; // ✅ rename correctly

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRGenerator />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance-list" element={<AttendanceList />} /> {/* ✅ added */}
      </Routes>
    </Router>
  );
}

export default App;
