import React from "react";
import { useAppContext } from "../contexts/AppContext";

function UserList() {
  const { allUser,navigate } = useAppContext();

  // Generate a random avatar URL based on index
  const getRandomAvatar = (index) => `https://i.pravatar.cc/150?img=${(index % 70) + 1}`;

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Users</h2>
      <ul className="space-y-3">
        {allUser.map((user, index) => (
          <li key={user._id} onClick={()=>{navigate(`/user/${user._id}`)}} className=" cursor-pointer flex items-center gap-3">
            <img
              src={getRandomAvatar(index)}
              alt={user.name}
              className="w-10 h-10 rounded-full border"
            />
            <span className="text-sm font-medium cursor-pointer text-gray-800">
              {user.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
