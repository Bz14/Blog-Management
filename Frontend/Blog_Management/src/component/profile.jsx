import React, { useState, useEffect } from "react";
import axios from "axios";
import img from "../assets/img.jpg";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    bio: "A passionate writer who loves to share thoughts and stories with the world. Enjoys reading, traveling, and photography.",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setProfileData(response.data.user);
      } catch (error) {
        console.error(
          "Error during fetching",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchUser();
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save the changes
    setIsEditing(false);
    alert("Profile saved!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md mt-10">
      <div className="flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 mb-4">
          <img
            src={img}
            alt="Profile"
            className="w-full h-full rounded-full border-4 border-gray-300 object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-black text-white text-xs font-bold py-1 px-2 rounded-full cursor-pointer">
              Edit
              <input
                type="file"
                className="hidden"
                onChange={() =>
                  alert("Update profile picture feature coming soon!")
                }
              />
            </label>
          )}
        </div>

        {/* Name */}
        <div className="w-full mb-6">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <h1 className="text-xl font-semibold text-gray-800">
              {profileData.name}
            </h1>
          )}
        </div>

        {/* Bio */}
        <div className="w-full">
          <label className="block text-gray-600 text-sm font-medium mb-1">
            Bio
          </label>
          {isEditing ? (
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="text-gray-700">{profileData.bio}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleEditClick}
            className="px-6 py-2 text-white bg-black rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="px-6 py-2 text-white  bg-gray-400 rounded-lg  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
