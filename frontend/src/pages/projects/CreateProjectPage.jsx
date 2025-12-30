import React, { useState } from "react";
import { ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjectStore } from "../../store/useProjectStore.js";

export function CreateProjectPage() {
    const [form, setForm] = useState({ name: "", description: "" });

    const { creatingProject, createProject } = useProjectStore();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createProject(form);
    };

    return (
        <>
            <Link to={"/"}>
                <ArrowBigLeft className="absolute left-8 top-8 text-emerald-400 cursor-pointer hover:text-sky-500 hover:scale-110" />
            </Link>
            <div className="h-screen w-screen flex flex-col items-center overflow-y-hidden relative max-w-6xl">
                <h1 className="text-4xl font-bold text-emerald-400 mt-10">
                    Create new project
                </h1>
                {/* Create Project */}
                <div className="p-6 w-full h-full flex flex-col gap-5 justify-center items-center">
                    <div class="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-500/20 p-5">
                        <p className="text-xl font-semibold text-emerald-400 text-center mb-5">
                            Enter project details
                        </p>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5 p-2 border border-slate-500 m-4"
                        >
                            <div className="flex flex-col gap-2 px-2">
                                <label htmlFor="name">Project Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Website Redesign, Mobile App Launch, Marketing Campaign"
                                    className="border border-slate-500 px-2 h-10 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>
                            <div className="flex flex-col gap-2 px-2">
                                <label htmlFor="desc">Description</label>
                                <textarea
                                    type="text"
                                    id="desc"
                                    name="description"
                                    rows="4"
                                    cols="50"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="What is this project about? Goals, scope, or any notes..."
                                    className="border border-slate-500 p-2 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="p-5 mx-auto bg-linear-to-r from-emerald-500 to-teal-400 text-black font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:-translate-y-1 transform transition-all duration-300 flex items-center gap-4 cursor-pointer"
                                disabled={creatingProject}
                            >
                                {creatingProject
                                    ? "Creating Project..."
                                    : "Create new project"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
