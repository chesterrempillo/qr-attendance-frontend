import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QRGenerator.css";

function QRGenerator() {
  const [qrImage, setQrImage] = useState("");
  const [status, setStatus] = useState("Fetching today's QR...");
  const navigate = useNavigate();

  // ✅ Auto-detect backend URL (local or Render)
  const backendUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://qr-attendance-backend.onrender.com";

  useEffect(() => {
    const fetchQR = async () => {
      try {
        const res = await fetch(`${backendUrl}/generate_daily_qr`);
        if (!res.ok) {
          const text = await res.text();
          console.error("Failed response:", text);
          setStatus("❌ Failed to fetch QR. Please check backend or CORS.");
          return;
        }

        const data = await res.json();
        setQrImage(data.qr_image);
        setStatus("✅ Scan this QR to log your attendance!");
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("⚠️ Cannot connect to backend. Make sure it's running.");
      }
    };
    fetchQR();
  }, [backendUrl]);

  return (
    <div className="qr-generator-container">
      <h1 className="qr-title">🎓 Daily Attendance QR</h1>
      <p className="qr-status">{status}</p>

      {qrImage && (
        <img
          src={qrImage}
          alt="Daily QR Code"
          className="qr-image"
        />
      )}

      <div className="qr-button-group">
        <button
          className="qr-btn qr-btn-primary"
          onClick={() => navigate("/attendance")}
        >
          🧍 Go to Attendance Input
        </button>

        <button
          className="qr-btn qr-btn-secondary"
          onClick={() => navigate("/attendance-list")}
        >
          📋 View Attendance List
        </button>
      </div>

      <p className="qr-tip">
        📱 Tip: Scan this QR using your phone camera or QR app to open the attendance form.
      </p>
    </div>
  );
}

export default QRGenerator;
