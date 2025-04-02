import React, { useState, useEffect } from 'react';
import { useMailStore } from '../store/useMailStore';
import { useAuthStore } from '../store/useAuthStore';

const Compose = () => {
  const { composeMail, isComposeLoading, getToMails, ToUsers } = useMailStore();
  const { authUser } = useAuthStore();
  var hideSuggestions = false;

  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    mailContent: '',
    from: '',
  });

  // Set the "from" field based on authenticated user's email
  useEffect(() => {
    if (authUser?.email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        from: authUser.email,
      }));
    }
  }, [authUser]);

  // Unified input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Trigger email suggestions for the "to" field
    if (name === 'to' && value.trim()) {
      getToMails(value);
    }
  };

  const handleSuggestionClick = (email) => {
    setFormData((prev) => ({ ...prev, to: email }));
    // Clear suggestions
    ToUsers.length = 0;  // but verify; Chat.
    var hideSuggestions = true;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await composeMail(formData);
    setFormData({ to: '', subject: '', mailContent: '', from: authUser.email }); // Reset form, retain "from"
  };

  return (
    <div className="h-[calc(100vh-92px)] mx-auto p-6 bg-gray-800 text-white">
      <div className="w-3/4 m-auto">
        <h1 className="text-2xl font-bold mb-4">Compose Mail</h1>
        <form onSubmit={handleSubmit}>
          {/* Recipient Email */}
          <div className="mb-4">
            <label htmlFor="to" className="block text-sm font-medium text-gray-300 mb-1">To:</label>
            <input
              type="email"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter recipient's email"
              required
            />
            {/* Email Suggestions */}
            <ul className="bg-gray-800 text-white rounded mt-2 fixed z-10 max-h-40 overflow-y-auto border border-gray-700">
              {ToUsers.length > 0 && formData.to ? (
                ToUsers.map((user, index) => (
                  <li
                    key={index}
                    className="p-2 border-b border-gray-700 cursor-pointer"
                    onClick={() => handleSuggestionClick(user.email)}
                  >
                    {user.email}
                  </li>
                ))
              ) : (
                hideSuggestions && formData.to && (
                formData.to && <li className="p-2 text-gray-400">No results found</li>)
              )}
            </ul>

          </div>

          {/* Mail Subject */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter subject"
              required
            />
          </div>

          {/* Mail Content */}
          <div className="mb-4">
            <label htmlFor="mailContent" className="block text-sm font-medium text-gray-300 mb-1">Content:</label>
            <textarea
              id="mailContent"
              name="mailContent"
              value={formData.mailContent}
              onChange={handleChange}
              rows="10"
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring resize-none focus:border-blue-500"
              placeholder="Write your message here"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none focus:ring focus:border-blue-500"
              disabled={isComposeLoading} // Disable when loading
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
