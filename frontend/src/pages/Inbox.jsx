import React, { useEffect } from 'react';
import { MessageSquareMore } from 'lucide-react';
import { useMailStore } from '../store/useMailStore';
import MailElements from '../components/MailElements';
import MailContent from '../components/MailContent';
import { useAuthStore } from '../store/useAuthStore';

const Inbox = () => {
  const { inboxList, getInboxList, inboxSelectMail } = useMailStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getInboxList(authUser._id);
    
  },[getInboxList,authUser._id])


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
            <MailContent user={inboxSelectMail} type="inbox"/>
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
