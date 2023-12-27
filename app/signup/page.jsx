"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter(); // Create a router object

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else {
      newErrors.username = '';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    } else {
      newErrors.email = '';
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return valid;
  };


  const handleInputChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignup = async () => {
    if (!validateForm()) {
      // If form is not valid, don't proceed with the API call
      return;
    }
else{

  console.log("form data ...",formData)
  try {
    const response = await fetch('/api/auth/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Signup successful:', data);
      alert('User created successfully!');

      router.push('/login');


    } else {
      const errorData = await response.json();
      console.error('Signup failed:', errorData);

      if (errorData.error === "User with this email already exists") {
        // Update the state to display the error to the user
        setErrors({ ...errors, email: errorData.error });
      } else {
        // Handle other types of errors here if needed
      }
    }
  } catch (error) {
    console.error('Error during signup:', error);
  }
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-color to-secondary-color">
      <div className="text-center animate__animated animate__fadeIn bg-gray-200 p-8 rounded-md shadow-lg">
        <h1 className="text-5xl font-bold mb-6 text-accent-color">Sign Up</h1>
        <form className="w-full max-w-md mx-auto">
          <div className="mb-4">
          <span className="text-sm text-red-500">{errors.username}</span>

            <label htmlFor="username" className="block text-sm font-semibold text-primary-color mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-secondary-color rounded-md py-2 px-3 focus:outline-none focus:border-accent-color"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
          <span className="text-sm text-red-500">{errors.email}</span>

            <label htmlFor="email" className="block text-sm font-semibold text-primary-color mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-secondary-color rounded-md py-2 px-3 focus:outline-none focus:border-accent-color"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
          <span className="text-sm text-red-500">{errors.password}</span>

            <label htmlFor="password" className="block text-sm font-semibold text-primary-color mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-secondary-color rounded-md py-2 px-3 focus:outline-none focus:border-accent-color"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            onClick={handleSignup}
            className="bg-accent-color text-background-color px-8 py-3 rounded-md hover:bg-secondary-color hover:text-white transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
