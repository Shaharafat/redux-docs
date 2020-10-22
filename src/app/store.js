import { configureStore } from '@reduxjs/toolkit'

// ✅ slices
import postsReducer from '../features/posts/postSlice';
import usersReducer from '../features/users/userSlice'


export default configureStore({
  // reducer: () => ({

  // }),
  reducer: {
    posts: postsReducer,
    users:usersReducer,
  }
})
