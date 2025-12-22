import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";
import { useProjectStore } from "../../store/useProjectStore.js";
import { timeAgo } from "../../utils/timeAgo.js";
import { Edit, Trash } from "lucide-react";
import { SideBar } from "./SideBar.jsx";
import { Navbar } from "./Navbar.jsx";

function DashboardPage() {
    const { authUser } = useAuthStore();

    const { deleteProject } = useProjectStore();

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

    console.log(authUser.data.data);

    const handleProjectDelete = (projectId) => {
        deleteProject(projectId);
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
        <div className="h-screen w-screen flex overflow-y-hidden">
            {/* Sidebar */}
            <aside className="w-fit justify-self-start p-2 border-r border-slate-800 h-screen flex flex-col">
                <SideBar />
            </aside>

            {/* Right Side */}
            <div className="flex-1 flex flex-col items-center max-w-5xl px-6 pt-3">
                {/* Navbar */}
                <header className="h-16 flex items-center relative z-50">
                    <Navbar />
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 w-4xl h-full flex justify-center items-center mt-2">
                    <div className="bg-slate-900/70 backdrop-blur border-2 border-slate-800 rounded-lg shadow-lg  max-h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
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
                                            <td className="px-2 py-3 text-emerald-300 font-semibold cursor-pointer">
                                                <Link to={`/getProject/${project._id}`}>
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
                                                {projectMembers[project._id] ??
                                                    "-"}
                                            </td>
                                            <td className="px-2 py-3">
                                                {project?.createdBy.fullname}
                                            </td>
                                            <td className="px-2 py-3 truncate">
                                                {timeAgo(project?.createdAt)}
                                            </td>
                                            <td className="px-2 py-3 flex gap-2">
                                                <Edit className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 cursor-pointer" />
                                                <Trash
                                                    className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 cursor-pointer"
                                                    onClick={() =>
                                                        handleProjectDelete(
                                                            project._id
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardPage;
