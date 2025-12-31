import React, { useState } from "react";
import { useProjectStore } from "../../store/useProjectStore";
import { timeAgo } from "../../utils/timeAgo.js";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

export const ProjectTable = () => {
    const navigate = useNavigate();

    const [projectToDelete, setProjectToDelete] = useState(null);

    const {
        selectedProject,
        allProjects,
        projectMembers,
        deleteProject,
        getProjectById,
    } = useProjectStore();

    const handleProjectDelete = (projectId) => {
        deleteProject(projectId);
    };

    const projectsToRender = selectedProject
        ? [selectedProject]
        : allProjects || [];

    return (
        <div className="bg-slate-900/70 backdrop-blur border-2 border-slate-800 rounded-lg shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
            <table className="w-full table-fixed border-separate border-spacing-0">
                <thead>
                    <tr className="text-left text-white font-bold">
                        <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[20%]">
                            Project Name
                        </th>
                        <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[30%]">
                            Description
                        </th>
                        <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                            Members
                        </th>
                        <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                            Created By
                        </th>
                        <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[15%]">
                            Created At
                        </th>
                        <th className="sticky top-0 z-10 px-2 py-4 bg-slate-900 backdrop-blur-none isolate w-[10%]">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {projectsToRender.length === 0 ? (
                        <tr>
                            <td
                                colSpan={6}
                                className="text-center text-slate-400 py-4"
                            >
                                No projects found
                            </td>
                        </tr>
                    ) : (
                        projectsToRender.map((project) => (
                            <tr
                                className="text-slate-400 border-t border-slate-600 bg-slate-900/50 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-emerald-500/20"
                                key={project._id}
                            >
                                <td className="px-2 py-3 text-emerald-300 font-semibold cursor-pointer hover:underline hover:text-emerald-500">
                                    <Link
                                        to={`/getProject/${project._id}`}
                                        onClick={() => {
                                            getProjectById(project._id);
                                        }}
                                    >
                                        {project?.name}
                                    </Link>
                                </td>
                                <td
                                    className="px-2 py-3 truncate"
                                    title={project?.description}
                                >
                                    {project?.description}
                                </td>
                                <td className="px-2 py-3 text-center">
                                    {projectMembers[project._id] ?? "-"}
                                </td>
                                <td className="px-2 py-3">
                                    {project?.createdBy.fullname}
                                </td>
                                <td className="px-2 py-3 truncate">
                                    {timeAgo(project?.createdAt)}
                                </td>
                                <td className="px-2 py-3 flex gap-2">
                                    <Edit
                                        className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer"
                                        onClick={() =>
                                            navigate(
                                                `/editProject/${project._id}`
                                            )
                                        }
                                    />
                                    <Trash
                                        className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 cursor-pointer"
                                        onClick={() =>
                                            setProjectToDelete(project._id)
                                        }
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {projectToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-900 rounded-xl p-6 w-[90%] max-w-sm">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            Delete Project?
                        </h3>
                        <p className="text-sm text-slate-400 mb-4">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setProjectToDelete(null)}
                                className="px-4 py-2 rounded-lg bg-slate-700 text-white cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    handleProjectDelete(projectToDelete);
                                    projectToDelete(null);
                                }}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
