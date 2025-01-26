import { useEffect, useState } from "react";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/auth/comments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(response.data.comments);
        setNotification(response.data.comments);
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
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Notifications
      </h2>
      <p className="text-gray-600 mb-4">
        You will see your latest notifications here, such as comments or new
        followers.
      </p>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center p-4 rounded-lg shadow-md ${
              notification.type === "comment"
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "bg-green-50 border-l-4 border-green-500"
            }`}
          >
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 ${
                  notification.type === "comment"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {notification.type === "comment" ? (
                  <path d="M21 15c0 1.933-1.567 3.5-3.5 3.5H5.5C3.567 18.5 2 16.933 2 15V4c0-1.933 1.567-3.5 3.5-3.5h12c1.933 0 3.5 1.567 3.5 3.5v11z" />
                ) : (
                  <path d="M12 8c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zM12 12c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
                )}
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-800 font-semibold">
                {notification.message}
              </p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
