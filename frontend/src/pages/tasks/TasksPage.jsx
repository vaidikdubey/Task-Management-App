import React, { useEffect, useMemo, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore.js";
import { timeAgo } from "../../utils/timeAgo.js";
import { ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const TasksPage = () => {
    const STATUS_ORDER = {
        todo: 1,
        in_progress: 2,
        done: 3,
    };

    const { allTasksForUser, getAllUserTasks } = useTaskStore();

    const [statusSort, setStatusSort] = useState(
        () => localStorage.getItem(`preferredTasksSort`) || "none"
    );

    useEffect(() => {
        getAllUserTasks();
        localStorage.setItem(`preferredTasksSort`, statusSort);
    }, [statusSort]);

    const sortedTasks = useMemo(() => {
        if (statusSort === "none") return allTasksForUser?.data || [];

        return [...(allTasksForUser?.data || [])].sort((a, b) => {
            const diff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
            return statusSort === "asc" ? diff : -diff;
        });
    }, [allTasksForUser?.data, statusSort]);

    return (
        <div className="flex flex-col p-10 justify-center items-start">
            <Link to={"/"}>
                <ArrowBigLeft className="absolute left-5 top-8 text-emerald-400 cursor-pointer hover:text-sky-500 hover:scale-110" />
            </Link>
            <h1 className="text-3xl font-bold text-center w-full text-emerald-400 text-shadow-lg">
                All Tasks
            </h1>
            <div className="flex items-center justify-start px-11 pb-2">
                <select
                    value={statusSort}
                    onChange={(e) => setStatusSort(e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-slate-300 text-sm px-4 py-1.5 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                    <option value="none">--None--</option>
                    <option value="asc">Todo → Done</option>
                    <option value="desc">Done → Todo</option>
                </select>
            </div>
            <div className="my-3 w-full">
                <ul className="flex justify-around items-center gap-5">
                    <li className="text-slate-300">
                        TOTAL:{" "}
                        <span className="text-sky-500 font-bold">
                            {allTasksForUser?.data?.length}
                        </span>
                    </li>
                    <li className="text-slate-300">
                        PENDING:{" "}
                        <span className="text-red-500 font-bold">
                            {
                                allTasksForUser?.data?.filter(
                                    (task) => task.status === "todo"
                                ).length
                            }
                        </span>
                    </li>
                    <li className="text-slate-300">
                        ONGOING:{" "}
                        <span className="text-yellow-500 font-bold">
                            {
                                allTasksForUser?.data?.filter(
                                    (task) => task.status === "in_progress"
                                ).length
                            }
                        </span>
                    </li>
                    <li className="text-slate-300">
                        FINISHED:{" "}
                        <span className="text-green-500 font-bold">
                            {
                                allTasksForUser?.data?.filter(
                                    (task) => task.status === "done"
                                ).length
                            }
                        </span>
                    </li>
                </ul>
            </div>
            <div className="bg-slate-900/70 backdrop-blur border-2 border-slate-800 rounded-lg shadow-lg max-h-[calc(100vh-14rem)] overflow-y-auto no-scrollbar max-w-full mx-10">
                <table className="w-full table-fixed border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left text-white font-bold">
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[20%]">
                                Title
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[30%]">
                                Description
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                                Project
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                                Assigned By
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                                Created At
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[10%]">
                                Status
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[10%]">
                                Completed
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {allTasksForUser?.data?.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="text-center text-slate-400 py-4"
                                >
                                    No projects found
                                </td>
                            </tr>
                        ) : (
                            sortedTasks.map((task) => (
                                <tr
                                    className={`text-slate-400 border-t border-slate-600 bg-slate-900/50 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-emerald-500/20
                              ${task?.status === "done" ? "bg-red-500" : ""}

                            `}
                                    key={task._id}
                                >
                                    <td className="px-2 py-3 text-emerald-300 font-semibold cursor-pointer hover:underline hover:text-emerald-500">
                                        {task?.title}
                                    </td>
                                    <td
                                        className="px-2 py-3 truncate"
                                        title={task?.description}
                                    >
                                        {task?.description}
                                    </td>
                                    <td className="px-2 py-3">
                                        {task?.project?.name
                                            ? task?.project?.name
                                            : "-"}
                                    </td>
                                    <td className="px-2 py-3">
                                        {task?.assignedBy?.fullname}
                                    </td>
                                    <td className="px-2 py-3 truncate">
                                        {timeAgo(task?.createdAt)}
                                    </td>
                                    <td className="px-2 py-3 text-justify">
                                        {task?.status === "todo" && (
                                            <span className="text-red-500 uppercase">
                                                PENDING
                                            </span>
                                        )}
                                        {task?.status === "in_progress" && (
                                            <span className="text-yellow-500 uppercase">
                                                ONGOING
                                            </span>
                                        )}
                                        {task?.status === "done" && (
                                            <span className="text-green-500 uppercase">
                                                FINISHED
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-2 py-3 text-center">
                                        <label className="inline-flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="finished"
                                                id="finished"
                                                className="peer hidden"
                                                checked={
                                                    task?.status === "done"
                                                        ? true
                                                        : false
                                                }
                                            />
                                            <span className="h-4 w-4 rounded border border-slate-600 bg-slate-900 flex items-center justify-center peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition">
                                                <svg
                                                    className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3"
                                                >
                                                    <path d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                        </label>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
