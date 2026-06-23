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
    <div>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>{post.author}</p>

            <div>
              <Link to={`/edit/${post.id}`}>Edit</Link>
              <button
                onClick={() => {
                  handleDelete(post.id);
                }}
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
