import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("accessToken");
    navigate("/");
  }, [navigate]);
};

export default Logout;
