import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectPosts, likePost, selectPostById, deletePost } from "./postsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import { CommentForm } from "./CommentForm";

export const PostsList = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [visibleComments, setVisibleComments] = useState({});

  const handleLikePost = (id) => {
    dispatch(likePost(id));
  };

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <section className="container mt-4">
      <h2 className="mb-3">Posts</h2>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            <Link to={`/posts/${post.id}`} className="text-decoration-none">
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}</p>
            </Link>
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleLikePost(post.id)}
              >
                <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => toggleComments(post.id)}
              >
                <FontAwesomeIcon icon={faComment} /> Comment
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  dispatch(deletePost(post.id));
                }}
              >
                Delete Post
              </button>
            </div>
            {visibleComments[post.id] && (
              <>
                <CommentForm postId={post.id} />
                <ul className="list-group mt-2">
                  {post.comments.map((comment) => (
                    <li key={comment.id} className="list-group-item">
                      {comment.text}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
