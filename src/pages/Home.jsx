import React from 'react'
import ListPost from '../components/ListPost'
import { Link } from 'react-router-dom'

const Home=()=>{
  return (
    <div>
        <h1>This is Home Page</h1>
        <Link to="/create">Create Post</Link>
        <ListPost/>
    </div>
  )
}

export default Home