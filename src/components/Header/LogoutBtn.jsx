import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";


function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return <button
  className='inline-bock px-6 py-2 duration-200 text-[#94A3B8] hover:bg-[#64748B] hover:text-[#1E293B] rounded-full'
  onClick={logoutHandler}
  >Logout</button>;
}

export default LogoutBtn;
