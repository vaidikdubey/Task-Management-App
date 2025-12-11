import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, FolderKanbanIcon, StickyNoteIcon } from "lucide-react";

function DashboardPage() {
    return (
        <div className="flex items-center justify-center h-screen w-screen p-10">
            <aside className="absolute left-0 p-2 border-r border-slate-800 h-full flex  flex-col">
                <div className="p-8 text-center border-b border-slate-800">
                    <h1 className="text-4xl bg-linear-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent font-bold p-2">
                        Manago
                    </h1>
                    <p className="text-emerald-400 text-md font-medium">
                        Dashboard
                    </p>
                </div>

                <nav className="flex-1 w-full p-4 space-y-3">
                    <Link
                        to={"/"}
                        className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-2xl px-5 py-4"
                    >
                        <HomeIcon /> Dashboard
                    </Link>
                    <Link
                        to={"/projects"}
                        className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-2xl px-5 py-4"
                    >
                        <FolderKanbanIcon /> Projects
                    </Link>
                    <Link
                        to={"/tasks"}
                        className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-2xl px-5 py-4"
                    >
                        <StickyNoteIcon /> Tasks
                    </Link>
                </nav>
            </aside>
        </div>
    );
}

export default DashboardPage;
