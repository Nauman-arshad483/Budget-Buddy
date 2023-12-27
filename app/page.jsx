"use client"
import React from "react";
import Link from "next/link";

const Home = () => {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-color to-secondary-color">
      <div className="text-center animate__animated animate__fadeIn bg-background-color p-8 rounded-md">
        <h1 className="text-6xl font-bold mb-6 text-accent-color">
          Budget Buddy
        </h1>
        <p className="text-lg mb-8 text-primary-color">
          Effortlessly manage your expenses and income with our intuitive
          financial app.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/login">
            <button className="bg-secondary-color text-background-color hover:bg-primary-color hover:text-secondary-color transition duration-300 px-4 py-2 rounded-md focus:outline-none">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-accent-color text-background-color hover:bg-secondary-color hover:text-background-color transition duration-300 px-4 py-2 rounded-md focus:outline-none">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
