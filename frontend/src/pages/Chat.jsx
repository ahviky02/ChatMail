import React, { useEffect } from 'react';
import { MessageSquareMore } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import UsersElements from '../components/UsersElements';
import UserContent from '../components/UserContent';

const Chat = () => {
  const { users, getUsers, selectedUser, seachUsers } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="h-[calc(100vh-92px)] bg-primary/80">
      <div className="flex bg-slate-900 h-full">
        {/* Left column for additional content */}
        <div className="w-1/4 bg-gray-700 text-white p-4 overflow-y-auto">
          <input 
            type="search" 
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded" 
            onChange={(e) => seachUsers(e.target.value)} 
            placeholder="Search Users" 
          />
          <UsersElements users={users} />
        </div>
        {/* Right column for chat content */}
        <div className="flex-1 bg-gray-800 p-4 h-full">
          {selectedUser ? (
            <UserContent user={selectedUser} />
          ) : (
            <div className="text-white h-full flex flex-col justify-center items-center">
              <MessageSquareMore className="block m-2 w-20 h-20" />
              <span className="block m-2">Welcome to the chat!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
