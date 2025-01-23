import React from "react";

const MyBlogs = () => {
  // Example of user's published blogs data
  const myBlogs = [
    {
      id: 1,
      title: "Exploring the Mountains",
      description:
        "Mountains offer an incredible sense of adventure and tranquility. This blog explores the beauty and challenges of mountain climbing, offering tips for beginners.",
      img: "https://images.unsplash.com/photo-1574261002370-2132d7f1c3b1",
    },
    {
      id: 2,
      title: "The Future of Artificial Intelligence",
      description:
        "Artificial intelligence is rapidly transforming industries. In this blog, we dive deep into the future implications of AI on various sectors.",
      img: "https://images.unsplash.com/photo-1561948955-dabcc3c5f38b",
    },
    {
      id: 3,
      title: "Mindfulness and Mental Health",
      description:
        "Mindfulness is more than just a trend—it's a lifestyle that can have profound benefits on mental health. This blog explores mindfulness practices and their impacts.",
      img: "https://images.unsplash.com/photo-1529331721167-b2078bb0e145",
    },
  ];

  const handleEdit = (id) => {
    // Logic to handle blog edit (e.g., navigate to edit page)
    alert(`Edit blog with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Logic to handle blog deletion (e.g., API call to delete blog)
    alert(`Delete blog with ID: ${id}`);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Blogs</h2>
      <p className="text-gray-600 mb-4">
        Here are your published blogs. You can edit or delete them.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
