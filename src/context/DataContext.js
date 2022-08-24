import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize'; // Custom Hooks
import useAxiosFetch from '../hooks/useAxiosFetch'; // Custom Hooks
import { format } from 'date-fns';

import api from '../api/post';

const DataContext = createContext({});
export const DataProvider = ({ children }) => {
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
    <DataContext.Provider
      value={{
        width,
        posts,
        search,
        setSearch,
        searchResults,
        isLoading,
        fetchError,
        handleSubmit,
        handleEdit,
        handleDelete,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        editTitle,
        setEditTitle,
        editBody,
        setEditBody,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
