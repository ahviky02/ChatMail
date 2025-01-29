import { useChatStore } from "../store/useChatStore";

const UsersElements = ({ users }) => {
  const { setSelectedUser } = useChatStore();
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
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
              src={user.avatar}
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
