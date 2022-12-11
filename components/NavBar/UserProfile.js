import React from "react";
import { useSelector } from "react-redux";

function UserProfile() {
    const user = useSelector(state => state.account.user)
    // The page is used for display account information.
  return (
    <div className="flex flex-col h-full w-full justify-center items-center space-y-10">
      <span className="text-[48px] font-bold tracking-widest">
        WELCOME TO QUIKEAT
      </span>
      <div className="grid grid-cols-2 place-content-center text-[36px]">
        <span>Email:</span>
        <span>{user.email}</span>
        <span>Password:</span>
        <span>********</span>
        <span>Bussiness Name:</span>
        <span>{user.nameBussiness}</span>
      </div>
    </div>
  );
}

export default UserProfile;
