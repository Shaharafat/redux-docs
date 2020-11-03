import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import {client} from '../../api/client'
import { sub } from 'date-fns'

// const initialState = [
//   {
//     id: '1',
//     title: 'First Post!',
//     content: 'Hello.',
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     // date: "2020-10-22T06:51:03.989Z"
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
//   {
//     id: '2',
//     title: 'Second Post',
//     content: 'More Text',
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     // date:"2020-10-22T06:51:16.836Z"
//     reactions: {
//       thumbsUp: 0,
//       hooray: 0,
//       heart: 0,
//       rocket: 0,
//       eyes: 0,
//     },
//   },
// ]

// for thunk
const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded(state, action) {
    //   state.push(action.payload)
    // },
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId, // to add user in post.
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },

    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions
export default postSlice.reducer

// thunk portion
export const selectAllPosts = state => state.posts.posts;

export const selectPostById = (state,postId) => state.posts.posts.find(post => post.id === postId)

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.posts
})
