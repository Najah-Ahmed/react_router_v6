import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
const Editpost = ({
  handleEdit,
  posts,
  editBody,
  setEditBody,
  editTitle,
  setEditTitle,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditBody(post.body);
      setEditTitle(post.title);
    }
  }, [post, setEditBody, setEditTitle]);

  return (
    <main className='NewPost'>
      {editTitle && (
        <>
          <h2>New Post</h2>
          <form onSubmit={(e) => e.preventDefault()} className='newPostForm'>
            <label htmlFor='postTitle'>Title:</label>
            <input
              id='postTitle'
              type='text'
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Body:</label>
            <textarea
              id='postBody'
              type='text'
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type='submit' onClick={() => handleEdit(post.id)}>
              Update
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that disappointing</p>
          <p>
            <Link to='/'>Visit Out Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default Editpost;
