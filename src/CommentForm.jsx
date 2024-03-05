import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from './postsSlice';

export const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(addComment({ postId, commentText }));
      setCommentText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};
