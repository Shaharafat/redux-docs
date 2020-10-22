import React from 'react';
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import {PostAuthor} from './PostAuthor'

const PostList = () => {
  const posts = useSelector(state => state.posts)

  const renderPosts = posts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor userId={post.user} />
        <p> {post.content.substring(0,100)} </p>
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