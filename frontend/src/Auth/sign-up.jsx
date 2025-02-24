import React, { useState,useEffect} from 'react';
import userImage from '../assets/user.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'male',
    dob: '',
    password: '',
    password_confirmation: '',
    image: null,
  });

  const {signup,isSignUp} = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(isSignUp){
      navigate('/profile');
      }
      },[isSignUp,navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    signup(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center pb-3">Sign Up</h1>

        <div className="flex justify-center mb-4">
          <img
            id="previewImage"
            className="w-24 h-24 rounded-full"
            src={formData.image ? URL.createObjectURL(formData.image) : userImage}
            alt="Preview"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date Of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="mr-1"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="mr-1"
                />
                Female
              </label>
            </div>
          </div>

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

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
              required
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button type="submit" className="w-full py-2 text-white bg-gray-700 rounded-md hover:bg-gray-800 focus:outline-none">
            Register
          </button>
        </div>
        <h6 className='mt-3 text-center'>Already have an account? <a href='/signin' className='font-bold text-gray-700'>Sign in</a></h6>
      </form>
    </div>
  );
}
