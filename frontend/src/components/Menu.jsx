import React from 'react';

const Menu = () => {
    return (
        <div className="fixed left-0 top-0 w-34 bg-white p-4 hidden sm:inline">
            <h5 className="text-lg font-semibold mb-4">Menu</h5>
            <a href="#" className="block py-2 mt-2  rounded px-3 ${}">Compose</a>
            <a href="#" className="block py-2 mt-2  rounded px-3">Inbox</a>
            <a href="#" className="block py-2 mt-2  rounded px-3">Send</a>
            <a href="#" className="block py-2 mt-2  rounded px-3">Quick Talk</a>
        </div>
    );
};

export default Menu;