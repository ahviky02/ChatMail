import React from 'react';
import { useAuthStore } from "../store/useAuthStore";
import { useMailStore } from "../store/useMailStore";
import mailpic from '../assets/user.png';

const MailElements = ({ mails }) => { // Destructure mails and set a default value
  const { authUser } = useAuthStore();
  const { setSentSelectedMails } = useMailStore();
  const onlineUsers = []; 

  const handleMailSelect = (mail) => {
    setSentSelectedMails(mail);
    
  };

  return (
    <div className="min-w-full">
      {mails && mails.length ? (
        mails.map((mail) => (
          <div 
            key={mail._id} // Ensure this is a unique identifier for each mail
            onClick={() => handleMailSelect(mail)} 
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
              <p className="text-white">{mail.to === authUser.email ? "You" : mail.to}</p>
              <p className="text-gray-400 text-xs">{onlineUsers.includes() ? 'Online' : 'Offline'}</p>
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
