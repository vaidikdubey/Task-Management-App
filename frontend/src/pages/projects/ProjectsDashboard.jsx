import React from "react";
import { Navbar } from "../dashboard/Navbar.jsx";
import { ProjectTable } from "./ProjectTable.jsx";
import { ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function ProjectDashboard() {
    return (
        <>
            <Link to={"/"}>
                <ArrowBigLeft className="absolute left-8 top-8 text-emerald-400 cursor-pointer hover:text-sky-500 hover:scale-110" />
            </Link>
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
        </>
    );
}
