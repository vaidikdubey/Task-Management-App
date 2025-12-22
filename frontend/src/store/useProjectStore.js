import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProjectStore = create((set, get) => ({
    isGettingProjects: false,
    allProjects: [],
    selectedProject: null,
    allProjectMembers: [],
    projectMembers: {},
    hasShownAllMemberToast: false,
    hasShownAllProjectToast: false,

    getAllProjects: async () => {
        set({ isGettingProjects: true });

        try {
            const res = await axiosInstance.get("/project/getAll");

            set({ allProjects: res.data.data });
            if (!get().hasShownAllProjectToast) {
                toast.success(res.message || "Projects fetched successfully");
                set({ hasShownAllProjectToast: true });
            }
        } catch (error) {
            console.error("Error fetching projects: ", error);
            toast.error("Error fetching projects");
        } finally {
            set({ isGettingProjects: false });
        }
    },

    setSelectedProject: (project) => {
        set({ selectedProject: project });
    },

    getAllProjectMembers: async (projectId) => {
        if (!projectId) return;

        try {
            const res = await axiosInstance.get(
                `/project/member/getAll/${projectId}`
            );

            set((state) => ({
                projectMembers: {
                    ...state.projectMembers,
                    [projectId]: res.data.data.length
                }
            }))

            set({ allProjectMembers: res.data.data });
            if (!get().hasShownMemberToast) {
                toast.success(
                    res.message || "Project members fetched successfully"
                )
                set({ hasShownMemberToast: true });
            }
        } catch (error) {
            console.error("Error fetching project members: ", error);
            toast.error("Error fetching project members");
        }
    },

    deleteProject: async (projectId) => {
        try {
            const res = await axiosInstance.delete(`/project/delete/${projectId}`)

            toast.success(res.message || "Project deleted successfull");
        } catch (error) {
            console.error("Error deleting project: ", error);
            toast.error("Error deleting project");
        }
    }
}));
