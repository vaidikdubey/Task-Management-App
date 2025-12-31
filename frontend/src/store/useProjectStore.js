import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProjectStore = create((set, get) => ({
    isGettingProjects: false,
    allProjects: [],
    selectedProject: null,
    allProjectMembers: {},
    projectMembers: {},
    hasShownAllMemberToast: false,
    hasShownAllProjectToast: false,
    project: {},
    creatingProject: false,
    editingProject: false,

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
                    [projectId]: res.data.data.length,
                },
            }));

            set({ allProjectMembers: res.data.data });
            if (!get().hasShownMemberToast) {
                toast.success(
                    res.message || "Project members fetched successfully"
                );
                set({ hasShownMemberToast: true });
            }
        } catch (error) {
            console.error("Error fetching project members: ", error);
            toast.error("Error fetching project members");
        }
    },

    deleteProject: async (projectId) => {
        try {
            const res = await axiosInstance.delete(
                `/project/delete/${projectId}`
            );

            toast.success(res.message || "Project deleted successfull");
        } catch (error) {
            console.error("Error deleting project: ", error);
            toast.error("Error deleting project");
        }
    },

    getProjectById: async (projectId) => {
        try {
            const res = await axiosInstance.get(
                `/project/getProject/${projectId}`
            );

            set({ project: res.data.data });
            toast.success(res.message || "Project found successfully");
        } catch (error) {
            console.error("Error fetching project: ", error);
            toast.error("Error fetching project");
        }
    },

    createProject: async (formData) => {
        set({ creatingProject: true });

        try {
            const res = await axiosInstance.post("/project/create", formData)

            toast.success(res.message || "Project created successfully")
        } catch (error) {
            console.error("Error creating project: ", error);
            toast.error("Error creating project");
        }
        finally {
            set({ creatingProject: false });
        }
    },

    editProject: async (projectId, formData) => {
        set({ editingProject: true });

        try {
            const res = await axiosInstance.patch(`/project/update/${projectId}`, formData)

            toast.success(res.message || "Project updated successfully");
        } catch (error) {
            console.error("Error updating project: ", error);
            toast.error("Error updating project");
        }
        finally {
            set({ editingProject: false });
        }
    }
}));
