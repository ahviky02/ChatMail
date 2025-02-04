import React, { useState, useEffect } from 'react';
import { useMailStore } from '../store/useMailStore';
import { useAuthStore } from '../store/useAuthStore';

const Compose = () => {
  const { composeMail, isComposeLoading } = useMailStore();
  const { authUser } = useAuthStore();

  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    mailContent: '',
    from: '', // Initialize from as an empty string
  });

  useEffect(() => {
    if (authUser) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        from: authUser.email,
      }));
    }
  }, [authUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await composeMail(formData);
    setFormData({ to: '', subject: '', mailContent: '', from: authUser.email }); // Reset form but keep from value
  };

  return (
    <div className="h-[calc(100vh-92px)] mx-auto p-6 bg-gray-800 text-white">
      <div className='w-3/4 m-auto'>
        <h1 className="text-2xl font-bold mb-4">Compose Mail</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="to" className="block text-sm font-medium text-gray-300 mb-1">To:</label>
            <input
              type="email"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">Content:</label>
            <textarea
              id="mailContent"
              name="mailContent"
              value={formData.mailContent}
              onChange={handleChange}
              rows="10"
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring resize-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring focus:border-blue-500"
            >
              {isComposeLoading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Compose;
