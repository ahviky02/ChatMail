import React from 'react';
import { SendHorizontal, Send, Mail, MessagesSquare } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const handleButton = (value) => {
    if (value === 'compose') {
      navigate('/compose');
    } else if (value === 'inbox') {
      navigate('/inbox');
    } else if (value === 'sent') {
      navigate('/sent');
    } else if (value === 'chat') {
      navigate('/chat');
    }
  };

  return (
    <div className="p-4 flex justify-around bg-gray-800 mt-12 h-11">
      <button className="flex items-center gap-2" onClick={() => handleButton('compose')} aria-label="Compose">
        <SendHorizontal className="w-5 h-5" />
        <span>Compose</span>
      </button>
      <button className="flex items-center gap-2" onClick={() => handleButton('sent')} aria-label="Sent">
        <Send className="w-5 h-5" />
        <span>Sent</span>
      </button>
      <button className="flex items-center gap-2" onClick={() => handleButton('inbox')} aria-label="Inbox">
        <Mail className="w-5 h-5" />
        <span>Inbox</span>
      </button>
      <button className="flex items-center gap-2" onClick={() => handleButton('chat')} aria-label="Quick Talk">
        <MessagesSquare className="w-5 h-5" />
        <span>Quick Talk</span>
      </button>
    </div>
  );
};

export default Menu;
