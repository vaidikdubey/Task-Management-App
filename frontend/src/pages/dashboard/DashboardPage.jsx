import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProjectStore } from "../../store/useProjectStore.js";
import { Edit, Trash, MenuSquare } from "lucide-react";
import { SideBar } from "./SideBar.jsx";
import { Navbar } from "./Navbar.jsx";
import { ProjectTable } from "../projects/ProjectTable.jsx";

function DashboardPage() {
    const { getAllProjects, allProjects, getAllProjectMembers } =
        useProjectStore();

    useEffect(() => {
        getAllProjects();
    }, [getAllProjects]);

    useEffect(() => {
        if (!Array.isArray(allProjects)) return;

        allProjects.forEach((project) => {
            getAllProjectMembers(project._id);
        });
    }, [allProjects, getAllProjectMembers]);

    return (
        <div className="h-screen w-screen flex overflow-y-hidden relative">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-fit justify-self-start p-2 border-r border-slate-800 h-screen relative">
                <SideBar />
            </aside>

            {/* Right Side */}
            <div className="flex-1 lg:flex lg:flex-col items-center max-w-5xl px-6 pt-3">
                {/* Navbar */}
                <header className="h-16 flex items-center relative z-50">
                    <Navbar />
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6 w-4xl h-full flex justify-center items-center mt-2">
                    <ProjectTable />
                </main>
            </div>
        </div>
    );
}

export default DashboardPage;
