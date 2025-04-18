import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { navigate, user,fetchBlogs,fetchUser, setUser, axios } = useAppContext();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white shadow-md">
      {/* Logo */}
      <Link to="/">
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-black hover:bg-gray transition text-white font-bold rounded flex items-center justify-center text-lg">
            B
          </div>
          <span className="text-xl font-semibold text-black hover:text-black">
            Bitlog
          </span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/" className="text-gray-700 hover:text-black">
          Home
        </Link>
        <Link to="/" className="text-gray-700 hover:text-black">
          Blogs
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-black">
          Contact
        </Link>

        {/* Add Post Button */}
        {user && (
          <button
            onClick={() => navigate("/create")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm"
          >
            Add Post
          </button>
        )}

        {/* Search bar */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search BlogPosts"
          />
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </div>

        {/* User or Login Button */}
        {user ? (
          <div className="relative group">
            <div
              title={user.name}
              className="cursor-pointer w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold"
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-150">
              <button
                onClick={() => navigate(`/user/${user._id}`)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                My Blogs
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-6 py-2 bg-black hover:bg-gray transition text-white rounded-full text-sm"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
        className="sm:hidden"
      >
        {open ? (
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to="/" className="block text-gray-700 hover:text-black">
          Home
        </Link>
        <Link to="/" className="block text-gray-700 hover:text-black">
          Blogs
        </Link>
        <Link to="/contact" className="block text-gray-700 hover:text-black">
          Contact
        </Link>

        {/* Add Post - Mobile */}
        {user && (
          <button
            onClick={() => navigate("/create")}
            className="px-4 py-2 text-left w-full text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Add Post
          </button>
        )}

        {user ? (
          <>
            <div
              title={user.name}
              className="cursor-pointer w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold"
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={() => navigate(`user/${user._id}`)}
              className="mt-2 px-4 py-2 text-left w-full text-gray-700 hover:bg-gray-100"
            >
              My Blogs
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-left w-full text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-6 py-2 mt-2 bg-black hover:bg-gray transition text-white rounded-full text-sm"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
