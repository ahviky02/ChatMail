import React, { useEffect, useState } from 'react';
import { useAuthStore } from "../store/useAuthStore";
import { useMailStore } from "../store/useMailStore";
import mailpic from '../assets/user.png';
import { axiosInstance } from '../lib/axios';

const MailElements = ({ mails, type }) => {
  const { authUser, onlineUsers } = useAuthStore();
  const { setSentSelectedMails, setInboxSelectedMails } = useMailStore();


  const handleMailSelect = (mail) => {
    if (type = "sent") {
      setSentSelectedMails(mail);
    } else {
      setInboxSelectedMails(mail);

    }
  };

  const isUserOnline = (userId) => {
    return onlineUsers.some(user => user.userId === userId);
  };

  return (
    <div className="min-w-full">
      {mails && mails.length ? (
        mails.map((mail) => (
          <div
            key={mail._id}
            onClick={() => handleMailSelect(mail)}
            className="flex items-center p-2 hover:bg-gray-800 cursor-pointer rounded"
          >
            <div className="relative">
              <img
                src={mail.profilePic || mailpic}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              {isUserOnline(mail.to) && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
              )}
            </div>
            <div className="ml-2">
              <p className="text-white">{mail.to === authUser._id ? "You" : onlineUsers.find(user => user.userId === mail.to)?.email || 'Loading...'}</p>
              <p className="text-gray-400 text-xs">{isUserOnline(mail.to) ? 'Online' : 'Offline'}</p>
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
