import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./profile";
import Saved from "./saved";
import MyBlogs from "./my_blogs";
import Notification from "./notification";

const DashBoard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const navigate = useNavigate();

  const sections = {
    profile: "User Profile",
    saved: "Saved Blogs",
    myBlogs: "My Blogs",
    notifications: "Notifications",
  };

  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6 space-y-6">
        <button
          className="text-3xl font-bold text-gray-800 mb-6"
          onClick={() => navigate("/blogs")}
        >
          WriteWay
        </button>
        <div className="space-y-4">
          <button
            onClick={() => handleSidebarClick("profile")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-gray-200 ${
              activeSection === "profile" ? "bg-black text-white" : ""
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => handleSidebarClick("saved")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-gray-200 ${
              activeSection === "saved" ? "bg-black text-white" : ""
            }`}
          >
            Saved Blogs
          </button>
          <button
            onClick={() => handleSidebarClick("myBlogs")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-gray-200 ${
              activeSection === "myBlogs" ? "bg-black text-white" : ""
            }`}
          >
            My Blogs
          </button>
          <button
            onClick={() => handleSidebarClick("notifications")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all hover:bg-gray-200 ${
              activeSection === "notifications" ? "bg-black text-white" : ""
            }`}
          >
            Notifications
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Dynamic Content Based on Active Section */}
          {activeSection === "profile" && <Profile />}

          {activeSection === "saved" && <Saved />}

          {activeSection === "myBlogs" && <MyBlogs />}

          {activeSection === "notifications" && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
