import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import DataContext from '../context/DataContext';
const Layout = () => {
  const { search, setSearch } = useContext(DataContext);
  return (
    <div className='App'>
      <Header title='React Router' />
      <Nav search={search} setSearch={setSearch} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
