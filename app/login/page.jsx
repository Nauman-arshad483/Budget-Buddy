"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter(); // Create a router object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    } else {
      newErrors.email = '';
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      // If form is not valid, don't proceed with the API call
      return;
    }

    try {
      const response = await fetch('/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data is..", data);
        const userName = data.user.username;
        const userID = data.user.id;

        localStorage.setItem('name', userName);
        localStorage.setItem('userID', userID);
        console.log('Login successful:', data);
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);

        if (errorData.error === 'User not found') {
          // Update the state to display the error to the user
          setErrors({ ...errors, email: errorData.error });
        } else {
          // Handle other types of errors here if needed
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-color to-secondary-color">
      <div className="text-center animate__animated animate__fadeIn bg-gray-200 p-8 rounded-md shadow-lg">
        <h2 className="text-3xl font-semibold mb-4 text-accent-color">Login</h2>
        <form>
          <div className="mb-4">
            <span className="text-sm text-red-500">{errors.email}</span>
            <label htmlFor="email" className="block text-sm font-medium text-primary-color">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full rounded-md bg-background-color border-b-2 border-primary-color focus:outline-none focus:border-accent-color"
              required
            />
          </div>
          <div className="mb-6">
            <span className="text-sm text-red-500">{errors.password}</span>
            <label htmlFor="password" className="block text-sm font-medium text-primary-color">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full rounded-md bg-background-color border-b-2 border-primary-color focus:outline-none focus:border-accent-color"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-accent-color text-background-color px-8 py-3 rounded-md hover:bg-secondary-color hover:text-white transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
