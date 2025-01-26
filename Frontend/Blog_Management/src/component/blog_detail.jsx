import React, { useEffect, useState } from "react";
import img from "../assets/img.jpg";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const URL = `http://localhost:4002/api/v1/blogs/${id}`;
  const navigate = useNavigate();

  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setBlog(response.data.message);
      } catch (error) {
        console.error(
          "Error fetching blog details:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchBlogDetails();
  }, [id]);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (!blog.authorId) return;
      try {
        const response = await axios.get(
          `http://localhost:4001/api/v1/auth/author/${blog.authorId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setBlog({ ...blog, author: response.data.author.name });
      } catch (error) {
        console.error(
          "Error fetching author details:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchAuthor();
  }, [blog.authorId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4002/api/v1/blogs/${id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error(
          "Error fetching comments:",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchComments();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.post(
        `http://localhost:4001/api/v1/auth/save/${blog.authorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("Blog saved");
    } catch (error) {
      console.error(
        "Error saving blog:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleFollow = () => {
    alert(`You followed ${blog.author}!`);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:4002/api/v1/blogs/${id}/comments`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setComments([...comments, response.data.comment]);
      setNewComment("");
    } catch (error) {
      console.error(
        "Error adding comment:",
        error.response?.data?.message || error.message
      );
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8 px-4">
        <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={img}
              alt="Blog"
              className="w-full h-64 object-cover rounded-t-lg"
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{blog.content}</p>
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">By</p>
                <p className="font-semibold text-lg text-gray-700">
                  {blog.author}
                </p>
              </div>
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
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>
              <div>
                {comments.map((comment, index) => (
                  <div key={index} className="border-b py-2">
                    <p className="text-gray-800">{comment.text}</p>
                    <p className="text-sm text-gray-500">
                      - {comment.author || "Anonymous"}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={handleAddComment}
                  className="mt-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Post Comment
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
