import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { FolderKanbanIcon, StickyNoteIcon, NotepadText, Sidebar } from "lucide-react";

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
        </div>
    );
}
