import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OTPVerificationPage = () => {
  const URL = "http://localhost:5000/api/v1/auth/verify";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setError("OTP must be 4 digits.");
      return;
    }
    try {
      const response = await axios.post(URL, { otp: otp });
      console.log("Verification successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data?.message || error.message
      );
    }
    // navigate("/login");
    // console.log("OTP submitted:", otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Enter 4-digit OTP</label>
            <input
              type="text"
              value={otp}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:ring-2 ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Enter OTP"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Verify
          </button>
          <p className="text-center mt-4">
            Didn’t receive the code?{" "}
            <Link to="/resend-otp" className="text-blue-800 hover:underline">
              Resend OTP
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
