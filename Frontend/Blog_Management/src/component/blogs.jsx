import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/img.jpg";

const allBlogs = [
  {
    id: 1,
    img: img,
    title: "Exploring the Wilderness",
  },
  {
    id: 2,
    img: img,
    title: "The Beauty of Nature",
  },
];

const Blogs = () => {
  const URL = "http://localhost:5000/api/v1/blogs";
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(allBlogs);
  useEffect(() => {
    // try {
    //   const response = await axios.get(URL);
    //   const { blogs } = response.data;
    //   setBlogs(blogs);
    // } catch (error) {
    //   console.error(
    //     "Error during fetching",
    //     error.response?.data?.message || error.message
    //   );
    // }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-gray-800">WriteWay</h1>
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate("/create")}
          >
            Create Post
          </button>
          <button
            className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold"
            onClick={() => navigate("/dashboard")}
          >
            U
          </button>
        </div>
      </nav>

      {/* Blog List */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  This is a short description of the blog. Click to read more.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
