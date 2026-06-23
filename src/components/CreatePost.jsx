import React, { useState } from "react";
import { createPost } from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate=useNavigate();

  const [post, setPost] = useState({title:"",content:"",author:""});
  const [error, setError] = useState(null);
  const [Submitting, setSubmitting] = useState(false);


  const handleChange=(e)=>{

    setPost({...post,[e.target.name]:e.target.value})
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(!post.title.trim() || !post.content.trim() || !post.author.trim()){
      setError("All file are required");
      return;
    }
    try{
      setSubmitting(true)
      await createPost(post);
       navigate("/");
    }catch{
      setError("Failed to create post");
    }finally{
      setSubmitting(false);
    }
  }



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create new Post</h1>
        {error && (<p>{error}</p>)}
        <div>
          <label>Title</label>
          <input type="text" placeholder="Enter Your title" name="title" onChange={handleChange}/>
        </div>

        <div>
          <label>TItle</label>
          <textarea placeholder="Enter your content" name="content" onChange={handleChange}/>
        </div>

        <div>
          <label>TItle</label>
          <input type="text" placeholder="Enter your name" name="author" onChange={handleChange}/>
        </div>

        <button type="submit">
          {Submitting ? "Publishing": "Publish post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
