import axios from "axios";

const API="http://localhost:8080/api/v1/posts";

export const createPost=(data)=>{
    axios.post(API,data);
}

export const getPostById=(id)=>{
    axios.get(`${API}/${id}`);
}

export const getAllPost=()=>{
   return axios.get(API);
}

export const updatePost=(id,data)=>{
    axios.put(`${API}/${id}`,data)
}

export const deletePost=(id)=>{
    axios.delete(`${API}/${id}`);
}