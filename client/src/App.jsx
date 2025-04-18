import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useAppContext } from "./contexts/AppContext";
import AddPost from "./components/AddPost";
import Contact from "./components/Contact";
import UserProfile from "./components/UserProfile";
import SinglePost from "./components/SinglePost";

function App() {
  const { user } = useAppContext();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {user && <Route path="/create" element={<AddPost />} />}
        <Route path="/contact" element={<Contact />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/post/:id" element ={<SinglePost/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
