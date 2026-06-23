import React, { useState } from "react";
import { createPost } from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "", author: "" });
  const [error, setError] = useState(null);
  const [Submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.title.trim() || !post.content.trim() || !post.author.trim()) {
      setError("All file are required");
      return;
    }
    try {
      setSubmitting(true);
      await createPost(post);
      navigate("/");
    } catch {
      setError("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Create New Post</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter your title"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Content</label>
          <textarea
            name="content"
            placeholder="Enter your content"
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Author */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Author</label>
          <input
            type="text"
            name="author"
            placeholder="Enter your name"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {Submitting ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
