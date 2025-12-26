import React, { useState } from "react";
import { useProjectStore } from "../../store/useProjectStore.js";
import { KanbanBoard } from "../projects/KanbanBoard.jsx";
import { ListView } from "../projects/ListView.jsx";
import { MembersView } from "../projects/MembersView.jsx";
import { NotesView } from "../projects/NotesView.jsx";
import { ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const ProjectPage = () => {
    const { project } = useProjectStore();

    const [form, setForm] = useState({ name: "" });

    const [activeView, setActiveView] = useState("kanban");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="h-screen w-4xl py-5 flex flex-col items-start justify-between">
            <Link to={"/"}>
                <ArrowBigLeft className="absolute left-5 text-emerald-400 cursor-pointer hover:text-sky-500 hover:scale-110" />
            </Link>
            <h1 className="text-3xl font-bold text-center w-full text-emerald-400 text-shadow-lg">
                {project.name}
            </h1>

            <div className="h-full mt-2 w-full">
                <ul className="flex items-start gap-4">
                    <li
                        onClick={() => setActiveView("kanban")}
                        className={`cursor-pointer
                        ${
                            activeView === "kanban"
                                ? "text-sky-500 underline"
                                : "hover:text-emerald-400"
                        }
                        `}
                    >
                        Kanban Board
                    </li>
                    <li
                        onClick={() => setActiveView("list")}
                        className={`cursor-pointer
                        ${
                            activeView === "list"
                                ? "text-sky-500 underline"
                                : "hover:text-emerald-400"
                        }
                        `}
                    >
                        List View
                    </li>
                    <li
                        onClick={() => setActiveView("members")}
                        className={`cursor-pointer
                        ${
                            activeView === "members"
                                ? "text-sky-500 underline"
                                : "hover:text-emerald-400"
                        }
                        `}
                    >
                        Members
                    </li>
                    <li
                        onClick={() => setActiveView("notes")}
                        className={`cursor-pointer
                        ${
                            activeView === "notes"
                                ? "text-sky-500 underline"
                                : "hover:text-emerald-400"
                        }
                        `}
                    >
                        Notes
                    </li>
                </ul>

                <div className="flex items-center justify-center py-4">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="New Task..."
                        className="w-fit px-2 py-2 bg-slate-800/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-lg font-medium   focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-300"
                    />
                    <button className="mx-2 h-10 w-20 md:w-30 bg-linear-to-r from-emerald-500 to-teal-400 px-2 py-2 rounded-xl text-black font-bold text-sm md:text-md cursor-pointer hover:shadow hover:shadow-emerald-500 hover:transition-all hover:duration-300 hover:ease-in-out active:shadow active:shadow-emerald-500 transform active:translate-y-1 active:scale-95 transition-all duration-100">
                        + Add Task
                    </button>
                </div>

                <div className="w-full">
                    {activeView === "kanban" && <KanbanBoard />}
                    {activeView === "list" && <ListView />}
                    {activeView === "members" && <MembersView />}
                    {activeView === "notes" && <NotesView />}
                </div>
            </div>
        </div>
    );
};
