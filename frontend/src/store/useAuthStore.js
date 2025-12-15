import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,
    isSendingEmail: false,
    isResettingPassword: false,
    isChangingPassword: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });

        try {
            const data = await axiosInstance.get("/auth/profile");

            set({ authUser: data });
        } catch (error) {
            console.error("Error checking user: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (formData) => {
        set({ isSigninUp: true });

        try {
            const res = await axiosInstance.post("/auth/register", formData);

            set({ authUser: res });
            toast.success(res.message || "Sign up successful");
        } catch (error) {
            set({ authUser: null });
            console.log("Error signing up: ", error);
            toast.error("Error signing up");
        } finally {
            set({ isSigninUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post("/auth/login", formData);

            set({ authUser: res });
            toast.success(res.message || "Login successful");
        } catch (error) {
            set({ authUser: null });
            console.error("Error logging in: ", error);
            toast.error("Error logging in");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.get("/auth/logout");

            set({ authUser: null });

            toast.success(res.message || "Logout successful");
        } catch (error) {
            console.log("Error logging out: ", error);
            toast.error("Error logging out");
        }
    },

    forgotPassword: async (formData) => {
        set({ isSendingEmail: true });

        try {
            const res = await axiosInstance.post(
                "/auth/forgot-password",
                formData
            );

            toast.success(res.message || "Forgot password successful");
        } catch (error) {
            console.error("Error sending email: ", error);
            toast.error("Error sending email");
        } finally {
            set({ isSendingEmail: false });
        }
    },

    resetPassword: async (token, formData) => {
        set({ isResettingPassword: true });

        const { password } = formData;

        try {
            const res = await axiosInstance.post(
                `/auth/reset-password/${token}`,
                { password }
            );

            toast.success(res.message || "Reset password successful");
        } catch (error) {
            console.error("Error resetting password: ", error);
            toast.error("Error resetting password");
        } finally {
            set({ isResettingPassword: false });
        }
    },

    changePassword: async (formData) => {
        set({ isChangingPassword: true });

        try {
            const { oldPassword, password } = formData;

            const res = await axiosInstance.post("/auth/change-password", {
                oldPassword,
                password,
            });

            toast.success(res.message || "Password change successful");
        } catch (error) {
            console.error("Error updating password: ", error);
            toast.error("Error updating password");
        } finally {
            set({ isChangingPassword: false });
        }
    },
}));
