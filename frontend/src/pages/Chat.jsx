import React, { useEffect } from 'react';
import {MessageSquareMore} from 'lucide-react';
import Menu from '../components/Menu';
import { useChatStore } from '../store/useChatStore';
import UsersElements from '../components/UsersElements';
import UserContent from '../components/UserContent';

const Chat = () => {
  const { users, getUsers, selectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  return (
    <div className="h-[calc(100vh-3rem)] fixed bg-primary/80 w-full mt-12">
      <div className="flex h-full">
        {/* Sidebar Menu */}
        <div className="w-40 bg-slate-500 h-full fixed">
          <Menu />
        </div>
        {/* Main Content Area */}
        <div className="flex-1 bg-slate-900 h-full flex ml-40">
          {/* Left column for additional content */}
          <div className="h-full w-1/4 bg-gray-700 text-white p-4 overflow-y-auto">
            <div className="flex flex-col h-full">
              <input 
                type="search" 
                className="w-full p-2 mb-4 bg-gray-800 text-white rounded" 
                placeholder="Search Users" 
              />
              <div className="flex-1 overflow-y-auto">
                <UsersElements users={users} />
              </div>
            </div>
          </div>
          {/* Right column for chat content */}
          <div className="flex-1 bg-gray-800 p-4 h-full">
            {
              selectedUser ? (<UserContent user={selectedUser} />) : <div className="text-white h-screen flex flex-col justify-center items-center"><MessageSquareMore className='block m-2 size-20'/><span className='block m-2'>Welcome to the chat!</span></div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
