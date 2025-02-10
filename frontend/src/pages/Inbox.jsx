import React, { useEffect } from 'react';
import { MessageSquareMore } from 'lucide-react';
import { useMailStore } from '../store/useMailStore';
import MailElements from '../components/inboxElements';
import MailContent from '../components/inboxContents';
import { useAuthStore } from '../store/useAuthStore';

const Inbox = () => {
  const { inboxList, getInboxList, inboxSelectMail, subscribeToMail, unsubscribeToMail } = useMailStore(); // Fixed: Changed 'unSubscribeToMail' to 'unsubscribeToMail'
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      getInboxList(authUser.email);
      subscribeToMail();

      return () => {
        unsubscribeToMail(); // Fixed: Changed 'unSubscribeToMail' to 'unsubscribeToMail'
      };
    }
  }, [authUser, getInboxList, subscribeToMail, unsubscribeToMail]); // Fixed: Added 'authUser' to dependency array

  useEffect(() => {
    getInboxList(authUser.email);
  }, [getInboxList, authUser.email]);

  return (
    <div className="h-[calc(100vh-92px)] bg-primary/80">
      <div className="flex bg-slate-900 h-full">
        {/* Left column for mail elements */}
        <div className="w-1/4 bg-gray-700 text-white p-4 overflow-y-auto">
          <input
            type="search"
            className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
            placeholder="Search Users"
          />
          <MailElements mails={inboxList} />
        </div>
        {/* Right column for mail content */}
        <div className="flex-1 bg-gray-800 p-4 h-full">
          {inboxSelectMail ? (
            <MailContent user={inboxSelectMail} type="Sent" />
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
};

export default Inbox;
