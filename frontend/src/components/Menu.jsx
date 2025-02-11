import React, { useState } from 'react';
import { SendHorizontal, Send, Mail, MessagesSquare } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('compose');

  const handleButton = (value) => {
    setActiveButton(value);
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
    <div className="p-1 flex justify-around bg-gray-800 mt-11 h-12 shadow-lg space-x-3.5">
      <button
        className={`w-1/4 rounded mt-1 p-4 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 ${activeButton === 'compose' ? 'bg-pink-800 text-white' : 'bg-slate-950 hover:bg-pink-500 hover:text-white'}`}
        onClick={() => handleButton('compose')}
        aria-label="Compose"
      >
        <SendHorizontal className="w-5 h-5 mr-2" />
        <span>Compose</span>
      </button>
      <button
        className={`w-1/4 rounded mt-1 p-4 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 ${activeButton === 'sent' ? 'bg-pink-800 text-white' : 'bg-slate-950 hover:bg-pink-500 hover:text-white'}`}
        onClick={() => handleButton('sent')}
        aria-label="Sent"
      >
        <Send className="w-5 h-5 mr-2" />
        <span>Sent</span>
      </button>
      <button
        className={`w-1/4 rounded mt-1 p-4 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 ${activeButton === 'inbox' ? 'bg-pink-800 text-white' : 'bg-slate-950 hover:bg-pink-500 hover:text-white'}`}
        onClick={() => handleButton('inbox')}
        aria-label="Inbox"
      >
        <Mail className="w-5 h-5 mr-2" />
        <span>Inbox</span>
      </button>
      <button
        className={`w-1/4 rounded mt-1 p-4 flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 ${activeButton === 'chat' ? 'bg-pink-800 text-white' : 'bg-slate-950 hover:bg-pink-500 hover:text-white'}`}
        onClick={() => handleButton('chat')}
        aria-label="Quick Talk"
      >
        <MessagesSquare className="w-5 h-5 mr-2" />
        <span>QTalk</span>
      </button>
    </div>
  );
};

export default Menu;