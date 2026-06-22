import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditPost from "./components/EditPost";
import ListPost from "./components/ListPost";
import CreatePost from "./components/CreatePost";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/create" element={<CreatePost/>}></Route>
            <Route path="/edit:id" element={<EditPost/>}></Route>
            <Route path="/list" element={<ListPost/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
