import React from "react";
import { Navbar } from "../dashboard/Navbar.jsx";
import { ProjectTable } from "./ProjectTable.jsx";

export function ProjectDashboard() {
    return (
        <div className="h-screen w-screen flex flex-col items-center overflow-y-hidden relative max-w-6xl">
            <div className="flex flex-col items-center max-w-5xl px-6 pt-3">
                <header className="h-16 flex items-center relative z-50">
                    <Navbar />
                </header>

                <div className="p-6 max-w-5xl h-full flex justify-center items-center mt-2">
                    <ProjectTable />
                </div>
            </div>
        </div>
    );
}
