import userpic from '../assets/user.png';

const Profile = ({ user }) => {
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
          <button className="mt-9 p-2 bg-blue-600 rounded hover:bg-blue-700 transition">Edit Profile</button>
        </div>
      </header>
      
    </div>
  );
};

export default Profile;
