import React, { useEffect } from "react";
import { useMailStore } from "../store/useMailStore";
import mailpic from '../assets/user.png';


const Mail = ({ user }) => {
  console.log(user);
  return (
     <div className="p-0 bg-gray-800 text-white rounded-lg shadow-md h-full">
          <div className="flex items-center mb-4">
            <img
              src={user.profilePic || mailpic}
              alt="User avatar"
              className="w-20 h-20 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{user.to}</h2>
              <p className="text-gray-400">{user.subject}</p>
            </div>
            <div className="flex-1 text-right">
              <p>{Date(user.updatedAt)}</p>
              <p className="text-green-500">{user.mailStatus}</p>
            </div>
          </div>
          <div className="p-10 text-primary">
            <p className="text-gray-400">{user.mailContent}</p>
          </div>

        </div>
  );
}

export default Mail;