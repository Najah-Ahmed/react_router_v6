import { useParams, Link } from 'react-router-dom';
const Posts = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className='PostPage'>
      <article className='post'>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/editpost/${post.id}`}>
              <button className='editbtn'>Edit Post</button>
            </Link>
            <button className='deletebtn' onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that disappointing</p>
            <p>
              <Link to='/'>Visit Out Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default Posts;
