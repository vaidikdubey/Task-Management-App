import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjectStore } from "../../store/useProjectStore.js";

export const MembersView = () => {
    const { projectId } = useParams();

    const { getAllProjectMembers, allProjectMembers } = useProjectStore();

    useEffect(() => {
        getAllProjectMembers(projectId);
    }, [projectId]);

    // const userObjectArray = Object.values(allProjectMembers).map(
    //     (inside) => inside[0].user
    // );

    const userObjectArray = allProjectMembers.map((member) => member.user);

    const allMembers = allProjectMembers?.length;

    return (
        <div className="flex justify-center items-center flex-col gap-5 my-5">
            {/* Total members */}
            <h3 className="text-xl">
                Total Members:{" "}
                <span className="font-bold text-2xl text-emerald-400">
                    {allMembers}
                </span>
            </h3>

            {/* Detailed members view table */}
            <div className="bg-slate-900/70 backdrop-blur border-2 border-slate-800 rounded-lg shadow-lg  max-h-[calc(100vh-12rem)] overflow-y-auto no-scrollbar grid grid-cols-3 gap-5 w-full p-5">
                {userObjectArray.map((user) => (
                    <div
                        className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-3xl p-8 flex items-center gap-6 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer"
                        key={user._id}
                    >
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">
                                {user.fullname}
                            </h3>
                            <p className="text-emerald-300 font-medium">
                                @{user.username}
                            </p>
                        </div>
                        <div className="text-right">
                            {user.avatar.url ===
                                `https://placehold.co/600x400` &&
                            user.avatar.localpath === "" ? (
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
                                user?.data?.data?.avatar?.url
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
