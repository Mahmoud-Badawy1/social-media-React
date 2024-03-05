import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addPost } from './postsSlice';

export const AddPostForm = () => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (content) {
      dispatch(
        addPost({
          id: nanoid(),
          content,
          likes: 0, // Assuming each post has a 'likes' property
        })
      );

      setContent('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <textarea
          value={content}
          onChange={onContentChanged}
          placeholder="What's on your mind?"
        />
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};
