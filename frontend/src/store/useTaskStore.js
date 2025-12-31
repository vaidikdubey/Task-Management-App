import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTaskStore = create((set) => ({
    isGettingCompletedTasks: false,
    tasksByProject: [],
    completedTasksByProject: {},
    allTasksForUser: {},
    creatingTask: false,
    updatingTask: false,
    taskById: {},

    getTasksByProject: async (projectId) => {
        try {
            const res = await axiosInstance.get(`/task/getAll/${projectId}`);

            set({ tasksByProject: res.data });
        } catch (error) {
            console.error("Error fetching tasks: ", error);
            toast.error("Error fetching tasks");
        }
    },

    getTaskById: async (taskId) => {
        try {
            const res = await axiosInstance.get(`/task/getTask/${taskId}`);

            set({ taskById: res.data.data });
        } catch (error) {
            console.error("Error fetching task: ", error);
            toast.error("Error fetching task");
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

    updateTask: async (projectId, taskId, updates) => {
        set({ updatingTask: true });

        try {
            const res = await axiosInstance.patch(
                `/task/${projectId}/update/${taskId}`,
                updates
            );

            toast.success(res.message || "Task updated successfully", {
                duration: 1 * 1000,
            });
        } catch (error) {
            console.error("Error updating task: ", error);
            toast.error("Error updating task");
        } finally {
            set({ updatingTask: false });
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
            const res = await axiosInstance.post(
                `/task/create/${formData.projectId}`,
                formData
            );

            toast.success(res.message || "Task created successfully");
        } catch (error) {
            console.error("Error creating task: ", error);
            toast.error("Error creating task");
        } finally {
            set({ creatingTask: false });
        }
    },

    deleteTask: async (projectId, taskId) => {
        try {
            const res = await axiosInstance.delete(
                `/task/${projectId}/delete/${taskId}`
            );

            toast.success(res.message || "Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task: ", error);
            toast.error("Error deleting task");
        }
    },
}));
