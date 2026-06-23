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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Edit Post</h1>

        {error && <p>{error}</p>}

        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {submitting ? "Updating..." : "Update post"}
        </button>

        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPost;