import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Search, Bell } from "lucide-react";

export const Navbar = () => {
  const { authUser } = useAuth();
  
  const toggleMenu = () => {
    
  }

    return (
        <nav className="sticky w-2xl mx-auto bg-slate-950/90 backdrop-blur-xl mt-2 p-2 px-4 rounded-[999px]">
            <ul className="flex items-center justify-between">
                <li>
                    Welcome,{" "}
                    <span className="bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                        {authUser.data.username}
                    </span>
                </li>
                <li className="flex gap-4 items-center">
                    <Search className="cursor-pointer" />
                    <Bell className="cursor-pointer" />
                    <div className="cursor-pointer" onClick={toggleMenu}>
                        {authUser.data.avatar ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                viewBox="0 0 40 40"
                            >
                                <circle cx="20" cy="20" r="20" fill="#e5e7eb" />
                                <circle cx="20" cy="14" r="6" fill="#9ca3af" />
                                <path
                                    d="M10 30c0-5 4-9 10-9s10 4 10 9"
                                    fill="#9ca3af"
                                />
                            </svg>
                        ) : (
                            authUser.data.avatar
                        )}
            </div>
                </li>
            </ul>
        </nav>
    );
};
