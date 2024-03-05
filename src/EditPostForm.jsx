import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { postUpdated, selectPostById } from './postsSlice';

export const EditPostForm = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <section className="container mt-4">
      <h2>Edit Post</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label">Post Title:</label>
          <input
            type="text"
            className="form-control"
            id="postTitle"
            name="postTitle"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">Content:</label>
          <textarea
            className="form-control"
            id="postContent"
            name="postContent"
            rows="3"
            value={content}
            onChange={onContentChanged}
          ></textarea>
        </div>
        <button type="button" className="btn btn-primary" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  );
};
