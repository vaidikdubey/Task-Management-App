import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProjectStore = create((set) => ({
    isGettingProjects: false,
    allProjects: { data: [] },

    getAllProjects: async () => {
        set({ isGettingProjects: true });

        try {
            const res = await axiosInstance.get("/project/getAll");

            set({ allProjects: res.data.data });
            toast.success(res.message || "Projects fetched successfully");
        } catch (error) {
            console.error("Error fetching projects: ", error);
            toast.error("Error fetching projects");
        } finally {
            set({ isGettingProjects: false });
        }
    },
}));
