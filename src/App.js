import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRGenerator from "./pages/QRGenerator";
import Attendance from "./pages/Attendance";
import AttendanceList from "./pages/AttendanceList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page: QR Generator */}
        <Route path="/" element={<QRGenerator />} />
        {/* Optional route if you want /qr explicitly */}
        <Route path="/qr" element={<QRGenerator />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/attendance-list" element={<AttendanceList />} />
        {/* Catch-all route to redirect unknown URLs to QRGenerator */}
        <Route path="*" element={<QRGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
