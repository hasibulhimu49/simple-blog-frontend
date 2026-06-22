import axios from "axios";

const API="http://localhost:8080/api/v1/posts/api/v1/posts";

const createPost=(data)=>{
    axios.post(API,data);
}

const getPostById=(id)=>{
    axios.get(`${API}/${id}`);
}

const getAllPost=()=>{
    axios.get(API);
}

const updatePost=(id,data)=>{
    axios.put(`${API}/${id}`,data)
}

const deletePost=(id)=>{
    axios.delete(`${API}/${id}`);
}