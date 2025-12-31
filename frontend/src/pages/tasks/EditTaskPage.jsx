import React, { useEffect, useState } from "react";
import { useTaskStore } from "../../store/useTaskStore.js";
import { useProjectStore } from "../../store/useProjectStore.js";
import { Link, useParams } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

export const EditTaskPage = () => {
    const { projectId, taskId } = useParams();

    const { updatingTask, updateTask, getTaskById, taskById } = useTaskStore();

    const { allProjectMembers, getAllProjectMembers } = useProjectStore();

    const [form, setForm] = useState({
        title: "",
        description: "",
        assignedTo: "",
        assignedBy: "",
        status: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTask(projectId, taskId, form);
    };

    useEffect(() => {
        getAllProjectMembers(projectId);
    }, [projectId]);

    useEffect(() => {
        getTaskById(taskId);
    }, [taskId]);

    return (
        <>
            <Link to={"/"}>
                <ArrowBigLeft className="absolute left-8 top-8 text-emerald-400 cursor-pointer hover:text-sky-500 hover:scale-110" />
            </Link>
            {/* Create Project */}
            <div className="p-6 w-full h-full flex flex-col gap-5 justify-center items-center">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl shadow-emerald-500/20 p-5">
                    <p className="text-xl font-semibold text-emerald-400 text-center mb-5">
                        Update task details
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 p-2 border border-slate-500 m-4"
                    >
                        <div className="flex flex-col gap-2 px-2">
                            <label htmlFor="title" className="text-slate-300">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder={taskById?.title}
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
                                placeholder={taskById?.description}
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
                                    {taskById?.assignedTo?.fullname}
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
                            <label
                                htmlFor="assigned"
                                className="text-slate-300"
                            >
                                Assigned By
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
                                    {taskById?.assignedBy?.fullname}
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
                                    --{taskById?.status}--
                                </option>

                                <option value="todo" className="text-red-500">
                                    TODO
                                </option>
                                <option
                                    value="in_progress"
                                    className="text-yellow-500"
                                >
                                    IN PROGRESS
                                </option>
                                <option value="done" className="text-green-500">
                                    DONE
                                </option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="p-5 mx-auto bg-linear-to-r from-emerald-500 to-teal-400 text-black font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:-translate-y-1 transform transition-all duration-300 flex items-center gap-4 cursor-pointer"
                            disabled={updatingTask}
                        >
                            {updatingTask ? "Updating Task..." : "Update task"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
