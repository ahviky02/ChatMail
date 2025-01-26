import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Auth/sign-in';
import Signup from './Auth/sign-up';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import Navbar from './components/Navbar';


function App() {
  const {authUser, checkAuth,isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if(isCheckingAuth && !authUser){
    return (<div className='flex justify-center items-center h-screen'>
      <Loader className="size-10 animate-spin" />
      </div>);
  }
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;