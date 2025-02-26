import React, { useEffect, useState } from "react";
import img from "../assets/img.jpg";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const URL = `http://localhost:5000/api/v1/blogs/${id}`;
  const navigate = useNavigate();
  const bl = {
    id: 1,
    title: "The Beauty of Nature",
    description:
      "Nature is a beautiful and intricate tapestry of life that surrounds us. From majestic mountains to tranquil lakes, nature has a way of inspiring awe and wonder in our hearts. It's important to take time to appreciate and connect with the environment around us.",
    author: "John Doe",
    img: img,
  };

  const [blog, setBlog] = useState(bl);

  //   useEffect(() => {
  //     const fetchBlogDetails = async () => {
  //       try {
  //         const response = await axios.get(URL);
  //         setBlog(response.data.blog);
  //       } catch (error) {
  //         console.error(
  //           "Error fetching blog details:",
  //           error.response?.data?.message || error.message
  //         );
  //       }
  //     };

  //     fetchBlogDetails();
  //   }, [id]);

  const handleSave = () => {
    // Logic for saving the blog (e.g., to favorites, API call, etc.)
    alert("Blog saved!");
  };

  const handleFollow = () => {
    // Logic for following the author (e.g., API call, updating UI state)
    alert(`You followed ${blog.author}!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
          {/* Image Section */}
          <div className="relative">
            <img
              src={blog.img}
              alt="Blog"
              className="w-full h-64 object-cover rounded-t-lg"
            />
          </div>

          {/* Blog Content */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{blog.description}</p>

            {/* Author and Buttons */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">By</p>
                <p className="font-semibold text-lg text-gray-700">
                  {blog.author}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
                <button
                  onClick={handleFollow}
                  className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
