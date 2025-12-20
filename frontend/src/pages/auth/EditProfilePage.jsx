import React from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { CircleCheck, CircleX, Edit } from "lucide-react";
import { Link } from "react-router-dom";

export function EditProfilePage() {
    const { authUser } = useAuthStore();

    return (
        <div className="h-screen w-screen bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950 p-8">
            <div className="max-w-2xl xl:max-w-3xl mx-auto">
                <div>
                    {/* Profile Card */}
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-500/20 p-10 text-center">
                        {/* Avatar */}
                        <div className="mb-3 flex items-center justify-center">
                            <div className="rounded-full ring-4 ring-emerald-500 object-cover">
                                {authUser.data.data.avatar.url ===
                                    `https://placehold.co/600x400` &&
                                authUser.data.data.avatar.localpath === "" ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100"
                                        height="100"
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
                        </div>
                        {/* FullName */}
                        <h1 className="text-4xl font-black text-white mb-2">
                            {authUser.data.data.fullname}
                        </h1>

                        {/* UserName */}
                        <p className="text-2xl text-emerald-400 font-bold mb-8">
                            @{authUser.data.data.username}
                        </p>

                        {/* Email */}
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-center gap-3">
                                <i className="fas fa-envelope text-slate-400"></i>
                                <span className="text-lg text-slate-300">
                                    test-user@gmail.com
                                </span>
                                {authUser.data.data.emailVerified ? (
                                    <CircleCheck className="text-emerald-400 ml-1" />
                                ) : (
                                    <CircleX className="text-red-400 ml-1" />
                                )}
                            </div>
                        </div>

                        <Link
                            to={"/edit-profile"}
                            className="w-full bg-linear-to-r from-emerald-500 to-teal-400 text-black font-bold py-4 rounded-2xl hover:shadow-xl hover:shadow-emerald-500/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-xl"
                        >
                            Edit Profile <Edit />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}