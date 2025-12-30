import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore.js";
import { Link } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";
import { useProjectStore } from "../../store/useProjectStore.js";

export const CreateTaskPage = () => {
    const { creatingTask, createTask } = useTaskStore();

    const {
        allProjects,
        isGettingProjects,
        getAllProjects,
        allProjectMembers,
        getAllProjectMembers,
    } = useProjectStore();

    const [form, setForm] = useState({
        projectId: "",
        title: "",
        description: "",
        assignedTo: "",
        status: "",
        attachments: [],
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(form);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        setForm((prev) => ({
            ...prev,
            attachments: files,
        }));
    };

    useEffect(() => {
        getAllProjects();
    }, []);

    useEffect(() => {
        getAllProjectMembers(form.projectId);
    }, [form.projectId]);

    return (
        <>
            <Link to={"/"}>
                <ArrowBigLeft className="absolute left-8 top-8 text-emerald-400 cursor-pointer hover:text-sky-500 hover:scale-110" />
            </Link>
            {/* Create Project */}
            <div className="p-6 w-full h-full flex flex-col gap-5 justify-center items-center">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-500/20 p-5">
                    <p className="text-xl font-semibold text-emerald-400 text-center mb-5">
                        Enter new task details
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 p-2 border border-slate-500 m-4"
                    >
                        <div className="flex flex-col gap-2 px-2">
                            <label htmlFor="project" className="text-slate-300">
                                Associated Project
                            </label>
                            <select
                                id="project"
                                name="projectId"
                                value={form.projectId}
                                onChange={handleChange}
                                className="border border-slate-500 px-2 h-10 rounded-md bg-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 overflow-y-auto no-scrollbar"
                                disabled={isGettingProjects}
                                required
                            >
                                <option value="" className="text-slate-300">
                                    --Select project--
                                </option>

                                {allProjects?.map((project) => (
                                    <option
                                        key={project._id}
                                        value={project._id}
                                    >
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 px-2">
                            <label htmlFor="title" className="text-slate-300">
                                Task Name
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g., Website Redesign, Mobile App Launch, Marketing Campaign"
                                className="border border-slate-500 px-2 h-10 rounded-md focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 px-2">
                            <label htmlFor="desc" className="text-slate-300">
                                Description
                            </label>
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
                        <div className="flex flex-col gap-2 px-2">
                            <label
                                htmlFor="assigned"
                                className="text-slate-300"
                            >
                                Assigned To
                            </label>
                            <select
                                name="assignedTo"
                                id="assigned"
                                value={form.assignedTo}
                                onChange={handleChange}
                                className="border border-slate-500 px-2 h-10 rounded-md bg-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 overflow-y-auto no-scrollbar"
                                required
                            >
                                <option value="" className="text-slate-300">
                                    --Select User--
                                </option>

                                {allProjectMembers?.map((member) => (
                                    <option
                                        key={member.user._id}
                                        value={member.user._id}
                                        className="text-white"
                                    >
                                        {member.user.fullname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 px-2">
                            <label htmlFor="status" className="text-slate-300">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="border border-slate-500 px-2 h-10 rounded-md bg-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 overflow-y-auto no-scrollbar"
                                required
                            >
                                <option value="" className="text-slate-300">
                                    --Select status--
                                </option>

                                <option value="todo" className="text-red-500">
                                    PENDING
                                </option>
                                <option
                                    value="in_progress"
                                    className="text-yellow-500"
                                >
                                    ONGOING
                                </option>
                                <option value="done" className="text-green-500">
                                    FINISHED
                                </option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 px-2">
                            <label
                                htmlFor="attachments"
                                className="text-slate-300"
                            >
                                Attachments
                            </label>
                            <input
                                type="file"
                                id="attachments"
                                multiple
                                onChange={handleFileChange}
                                className="border border-slate-500 px-2 py-1 rounded-md bg-slate-900 text-slate-300 file:bg-slate-800 file:text-emerald-400 file:border-none file:px-3 file:py-1 file:rounded-md file:cursor-pointer file:mr-3"
                            />
                            {form.attachments.length > 0 && (
                                <p className="text-xs text-slate-400">
                                    {form.attachments.length} file(s) selected
                                </p>
                            )}
                            {form.attachments.length >= 5 && (
                                <span className="text-red-500 text-sm">
                                    Maximum 5 files allowed
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="p-5 mx-auto bg-linear-to-r from-emerald-500 to-teal-400 text-black font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:-translate-y-1 transform transition-all duration-300 flex items-center gap-4 cursor-pointer"
                            disabled={creatingTask}
                        >
                            {creatingTask
                                ? "Creating Task..."
                                : "Create new task"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
