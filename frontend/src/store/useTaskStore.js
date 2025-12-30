import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTaskStore = create((set) => ({
    isGettingCompletedTasks: false,
    tasksByProject: [],
    completedTasksByProject: {},
    allTasksForUser: {},
    creatingTask: false,

    getTasksByProject: async (projectId) => {
        try {
            const res = await axiosInstance.get(`/task/getAll/${projectId}`);

            set({ tasksByProject: res.data });
        } catch (error) {
            console.error("Error fetching tasks: ", error);
            toast.error("Error fetching tasks");
        }
    },

    getCompletedTasksCount: async () => {
        set({ isGettingCompletedTasks: true });
        try {
            const res = await axiosInstance.get("/task/completed-count");

            set({ completedTasksByProject: res.data });
            toast.success(res.message || "Task count fetched successfully");
        } catch (error) {
            console.error("Error fetching task count: ", error);
            toast.error("Error fetching task count");
        } finally {
            set({ isGettingCompletedTasks: false });
        }
    },

    updateTask: async (projectId, taskId, status) => {
        try {
            const res = await axiosInstance.patch(
                `/task/${projectId}/update/${taskId}`,
                { status }
            );

            toast.success(res.message || "Task updated successfully", {
                duration: 1 * 1000,
            });
        } catch (error) {
            console.error("Error updating task: ", error);
            toast.error("Error updating task");
        }
    },

    getAllUserTasks: async () => {
        try {
            const res = await axiosInstance.get("/task/getUserTasks");

            set({ allTasksForUser: res.data });

            toast.success(res.message || "User tasks fetched successfully");
        } catch (error) {
            console.error("Error fetching user tasks: ", error);
            toast.error("Error fetching user tasks");
        }
    },

    createTask: async (formData) => {
        set({ creatingTask: true });

        try {
            const res = await axiosInstance.post(`/task/create/${formData.projectId}`, formData);

            toast.success(res.message || "Task created successfully");
        } catch (error) {
            console.error("Error creating task: ", error);
            toast.error("Error creating task");
        }
        finally {
            set({ creatingTask: false });
        }
    }
}));
