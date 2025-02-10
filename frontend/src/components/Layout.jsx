import Navbar from './Navbar';
import Menu from './Menu';


const Layout = ({ children }) => {
  return (
    <div className=''>
      <Navbar />
      <main className="bg-primary/80 text-primary-text w-screen fixed">
        <Menu />
        <div className="content-container"> {/* Add a container for children elements */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
