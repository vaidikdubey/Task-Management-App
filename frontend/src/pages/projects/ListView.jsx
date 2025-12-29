import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTaskStore } from "../../store/useTaskStore";
import { timeAgo } from "../../utils/timeAgo.js";

export const ListView = () => {
    const STATUS_ORDER = {
        todo: 1,
        in_progress: 2,
        done: 3,
    };

    const { projectId } = useParams();

    const { tasksByProject, getTasksByProject } = useTaskStore();

    const [statusSort, setStatusSort] = useState(
        () => localStorage.getItem(`preferredSort:${projectId}`) || "none"
    );

    const sortedTasks = useMemo(() => {
        if (statusSort === "none") return tasksByProject?.data || [];

        return [...(tasksByProject?.data || [])].sort((a, b) => {
            const diff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
            return statusSort === "asc" ? diff : -diff;
        });
    }, [tasksByProject?.data, statusSort]);

    useEffect(() => {
        getTasksByProject(projectId);
    }, [projectId]);

    useEffect(() => {
        if (!projectId) return;

        localStorage.setItem(`preferredSort:${projectId}`, statusSort);
    }, [statusSort, projectId]);

    return (
        <>
            <div className="flex items-center justify-end px-4 pb-2 border-b border-slate-800">
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
            <div className="bg-slate-900/70 backdrop-blur border-2 border-slate-800 rounded-lg shadow-lg max-h-[calc(100vh-14rem)] overflow-y-auto no-scrollbar">
                <table className="w-full table-fixed border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left text-white font-bold">
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[25%]">
                                Project Name
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[30%]">
                                Description
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                                Assigned By
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                                Assigned To
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                                Created At
                            </th>
                            <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasksByProject?.data?.length === 0 ? (
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
                                    <td className="px-2 py-3 text-center">
                                        {task?.assignedBy.fullname}
                                    </td>
                                    <td className="px-2 py-3">
                                        {task?.assignedTo.fullname}
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
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
