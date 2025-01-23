import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);

    try {
      // Make API call to submit blog data
      const response = await axios.post(
        "http://localhost:5000/api/v1/blogs",
        formData
      );
      console.log("Blog created successfully:", response.data);
      navigate("/blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
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
      <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4">
        <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Create a New Blog
          </h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Title Input */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-lg text-gray-700 font-semibold mb-2"
              >
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-lg text-gray-700 font-semibold mb-2"
              >
                Upload Image
              </label>
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Content Input */}
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-lg text-gray-700 font-semibold mb-2"
              >
                Blog Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog here..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-200"
              >
                Submit Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
