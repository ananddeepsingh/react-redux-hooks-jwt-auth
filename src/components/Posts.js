import React from 'react';

const Posts = ({ loading, posts }) => {
  if (loading) {
    return <tr><td>Loading...</td></tr>
  }

  return (
    <>
      {posts && posts.map(post => (
        <tr key={post.id}>
          <td>{post.id}</td>
          <td>{post.title}</td>
        </tr>
      ))}
    </>
  );
};

export default Posts;
