import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectPostById, likePost } from './postsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CommentForm } from './CommentForm';

export const PostDetails = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));
  const dispatch = useDispatch();

  const handleLikePost = () => {
    dispatch(likePost(postId));
  };

  if (!post) {
    return (
      <section className="container mt-4">
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <section className="container mt-4">
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary" onClick={handleLikePost}>
            <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
          </button>
          <Link to={`/editPost/${post.id}`} className="btn btn-outline-secondary">
            <FontAwesomeIcon icon={faEdit} /> Edit Post
          </Link>
        </div>
        <CommentForm postId={post.id} />
        <ul className="list-group mt-2">
          {post.comments.map((comment) => (
            <li key={comment.id} className="list-group-item">{comment.text}</li>
          ))}
        </ul>
      </article>
    </section>
  );
};
