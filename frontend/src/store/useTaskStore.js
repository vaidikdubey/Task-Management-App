import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useTaskStore = create((set) => ({
    isGettingCompletedTasks: false,
    tasksByProject: {},
    completedTasksByProject: {},

    getTasksByProject: async (projectId) => {
        try {
            const res = await axiosInstance.get(`/task/getAll/${projectId}`);
            set((state) => ({
                tasksByProject: {
                    ...state.tasksByProject,
                    [projectId]: res.data,
                },
            }));
            toast.success(res.message || "Tasks fetched successfully");
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
}));
