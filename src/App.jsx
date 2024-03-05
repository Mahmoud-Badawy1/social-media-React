import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AddPostForm } from './AddPostForm';
import { PostsList } from './PostsList';
import { PostDetails } from './PostDetails';
import { EditPostForm } from './EditPostForm';
import { useSelector } from 'react-redux';

function App() { 
  const state = useSelector(state => state.posts )
  console.log(state)
  return (
    <div className="app">
      <Routes>
      <Route path="/" element={<><AddPostForm /><PostsList /></>} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/editPost/:postId" element={<EditPostForm />} />
      </Routes>
    </div>
  );
}

export default App;

