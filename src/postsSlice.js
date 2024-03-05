import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.items.push({ ...action.payload, comments: [] });
    },
    likePost: (state, action) => {
      const post = state.items.find((post) => post.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
    addComment: (state, action) => {
      const post = state.items.find((post) => post.id === action.payload.postId);
      if (post) {
        post.comments.push({ id: nanoid(), text: action.payload.commentText });
      }
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.items.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.items = state.items.filter((post) => post.id !== postId);
    },
  
  },
});

export const { addPost, likePost, addComment, postUpdated  ,deletePost} = postsSlice.actions;

export const selectPosts = (state) => state.posts.items;
export const selectPostById = (state, postId) =>
  state.posts.items.find((post) => post.id === postId);

export default postsSlice.reducer;
