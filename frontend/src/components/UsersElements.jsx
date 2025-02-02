import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import userpic from '../assets/user.png';

const UsersElements = ({ users }) => {
  const { setSelectedUser, getMessages } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    getMessages(authUser._id, user._id); // Use user ID instead of email for consistency
  };

  return (
    <div className="min-w-full">
      {users.length ? (
        users.map((user) => (
          <div
            key={user._id} // Ensure this is a unique identifier for each user
            onClick={() => handleUserSelect(user)}
            className="flex items-center p-2 hover:bg-gray-800 cursor-pointer rounded"
          >
            <div className="relative">
              <img
                src={user.profilePic || userpic}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
              )}
            </div>
            <div className="ml-2">
              <p className="text-white">{user._id == authUser._id ? "You" : user.name}</p>
              <p className="text-gray-400 text-xs">{onlineUsers.includes(user._id) ? 'Online' : 'Offline'}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No users available</p>
      )}
    </div>
  );
};

export default UsersElements;