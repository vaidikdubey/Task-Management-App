import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage.jsx";

export default function AppRoutes() {
    const { authUser, isCheckingAuth, checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route
                    path="/login"
                    element={
                        !authUser ? (
                            <LoginPage />
                        ) : (
                            <Navigate to={"/"} replace />
                        )
                    }
                />
                <Route
                    path="/register"
                    element={
                        !authUser ? (
                            <RegisterPage />
                        ) : (
                            <Navigate to={"/"} replace />
                        )
                    }
                />

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
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}
