import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect immediately to attendance page
    navigate("/attendance");
  }, [navigate]);

  return <p>Redirecting to attendance page...</p>;
}

export default Landing;
