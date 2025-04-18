import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKENDURL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- loading state
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [allUser,setAllUser]=useState([]);
  const [blogs,setBlogs]=useState([]);
  const [search,setSearch]=useState("");

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/isauth");
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const fetchAllUser=async ()=>{
    try {
      const {data}=await axios.get("/api/user/allUser");
      if(data.success){
        setAllUser(data.users);
      }else{
        setAllUser([]);
      }
    } catch (error) {
      setAllUser([]);
      
    }
  }
  const fetchBlogs =async ()=>{
    try {
      const {data}=await axios.get("/api/user/post/allPosts");
      if(data.success){
        console.log(data);
        setBlogs(data.data)
        
      }else{
        setBlogs([]);
      }
    } catch (error) {
      toast.error(error.message)
      setBlogs([])
      
    }
  }

  useEffect(() => {
    fetchUser();
    fetchAllUser();
    fetchBlogs();
  }, []);

  const value = {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    axios,
    loading,
    allUser,
    setAllUser,
    blogs,
    setBlogs,
    search,
    setSearch,
    fetchBlogs,
    fetchAllUser,
    fetchUser
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
