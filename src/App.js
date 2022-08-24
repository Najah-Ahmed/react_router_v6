import { Route, Routes } from 'react-router-dom';

import Layout from './Components/Layout'; // layouts

// pages
import Home from './Components/pages/Home'; // from pages
import About from './Components/pages/About'; // from pages
import Contact from './Components/pages/Contact'; // from pages
import AddPost from './Components/pages/AddPost'; // from pages
import Posts from './Components/pages/Posts'; // from pages
import EditPost from './Components/pages/EditPost'; // from pages
import Missing from './Components/pages/Missing'; // from pages

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/add' element={<AddPost />} />
          <Route path='post/:id' element={<Posts />} />
          <Route path='editpost/:id' element={<EditPost />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
