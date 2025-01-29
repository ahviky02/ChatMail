import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className='fixed'>{children}</main>
    </div>
  );
};

export default Layout;