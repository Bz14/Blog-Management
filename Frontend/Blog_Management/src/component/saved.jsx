import React from "react";

const Saved = () => {
  // Example saved blogs data
  const savedBlogs = [
    {
      id: 1,
      title: "The Power of Nature",
      description:
        "Nature has an amazing ability to inspire, heal, and rejuvenate. Whether you're hiking in the mountains or sitting by a tranquil lake, nature offers endless possibilities for peace and connection.",
      img: "https://images.unsplash.com/photo-1619170767860-92636d3401d1",
    },
    {
      id: 2,
      title: "Technology and the Future",
      description:
        "As technology continues to evolve at an unprecedented pace, it's important to reflect on its potential impact on our lives, work, and society.",
      img: "https://images.unsplash.com/photo-1622838320000-4b3b3b3b3b3b",
    },
    {
      id: 3,
      title: "The Art of Writing",
      description:
        "Writing is an art form that allows individuals to express ideas, emotions, and stories in powerful ways. It can connect people across cultures and generations.",
      img: "https://images.unsplash.com/photo-1600285393273-0b78d3de687d",
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Saved Blogs</h2>
      <p className="text-gray-600 mb-4">
        Here are the blogs you have saved. You can revisit them anytime.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedBlogs.map((blog) => (
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
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition">
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
