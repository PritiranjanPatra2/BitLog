import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import toast from "react-hot-toast";

function Login() {
  const {
    setShowUserLogin,
    fetchBlogs,
    setUser,
    fetchUser,
    axios,
    navigate,
    fetchAllUser,
  } = useAppContext();
  
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading(
      state === "register" ? "Creating account..." : "Logging in..."
    );

    try {
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        bio,
        password,
      });

      if (data.success) {
        toast.success(data.message || "Success", { id: loadingToast });
        setUser(data.user);
        fetchAllUser();
        fetchBlogs();
        fetchUser();
        navigate("/");
        setShowUserLogin(false);
      } else {
        toast.error(data.message || "Something went wrong", { id: loadingToast });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Login failed", {
        id: loadingToast,
      });
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-black">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
              type="text"
              required
            />
            <p>Bio</p>
            <input
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-black cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-black cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        <button className="bg-black hover:bg-black-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
