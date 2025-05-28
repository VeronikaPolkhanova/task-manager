"use client";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";

import Button from "./ui/Button";

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogin = async () => {
    dispatch(logout());
  };

  return (
    <div className="p-6 w-full bg-blue-400 flex justify-between items-center">
      <div className="flex gap-0 flex-col">
        <p className="text-white font-bold text-2xl">{user?.name}</p>
        <p className="text-white">{user?.email}</p>
      </div>
      <Button
        className="w-fit border-1 border-white bg-transparent text-white hover:bg-white hover:text-blue-800"
        onClick={handleLogin}>
        Logout
      </Button>
    </div>
  );
};
export default Header;
