import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import for navigation
import "./QRGenerator.css";

function QRGenerator() {
  const [qrImage, setQrImage] = useState("");
  const [status, setStatus] = useState("Fetching today's QR...");
  const navigate = useNavigate();

  // ✅ Automatically detect backend (local vs deployed)
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
          setStatus("❌ Failed to fetch QR. Check backend URL and CORS.");
          return;
        }
        const data = await res.json();
        setQrImage(data.qr_image);
        setStatus("✅ Today's QR is ready! Scan it with your mobile.");
      } catch (err) {
        console.error("Fetch error:", err);
        setStatus("⚠️ Cannot connect to backend. Check if your backend is live and CORS is enabled.");
      }
    };
    fetchQR();
  }, [backendUrl]);

  return (
    <div className="generator-container">
      <h1>🎓 Daily Attendance QR</h1>
      <p>{status}</p>

      {qrImage && (
        <img
          src={qrImage}
          alt="Daily QR Code"
          style={{ maxWidth: "300px", marginTop: "10px" }}
        />
      )}

      {/* ✅ Add a button to view attendance list */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => navigate("/attendance-list")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📋 View Attendance List
        </button>
      </div>
    </div>
  );
}

export default QRGenerator;
