import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import { Loader } from "lucide-react";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage.jsx";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage.jsx";
import { CheckEmailPage } from "../pages/auth/CheckEmailPage.jsx";
import { ChangeCurrentPasswordPage } from "../pages/auth/ChangeCurrentPasswordPage.jsx";
import { Layout } from "../layout/Layout.jsx";
import { useEffect } from "react";
import { ProfilePage } from "../pages/auth/ProfilePage.jsx";
import { EditProfilePage } from "../pages/auth/EditProfilePage.jsx";
import { CreateProjectPage } from "../pages/projects/CreateProjectPage.jsx";
import { ProjectPage } from "../pages/projects/ProjectPage.jsx";
import { TasksPage } from "../pages/tasks/TasksPage.jsx";
import { CreateTaskPage } from "../pages/tasks/CreateTaskPage.jsx";
import { CreateNotesPage } from "../pages/notes/CreateNotesPage.jsx";
import { NotesPage } from "../pages/notes/NotesPage.jsx";

export default function AppRoutes() {
    const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <Routes>
            {/* Public routes */}
            <Route
                path="/login"
                element={
                    authUser ? <Navigate to={"/"} replace /> : <LoginPage />
                }
            />
            <Route
                path="/register"
                element={
                    !authUser ? <RegisterPage /> : <Navigate to={"/"} replace />
                }
            />

            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
            />

            <Route path="/verify/:token" element={<VerifyEmailPage />} />

            <Route path="/check-email" element={<CheckEmailPage />} />

            {/* Protected routes */}
            <Route
                path="/"
                element={
                    authUser ? (
                        <DashboardPage />
                    ) : (
                        <Navigate to={"/login"} replace />
                    )
                }
            />

            <Route
                path="/change-password"
                element={
                    authUser ? (
                        <ChangeCurrentPasswordPage />
                    ) : (
                        <Navigate to={"/login"} />
                    )
                }
            />

            <Route
                path="/profile"
                element={
                    authUser ? <ProfilePage /> : <Navigate to={"/login"} />
                }
            />

            <Route
                path="/edit-profile"
                element={
                    authUser ? <EditProfilePage /> : <Navigate to={"/login"} />
                }
            />

            <Route
                path="/createProjects"
                element={
                    authUser ? (
                        <CreateProjectPage />
                    ) : (
                        <Navigate to={"/login"} />
                    )
                }
            />

            <Route
                path="/getProject/:projectId"
                element={
                    authUser ? <ProjectPage /> : <Navigate to={"/login"} />
                }
            />

            <Route
                path="/allTasks"
                element={authUser ? <TasksPage /> : <Navigate to={"/login"} />}
            />

            <Route
                path="/createTasks"
                element={
                    authUser ? <CreateTaskPage /> : <Navigate to={"/login"} />
                }
            />

            <Route
                path="/createNotes"
                element={
                    authUser ? <CreateNotesPage /> : <Navigate to={"/login"} />
                }
            />

            <Route
                path="/allNotes"
                element={authUser ? <NotesPage /> : <Navigate to={"/login"} />}
            />
        </Routes>
    );
}
