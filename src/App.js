import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useWindowSize from './hooks/useWindowSize'; // Custom Hooks
import useAxiosFetch from './hooks/useAxiosFetch'; // Custom Hooks

import Layout from './Components/Layout'; // layouts

// pages
import Home from './Components/pages/Home'; // from pages
import About from './Components/pages/About'; // from pages
import Contact from './Components/pages/Contact'; // from pages
import AddPost from './Components/pages/AddPost'; // from pages
import Posts from './Components/pages/Posts'; // from pages
import EditPost from './Components/pages/EditPost'; // from pages
import Missing from './Components/pages/Missing'; // from pages

import { format } from 'date-fns';

import api from './api/post';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  // *** Custom Hooks
  const { width } = useWindowSize();
  const { data, isLoading, fetchError } = useAxiosFetch(
    'http://localhost:3500/posts'
  );

  // *** using Custom Hooks to Fetch Data from server
  useEffect(() => {
    setPosts(data);
  }, [data]);

  // *** All way for fetching data from server ***
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts');
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const filteredPosts = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredPosts.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'dd-MM-yyyy pp ');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'dd-MM-yyyy pp ');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);

      setPosts(postList);
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Layout search={search} setSearch={setSearch} width={width} />
          }
        >
          <Route
            index
            element={
              <Home
                posts={searchResults}
                fetchError={fetchError}
                isLoading={isLoading}
              />
            }
          />
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
            element={<Posts posts={posts} handleDelete={handleDelete} />}
          />
          <Route
            path='editpost/:id'
            element={
              <EditPost
                handleEdit={handleEdit}
                posts={posts}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editBody={editBody}
                setEditBody={setEditBody}
              />
            }
          />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
