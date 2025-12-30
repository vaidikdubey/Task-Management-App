import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import {
    FolderKanbanIcon,
    StickyNoteIcon,
    NotepadText,
    List,
    NotebookPenIcon,
} from "lucide-react";

export function SideBar() {
    const navigate = useNavigate();

    const { authUser } = useAuthStore();

    const handleLogoClick = () => {
        authUser
            ? navigate("/", { replace: true })
            : navigate("/login", { replace: true });
    };

    return (
        <div>
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
                <p></p>
                <Link
                    to={"/createProjects"}
                    className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-xl px-5 py-4 hover:bg-emerald-800/20 hover:rounded-2xl"
                >
                    <FolderKanbanIcon /> New Project
                </Link>
                <Link
                    to={"/createTasks"}
                    className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-xl px-5 py-4 hover:bg-emerald-800/20 hover:rounded-2xl"
                >
                    <StickyNoteIcon /> New Tasks
                </Link>
                <Link
                    to={"/createNotes"}
                    className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-xl px-5 py-4 hover:bg-emerald-800/20 hover:rounded-2xl"
                >
                    <NotebookPenIcon /> New Notes
                </Link>
                <Link
                    to={"/allTasks"}
                    className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-xl px-5 py-4 hover:bg-emerald-800/20 hover:rounded-2xl"
                >
                    <List /> All Tasks
                </Link>
                <Link
                    to={"/allNotes"}
                    className="flex items-center justify-start gap-4 font-bold text-emerald-400 text-xl px-5 py-4 hover:bg-emerald-800/20 hover:rounded-2xl"
                >
                    <NotepadText /> All Notes
                </Link>
            </div>
        </div>
    );
}
