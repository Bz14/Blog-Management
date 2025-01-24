import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// Validation Schema for Login Form
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const URL = "http://localhost:5000/api/v1/auth/login";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(URL, data);
      console.log("Login successful:", response.data);
      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      navigate("/blogs");
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data?.message || error.message
      );
    }

    // navigate("/blogs");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-800 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
