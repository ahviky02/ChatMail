import axios from 'axios';
import userpic from '../assets/user.png';
import { useAuthStore } from '../store/useAuthStore';

const Profile = ({ user }) => {
  const { authUser,updateProfile } = useAuthStore();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = { image: file, id: user._id };
      console.log(data);
      updateProfile(data); 
    }
  };

  return (
    <div className="min-h-[calc(100vh-3rem)] bg-gray-900 pt-10 overflow-auto w-screen mx-auto">
      <header className="flex flex-col items-center mb-4">
        <img 
          src={user.profilePic || userpic} 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover" 
        />
        <div className="text-center mt-4">
          <h1 className="text-3xl text-primary-text font-bold">{user.name}</h1>
          <h2 className='text-primary-text font-bold mt-4'>{user.email}</h2>
          <h4 className='text-primary-text font-bold mt-4'>{user._id}</h4>
          <div>
            <label className="block text-sm font-medium">Upload Image</label>
            <input
              type="file"
              name="image" 
              onChange={handleChange}
              accept='image/*'
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
            />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Profile;