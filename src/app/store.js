import { configureStore } from '@reduxjs/toolkit'

// ✅ slices
import postsReducer from '../features/posts/postSlice';


export default configureStore({
  // reducer: () => ({

  // }),
  reducer: {
    posts: postsReducer
  }
})
