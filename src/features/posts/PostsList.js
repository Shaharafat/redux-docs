import React from 'react';
import { useSelector } from 'react-redux'

const PostList = () => {
  const posts = useSelector(state => state.posts)

  const renderPosts = posts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <p> {post.content.substring(0,100)} </p>
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