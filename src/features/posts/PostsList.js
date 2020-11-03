import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux'
//omit other imports
import {Link} from 'react-router-dom'

import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import {ReactionButtons} from './ReactionButtons'

import {selectAllPosts , fetchPosts} from './postSlice'

const PostList = () => {
  // const posts = useSelector(state => state.posts)
  const posts = useSelector(selectAllPosts)
  let orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))


  const dispatch = useDispatch();
  const postStatus = useSelector(state => state.posts.status)
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])  

  const renderPosts = orderedPosts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p> {post.content.substring(0,100)} </p>
        <ReactionButtons post={post} />
        <Link
          to={`/posts/${post.id}`}
          className="button muted-button"
        >
          View Post
        </Link>
      </article>
    )
  })

  return (
    <section>
      <h2>Posts</h2>
      {renderPosts}
    </section>
  )
}

// export default PostList
export {PostList}