import React from 'react';
import { SendHorizontal,Send,Mail,MessagesSquare } from 'lucide-react';

const Menu = () => {
    return (
        <div className="left-0 top-0 p-4">
            <button className="flex gap-2 items-center mt-4" aria-label="Profile">
                <SendHorizontal className="size-5  flex items-center justify-center" />
                <span className="hidden sm:inline">Compose</span>
            </button>
            <button className="flex gap-2 items-center mt-4" aria-label="Profile">
                <Send className="size-5  flex items-center justify-center" />
                <span className="hidden sm:inline">Sent</span>
            </button>
            <button className="flex gap-2 items-center mt-4" aria-label="Profile">
                <Mail className="size-5  flex items-center justify-center" />
                <span className="hidden sm:inline">Inbox</span>
            </button>
            <button className="flex gap-2 items-center mt-4" aria-label="Profile">
                <MessagesSquare className="size-5  flex items-center justify-center" />
                <span className="hidden sm:inline">Quick Talk</span>
            </button>
          
        </div>
    );
};

export default Menu;