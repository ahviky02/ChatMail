import Navbar from './Navbar';
import Menu from './Menu';

const Layout = ({ children }) => {
  return (
    <div className=''>
      <Navbar />
      <main className="bg-primary/80 w-screen fixed">
          <Menu />
        {children}
      </main>
    </div>
  );
};

export default Layout;