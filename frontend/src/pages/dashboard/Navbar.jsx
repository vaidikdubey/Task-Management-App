import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useProjectStore } from "../../store/useProjectStore.js";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { authUser, logout } = useAuthStore();

    const {
        isGettingProjects,
        allProjects,
        getAllProjects,
        selectedProject,
        setSelectedProject,
        getAllProjectMembers,
    } = useProjectStore();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
    const dropdownProjectRef = useRef(null);

    //Dropown Menu functionality
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => document.removeEventListener("click", handleClickOutside);
    });

    //Dropdown Project functionality
    useEffect(() => {
        const handleClickOutsideProject = (e) => {
            if (
                dropdownProjectRef.current &&
                !dropdownProjectRef.current.contains(e.target)
            ) {
                setIsProjectMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutsideProject);

        return () =>
            document.removeEventListener("click", handleClickOutsideProject);
    });

    const handleLogout = (e) => {
        e.preventDefault();
        logout();

        toast.success("Logout successful");
    };

    useEffect(() => {
        getAllProjects();
    }, [getAllProjects]);

    return (
        <nav className="absolute inset-x-0 top-0 w-2xl mx-auto bg-slate-950/90 backdrop-blur-xl mt-2 p-2 px-4 rounded-[999px]">
            <ul className="flex items-center justify-between">
                <li>
                    Welcome,{" "}
                    <span className="bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                        {authUser.data.data.username
                            ? authUser.data.data.username
                            : "Champ!"}
                    </span>
                </li>
                <li className="flex gap-4 items-center justify-center">
                    {/* Projects section */}
                    <div
                        className="flex gap-4 justify-center items-center relative"
                        ref={dropdownProjectRef}
                    >
                        <div
                            className="flex items-center justify-center gap-2 text-gray-300 bg-slate-600/50 p-2 rounded-xl cursor-pointer"
                            onClick={() =>
                                setIsProjectMenuOpen(!isProjectMenuOpen)
                            }
                        >
                            {isGettingProjects || allProjects?.length <= 0
                                ? "Fetching..."
                                : selectedProject?.name || (
                                      <span className="italic">
                                          Select Project...
                                      </span>
                                  )}
                            <div>
                                <svg
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 562.392 562.391"
                                >
                                    <g>
                                        <g>
                                            <path
                                                d="M123.89,262.141h314.604c19.027,0,17.467-31.347,15.496-47.039c-0.605-4.841-3.636-11.971-6.438-15.967L303.965,16.533
			c-12.577-22.044-32.968-22.044-45.551,0L114.845,199.111c-2.803,3.996-5.832,11.126-6.438,15.967
			C106.43,230.776,104.863,262.141,123.89,262.141z"
                                            />
                                            <path
                                                d="M114.845,363.274l143.569,182.584c12.577,22.044,32.968,22.044,45.551,0l143.587-182.609
			c2.804-3.996,5.826-11.119,6.438-15.967c1.971-15.691,3.531-47.038-15.496-47.038H123.89c-19.027,0-17.46,31.365-15.483,47.062
			C109.019,352.147,112.042,359.277,114.845,363.274z"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        {isProjectMenuOpen && (
                            <div className="absolute top-10 -right-25 -translate-x-1/2 mt-6 w-48 bg-slate-950/60 rounded-md shadow-lg border border-gray-200 z-50">
                                <div className="py-1">
                                    {allProjects.map((project, idx) => (
                                        <div key={project._id}>
                                            <Link
                                                onClick={() => {
                                                    setSelectedProject(project);
                                                    setIsProjectMenuOpen(false);
                                                    getAllProjectMembers(
                                                        project._id
                                                    );
                                                }}
                                                className="block px-3 py-2 text-sm text-white hover:bg-slate-800"
                                            >
                                                {idx + 1}. {project?.name}
                                            </Link>
                                            {idx < allProjects.length - 1 && (
                                                <hr className="my-1 border-gray-600" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Dropdown menu */}
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="cursor-pointer"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {authUser.data.data.avatar.url ===
                                `https://placehold.co/600x400` &&
                            authUser.data.data.avatar.localpath === "" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="50"
                                    viewBox="0 0 40 40"
                                >
                                    <circle
                                        cx="20"
                                        cy="20"
                                        r="20"
                                        fill="currentColor"
                                    />
                                    <circle
                                        cx="20"
                                        cy="14"
                                        r="6"
                                        fill="#9ca3af"
                                    />
                                    <path
                                        d="M10 30c0-5 4-9 10-9s10 4 10 9"
                                        fill="#9ca3af"
                                    />
                                </svg>
                            ) : (
                                authUser.data.data.avatar.url
                            )}
                        </div>
                        {isMenuOpen && (
                            <div className="absolute -left-10 -translate-x-1/2 mt-4 w-48 bg-slate-950/60 rounded-md shadow-lg border border-gray-200 z-50">
                                <div className="py-1">
                                    <Link
                                        to={"/profile"}
                                        className="block px-4 py-2 text-sm text-white hover:bg-slate-800"
                                    >
                                        View Profile
                                    </Link>
                                    <Link
                                        to={"/change-password"}
                                        className="block px-4 py-2 text-sm text-white hover:bg-slate-800"
                                    >
                                        Change Password
                                    </Link>
                                    <Link
                                        to={"/settings"}
                                        className="block px-4 py-2 text-sm text-white hover:bg-slate-800"
                                    >
                                        Account Settings
                                    </Link>
                                    <hr className="my-1 border-gray-200" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-700"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};
