import React from 'react';

function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-primary">Sign In</h2>
        <form>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none"
          >
            Sign In
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{' '}
          <a href="/signup" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignIn;