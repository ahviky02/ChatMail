import { useAuthStore } from "../store/useAuthStore";
import { useMailStore } from "../store/useMailStore";
import mailpic from '../assets/user.png';

const MailElements = ({ mails }) => {
  const { authUser, onlineUsers } = useAuthStore();
  
  const handlemailSelect = (mail) => {
 // Use mail ID instead of email for consistency
  };

  return (
    <div className="min-w-full">
      {mails.length ? (
        mails.map((mail) => (
          <div
            key={mail._id} // Ensure this is a unique identifier for each mail
            onClick={() => handlemailSelect(mail)}
            className="flex items-center p-2 hover:bg-gray-800 cursor-pointer rounded"
          >
            <div className="relative">
              <img
                src={mail.profilePic || mailpic}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              {onlineUsers.includes(mail._id) && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
              )}
            </div>
            <div className="ml-2">
              <p className="text-white">{mail._id == authUser._id ? "You" : mail.email}</p>
              <p className="text-gray-400 text-xs">{onlineUsers.includes(mail._id) ? 'Online' : 'Offline'}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No mails available</p>
      )}
    </div>
  );
};

export default MailElements;