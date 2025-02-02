import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import userpic from '../assets/user.png';
import { useEffect } from "react";

const UserContent = ({ user }) => {
  const { getMessages, sendMessage, subscribeToMessages, unsubscribeFromMessages, messages, isMessageLoading } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser && user) {
      getMessages(authUser._id, user._id);
      subscribeToMessages();

      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [authUser, user, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  const handleSendChat = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      sendMessage({ sender: authUser._id, receiver: user._id, message: e.target.value.trim() });
      e.target.value = '';
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md h-full">
      <div className="flex items-center mb-4">
        <img
          src={user.profilePic || userpic}
          alt="User avatar"
          className="w-20 h-20 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
      </div>
      <div className="bg-gray-700 p-4 rounded-lg shadow-inner flex flex-col h-4/5 overflow-y-scroll behavior-smooth-down">
        {isMessageLoading ? (
          <p>Loading messages...</p>
        ) : messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`my-2 ${msg.senderId === authUser._id ? 'text-right' : 'text-left'}`}>
              <p className="p-2 bg-gray-600 rounded">{msg.text}</p>
            </div>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
      <input
        type="text"
        className="w-full p-2 h-10 mt-1 bg-gray-500 text-white rounded"
        placeholder="Type here"
        onKeyDown={handleSendChat}
      />
    </div>
  );
};

export default UserContent;