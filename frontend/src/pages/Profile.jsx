import userpic from '../assets/user.png';

const Profile = ({ user }) => {
  return (
    <div className="profile-container p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <header className="flex items-center mb-4">
        <img src={user.profilePic || userpic} alt="Profile" className="w-24 h-24 rounded-full" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <button className="mt-2 p-2 bg-blue-600 rounded">Edit Profile</button>
        </div>
      </header>
      <section className="about mb-4">
        <h2 className="text-2xl font-semibold">About</h2>
        <p>{user.bio || 'No bio available.'}</p>
        <p className="text-gray-400">Email: {user.email}</p>
      </section>
      <section className="activity mb-4">
        <h2 className="text-2xl font-semibold">Recent Activity</h2>
        {user.posts.length > 0 ? (
          user.posts.map((post, index) => (
            <div key={index} className="post bg-gray-800 p-2 rounded mb-2">
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No recent activity.</p>
        )}
      </section>
      <section className="settings">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <button className="mt-2 p-2 bg-red-600 rounded">Delete Account</button>
      </section>
    </div>
  );
};

export default Profile;