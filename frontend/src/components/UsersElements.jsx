import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import userpic from '../assets/user.png';


const UsersElements = ({ users }) => {
  const { setSelectedUser, getMessages } = useChatStore();
  const { authUser } = useAuthStore();
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    getMessages(authUser._id, user._id); // Use user ID instead of email for consistency
  };

  return (
    <div>
      {users.length ? (
        users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserSelect(user)}
            className="flex items-center p-2 hover:bg-gray-800 cursor-pointer rounded"
          >
            <img
              src={user.profilePic || userpic}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-2">
              <p className="text-white">{user.name}</p>
              <p className="text-gray-400 text-xs">Online</p>
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