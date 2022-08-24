import { useContext } from 'react';
import DataContext from '../../context/DataContext';

const AddPost = () => {
  const { handleSubmit, postTitle, setPostTitle, postBody, setPostBody } =
    useContext(DataContext);
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form onSubmit={handleSubmit} className='newPostForm'>
        <label htmlFor='postTitle'>Title:</label>
        <input
          id='postTitle'
          type='text'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Body:</label>
        <textarea
          id='postBody'
          type='text'
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  );
};

export default AddPost;
