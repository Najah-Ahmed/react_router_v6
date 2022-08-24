import Feed from '../Feed';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
const Home = () => {
  const {
    searchResults: posts,
    isLoading,
    fetchError,
  } = useContext(DataContext);
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading posting...</p>}
      {!isLoading && fetchError && (
        <p className='statusMsg' style={{ color: 'red' }}>
          Error fetching posting
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p className='statusMsg' style={{ marginTop: '2rem' }}>
            No posts to display.
          </p>
        ))}
    </main>
  );
};

export default Home;
