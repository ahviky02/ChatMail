import { useChatStore } from "../store/useChatStore";
const UserContent = ({ user }) => {
     const { getMessages} = useChatStore();
     const { messages, isMessageLoading } = useChatStore();
     return (
       <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
         <div className="flex items-center mb-4">
           <img
             src={user.profilePic || '.../assets/user.png'}
             alt="User avatar"
             className="w-20 h-20 rounded-full"
           />
           <div className="ml-4">
             <h2 className="text-2xl font-bold">{user.name}</h2>
             <p className="text-gray-400">{user.email}</p>
           </div>
         </div>
         <div className="bg-gray-700 p-4 rounded-lg shadow-inner h-full overflow-y-auto">
          {

          }
           <input
             type="text"
             className="w-full p-2 bg-gray-800 text-white rounded bottom-0 "
             placeholder="Type here"
           />
         </div>
       </div>
     );
   };
   
   export default UserContent;
   