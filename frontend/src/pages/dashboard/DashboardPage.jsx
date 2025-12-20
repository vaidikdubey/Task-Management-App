import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FolderKanbanIcon, StickyNoteIcon, NotepadText } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useProjectStore } from "../../store/useProjectStore.js";
import { timeAgo } from "../../utils/timeAgo.js";
import { Edit, Trash } from "lucide-react";

function DashboardPage() {
    const navigate = useNavigate();

    const { authUser } = useAuthStore();

    const {
        getAllProjects,
        selectedProject,
        allProjects,
        getAllProjectMembers,
        projectMembers,
    } = useProjectStore();

    useEffect(() => {
        getAllProjects();
    }, [getAllProjects]);

    const handleLogoClick = () => {
        authUser
            ? navigate("/", { replace: true })
            : navigate("/login", { replace: true });
    };

    useEffect(() => {
        if (!Array.isArray(allProjects)) return;

        allProjects.forEach((project) => {
            getAllProjectMembers(project._id);
        });
    }, [allProjects, getAllProjectMembers]);

    const projectsToRender = selectedProject
        ? [selectedProject]
        : allProjects || [];

    return (
        <>
            <aside className="absolute inset-0 justify-self-start p-2 border-r border-slate-800 h-screen flex flex-col">
                <div className="p-8 text-center border-b border-slate-800">
                    <h1
                        className="text-4xl bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent font-bold p-2 cursor-pointer"
                        onClick={handleLogoClick}
                    >
                        Manago
                    </h1>
                    <p className="text-emerald-400 text-md font-medium cursor-pointer">
                        Dashboard
                    </p>
                </div>

                <div className="flex-1 w-full p-4 space-y-3">
                    <Link
                        to={"/projects"}
                        className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-2xl px-5 py-4 hover:bg-emerald-800/20 hover:rounded-2xl"
                    >
                        <FolderKanbanIcon /> Projects
                    </Link>
                    <Link
                        to={"/tasks"}
                        className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-2xl px-5 py-4 hover:bg-emerald-800/20 hover:rounded-2xl"
                    >
                        <StickyNoteIcon /> Tasks
                    </Link>
                    <Link
                        to={"/notes"}
                        className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-2xl px-5 py-4 hover:bg-emerald-800/20 hover:rounded-2xl"
                    >
                        <NotepadText /> Notes
                    </Link>
                </div>
            </aside>
            <main className="w-3xl h-full flex justify-center items-start mt-2">
                <div className="bg-slate-900/70 backdrop-blur border border-slate-800 p-2 rounded-lg shadow-lg">
                    <table className="w-full table-fixed border-collapse">
                        <thead>
                            <tr className="text-left text-white font-bold">
                                <th className="px-2 py-2 w-[20%]">
                                    Project Name
                                </th>
                                <th className="px-2 py-2 w-[30%]">
                                    Description
                                </th>
                                <th className="px-2 py-2 w-[15%]">Members</th>
                                <th className="px-2 py-2 w-[15%]">
                                    Created By
                                </th>
                                <th className="px-2 py-2 w-[15%]">
                                    Created At
                                </th>
                                <th className="px-2 py-2 w-[10%]">Actions</th>
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
                                        <td className="px-2 py-2 text-emerald-300 font-semibold">
                                            {project?.name}
                                        </td>
                                        <td
                                            className="px-2 py-2 truncate"
                                            title={project?.description}
                                        >
                                            {project?.description}
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            {projectMembers[project._id] ?? "-"}
                                        </td>
                                        <td className="px-2 py-2">
                                            {project?.createdBy.fullname}
                                        </td>
                                        <td className="px-2 py-2">
                                            {timeAgo(project?.createdAt)}
                                        </td>
                                        <td className="px-2 py-2 flex gap-2">
                                            <Edit className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer" />
                                            <Trash className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 cursor-pointer" />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}

export default DashboardPage;
