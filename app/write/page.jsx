"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreateBlog({ user }) {
  const [blog, setBlog] = useState({
    category: "Travel", // Default category
    title: "",
    desc: "",
  });

  const { data: session, status } = useSession(); // Get session data

  // Fetch user name from session or fallback to "User"
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image || ""; // Placeholder for user image, can be updated later

  // Handles input changes for title and description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Handles blog creation
  const handleCreateBlog = async () => {
    if (!blog.title || !blog.desc) {
      alert("Please fill in all required fields!");
      return;
    }

    // Automatically set current date and time
    const createdAt = new Date().toISOString();

    // Prepare the API payload with all required data
    const payload = {
      title: blog.title, // Include the title from blog state
      description: blog.desc, // Include the description from blog state
      category: blog.category, // Include the selected category
      created_at: new Date().toISOString().slice(0, 19), // Add current UTC time in ISO format
      user_name: userName, // Use the full user name from session
      user_email: userEmail, // Use the email from session
      user_image: "", // Use the image from session (can be empty if not available)
      img: "", // Placeholder for blog image URL (empty for now, can be updated later)
    };

    try {
      console.log(payload);
      const response = await fetch("http://localhost:8000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Blog "${result.title}" created successfully!`);
        setBlog({ category: "Travel", title: "", desc: "" }); // Reset form
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail}`);
      }
    } catch (error) {
      console.error("Failed to create blog:", error);
      alert("An error occurred while creating the blog.");
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col items-center p-6 text-white">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Create a Blog
        </h1>

        <form className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Category
            </label>
            <select
              name="category"
              value={blog.category}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black dark:text-white bg-gray-700 dark:bg-gray-600"
            >
              <option value="Travel">Travel</option>
              <option value="Culture">Culture</option>
              <option value="Coding">Coding</option>
              <option value="Style">Style</option>
              <option value="Food">Food</option>
              <option value="Fashion">Fashion</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:text-white bg-gray-700 dark:bg-gray-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="desc"
              value={blog.desc}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:text-white bg-gray-700 dark:bg-gray-600 h-32"
            />
          </div>

          {/* Create Blog Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCreateBlog}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-200"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
