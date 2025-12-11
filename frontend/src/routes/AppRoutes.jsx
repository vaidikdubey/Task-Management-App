import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage.jsx";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage.jsx";
import { CheckEmailPage } from "../pages/auth/CheckEmailPage.jsx";
import { ChangeCurrentPasswordPage } from "../pages/auth/ChangeCurrentPasswordPage.jsx";
import { Layout } from "../layout/Layout.jsx";

export default function AppRoutes() {
    const { authUser, isCheckingAuth, checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    !authUser ? <LoginPage /> : <Navigate to={"/"} replace />
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
            <Route path="/" element={<Layout />}>
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
            </Route>

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
        </Routes>
    );
}
