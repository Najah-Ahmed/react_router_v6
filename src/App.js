import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// layouts
import Layout from './Components/Layout';

// pages
import Home from './Components/pages/Home';
import About from './Components/pages/About';
import Contact from './Components/pages/Contact';
import AddPost from './Components/pages/AddPost';
import PostBlog from './Components/pages/PostBlog';
import Missing from './Components/pages/Missing';

import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Hello World',
      datetime: '2020-01-01 11:11:11 PM',
      body: 'This is a test blog post.',
    },
    {
      id: 2,
      title: 'Hello World 2',
      datetime: '2022-01-01 09:11:11 PM',
      body: 'Najaah',
    },
  ]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // const filteredPosts = posts.filter(
    //   (post) =>
    //     post.body.toLowerCase().includes(search.toLowerCase()) ||
    //     post.title.toLowerCase().includes(search.toLowerCase())
    // );
    // setSearchResults(filteredPosts.reverse());
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'dd-MM-yyyy pp ');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  };
  const handleDelete = (id) => {
    const postList = posts.filter((post) => post.id !== id);
    setPosts(postList);
    navigate('/');
  };

  return (
    <main>
      <Routes>
        <Route
          path='/'
          element={<Layout search={search} setSearch={setSearch} />}
        >
          <Route index element={<Home posts={searchResults} />} />
          <Route
            path='/add'
            element={
              <AddPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />
          <Route
            path='post/:id'
            element={<PostBlog posts={posts} handleDelete={handleDelete} />}
          />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
