import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAuth();

  function logOut() {
    setCurrentUser();
    localStorage.removeItem("jwtToken");
  }

  return (
    <div className="flex justify-between container mx-auto my-4 p-4">
      <Link to="/" className="block cursor-pointer">
        Home
      </Link>
      {currentUser ? (
        <div>
          <button to="login" className="block cursor-pointer focus:outline-none" onClick={logOut}>
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-between">
          <Link to="/login" className="block cursor-pointer mx-4">
            LogIn
          </Link>
          <Link to="/create-account" className="block cursor-pointer mx-4">
            Registor
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
