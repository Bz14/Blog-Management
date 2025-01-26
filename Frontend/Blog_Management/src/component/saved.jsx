import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import img from "../assets/img.jpg"; // Placeholder image

const Saved = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/auth/saved",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error(
          "Error fetching blog details:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Saved Blogs
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Here are the blogs you have saved. Explore and revisit your favorites!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300 hover:scale-105"
          >
            {/* Blog Image */}
            <img
              src={img} // Placeholder image
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            {/* Blog Content */}
            <div className="p-4 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <button
                className="bg-black text-white text-sm py-2 px-4 rounded-lg hover:bg-gray-500 transition"
                onClick={() => navigate(`/blogs/${blog._id}`)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
