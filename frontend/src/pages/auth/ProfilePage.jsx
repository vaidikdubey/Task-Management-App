import React, { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { CircleCheck, CircleX, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useTaskStore } from "../../store/useTaskStore.js";
import { useProjectStore } from "../../store/useProjectStore.js";

export function ProfilePage() {
    const { authUser } = useAuthStore();

    const {
        completedTasksByProject,
        getCompletedTasksCount,
        isGettingCompletedTasks,
    } = useTaskStore();

    const { allProjects } = useProjectStore();

    useEffect(() => {
        getCompletedTasksCount();
    }, []);

    const totalCompletedTasks = () => {
        const count = Object.values(completedTasksByProject?.data ?? {}).reduce(
            (sum, agg) => sum + agg,
            0
        );

        return count;
    };

    return (
        <div className="h-screen w-screen bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 ">
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

                {/* Stats */}
                <div className="flex items-center justify-center md:grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-6 text-center">
                        <p className="text-2xl md:text-3xl font-black text-emerald-400">
                            {!isGettingCompletedTasks
                                ? totalCompletedTasks()
                                : "Fetching..."}
                        </p>
                        <p className="text-slate-400">Tasks Completed</p>
                    </div>
                    <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-6 text-center">
                        <p className="text-2xl md:text-3xl font-black text-teal-300">
                            {allProjects.length}
                        </p>
                        <p className="text-slate-400">Active Projects</p>
                    </div>
                </div>
            </div>

            <p className="text-center text-xs md:text-xl p-4 md:p-2">
                <Link
                    className="text-emerald-300 font-bold text-xs md:text-xl"
                    to={"/"}
                >
                    ← Back to Dashboard
                </Link>
            </p>
        </div>
    );
}

// avatar: {url: 'https://placehold.co/600x400', localpath: '', _id: '69383a24923b5cb340ee847d'}
// email: "test-user@gmail.com"
// emailVerified: true
// fullname: "Test User 1"
// username: "test_user_1"
