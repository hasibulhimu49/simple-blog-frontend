import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllPost, deletePost } from "../services/apiClient";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const showPost = async () => {
    try {
      setLoading(true);
      let response = await getAllPost();
      setPosts(response.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showPost();
  }, [location]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are You sure do u want to delete")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  if (loading) {
    return <p>Loading.................</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition"
          >
            <div>
              <h1 className="text-xl font-bold mb-2">{post.title}</h1>
              <p className="text-gray-600 mb-3">{post.content}</p>
              <p className="text-sm text-gray-500">Author: {post.author}</p>
            </div>

            <div className="flex gap-3 mt-4">
              <Link
                to={`/edit/${post.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListPost;
