import React from "react";
import Testmonial from "../components/Testmonial";
import BlogCard from "../components/BlogCard";
import UserList from "../components/UserList";
import { useAppContext } from "../contexts/AppContext";

function Home() {
  const { blogs } = useAppContext();

  return (
    <>
      <div className="px-4 py-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left - User List */}
          <div className="w-full lg:w-[20%] lg:sticky lg:top-20 lg:h-[80vh] overflow-y-auto mt-16">

            <UserList />
          </div>

          {/* Center - Blog Feed */}
          <div className="w-full lg:w-[60%] mt-16 flex justify-center items-center">
            <div className="flex flex-col gap-6 w-full max-w-2xl">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <BlogCard key={blog._id} post={blog} />
                ))
              ) : (
                <p className="text-center text-gray-500">No blogs available</p>
              )}
            </div>
          </div>

          {/* Right - Advertisement */}
          <div className="w-full lg:w-[20%] sticky top-20 h-[80vh] overflow-y-auto">
            <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4 text-center shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Advertisement</h3>
              <p className="text-sm text-gray-500">Place your ad here!</p>
              <div className="mt-4">
                <img
                  src="https://2.imimg.com/data2/IS/TN/MY-2561564/advertisement-designing-services-500x500.jpg"
                  alt="Ad Banner"
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testmonial />
    </>
  );
}

export default Home;
