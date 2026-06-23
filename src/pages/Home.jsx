import React from "react";
import ListPost from "../components/ListPost";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <div className="flex justify-between items-center bg-green-500 h-20 px-10">
        <h1 className="text-2xl font-bold text-white">
          DesiBlog
        </h1>

        <Link
          to="/create"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Create Post
        </Link>
      </div>

      {/* Content */}
      <div className="flex justify-center mt-6">
        <div className="w-full max-w-6xl">
          <ListPost />
        </div>
      </div>
      
    </div>
  );
};

export default Home;