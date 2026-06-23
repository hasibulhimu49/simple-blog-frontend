import React, { useEffect, useState } from "react";
import { getPostById, updatePost } from "../services/apiClient";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState({ title: "", content: "", author: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        const response = await getPostById(id);
        setPost(response.data);
      } catch {
        setError("Failed to load");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await updatePost(id, post);
      navigate("/");
    } catch {
      setError("Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Post</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {submitting ? "Updating..." : "Update Post"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
