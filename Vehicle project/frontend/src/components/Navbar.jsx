import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <nav className="...">
      {/* ...your nav links... */}
      {currentUser ? (
        <button
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.reload();
          }}
          className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-xl ml-6"
        >
          Log Out
        </button>
      ) : (
        <Link
          to="/Login"
          className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-xl ml-6">
          Create Account
        </Link>
      )}
    </nav>
  );
};

export default Navbar;