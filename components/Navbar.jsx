"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [username, setUsername] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // Retrieve user login status and username from localStorage
    const storedUsername = localStorage.getItem("name");
    const loggedIn = storedUsername ? true : false;

    setUsername(storedUsername || "");
    setUserLoggedIn(loggedIn);
  }, []); 

  useEffect(() => {
    // Update the state after the component has mounted on the client side
    if (isClient) {
      const storedUsername = localStorage.getItem("name");
      const loggedIn = storedUsername ? true : false;

      setUsername(storedUsername || "");
      setUserLoggedIn(loggedIn);
    }
  }, [isClient]); 

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout logic goes here");

    // Clear the username from localStorage
    localStorage.removeItem("name");

    // Update state to indicate user is logged out
    setUserLoggedIn(false);
    setUsername("");
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-200">
      <Link href="/">
        <Image
          src="/assets/images/logo.png"
          alt="Budget Buddy"
          width={150}
          height={100}
        />
      </Link>
      {isClient && userLoggedIn && (
        <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <p className="text-primary-color font-semibold mr-4">
              Logged In User: {username}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-secondary-color text-background-color hover:bg-primary-color hover:text-secondary-color transition duration-300 px-6 py-3 rounded-full focus:outline-none"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
