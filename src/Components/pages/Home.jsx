import Feed from '../Feed';
const Home = ({ posts, isLoading, fetchError }) => {
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
