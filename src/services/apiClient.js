import axios from "axios";

const API="http://localhost:8080/api/v1/posts";

export const createPost=(data)=>{
   return axios.post(API,data);
}

export const getPostById=(id)=>{
   return axios.get(`${API}/${id}`);
}

export const getAllPost=()=>{
   return axios.get(API);
}

export const updatePost = (id, data) => {
    return axios.put(`${API}/${id}`, data);
};

export const deletePost=(id)=>{
   return axios.delete(`${API}/${id}`);
}