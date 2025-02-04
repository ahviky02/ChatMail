import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Auth/sign-in';
import Signup from './Auth/sign-up';
import Chat from './pages/Chat.jsx';
import Home from './pages/Home';
import Sent from './pages/Sent';
import Compose from './pages/Compose';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import Layout from './components/Layout';
import Profile from './pages/Profile.jsx';

function App() {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {authUser && (
          <Route 
            path="/*" 
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/sent" element={<Sent />} />
                  <Route path="/compose" element={<Compose />} />
                  <Route path="/profile" element={<Profile user={authUser} />} />
                </Routes>
              </Layout>
            } 
          />
        )}
        {!authUser && <Route path="/*" element={<Signin />} />}
      </Routes>
    </Router>
  );
}

export default App;