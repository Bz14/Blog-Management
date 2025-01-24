import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    bio: "A passionate writer who loves to share thoughts and stories with the world. Enjoys reading, traveling, and photography.",
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save the changes (you can integrate API call to save the updated profile)
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        User Profile
      </h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        ) : (
          <p className="text-gray-600">{profileData.name}</p>
        )}
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Bio</label>
        {isEditing ? (
          <textarea
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        ) : (
          <p className="text-gray-600">{profileData.bio}</p>
        )}
      </div>

      {/* Edit and Save Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleEditClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
        {isEditing && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-400"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
