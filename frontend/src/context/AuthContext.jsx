import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isSigninUp, setIsSigninUp] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false); //Forgot password states
    const [isResettingPassword, setIsResettingPassword] = useState(false); //Reset password states

    const navigate = useNavigate();

    const checkAuth = async () => {
        setIsCheckingAuth(true);

        try {
            const res = await fetch("/api/v1/auth/profile", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
            });

            if (res.status !== 200) {
                console.error("Error checking user: ", res.error);
                toast.error("Error authenticating");
            }

            const data = await res.json();

            setAuthUser(data);
        } catch (error) {
            console.error("Error checking user: ", error);
            toast.error("Error authenticating");
        } finally {
            setIsCheckingAuth(false);
        }
    };

    const signup = async (formData) => {
        setIsSigninUp(true);

        try {
            const res = await fetch("/api/v1/auth/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = res.json();

            if (data.statusCode < 400) {
                toast.success(data.message);
                setAuthUser(data);
                navigate("/", { replace: true });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error signing up: ", error);
            toast.error("Error signing up");
        } finally {
            setIsSigninUp(false);
        }
    };

    const login = async (formData) => {
        setIsLoggingIn(true);

        try {
            const res = await fetch("/api/v1/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.statusCode < 400) {
                toast.success(data.message);
                setAuthUser(data);
                navigate("/", { replace: true });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log("Error logging in", error);
            toast.error("Error logging in");
        } finally {
            setIsLoggingIn(false);
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/v1/auth/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
            });

            setAuthUser(null);

            toast.success("Logout successful");
        } catch (error) {
            console.log("Error logging out", error);
            toast.error("Error logging out");
        }
    };

    const forgotPassword = async (formData) => {
        setIsSendingEmail(true);

        try {
            const res = await fetch("/api/v1/auth/forgot-password", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.statusCode < 400) {
                toast.success(data.message);

                navigate("/check-email");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error sending email: ", error);
            toast.error("Error sending email");
        } finally {
            setIsSendingEmail(false);
        }
    };

    const resetPassword = async (token, formData) => {
        setIsResettingPassword(true);

        const { password } = formData.password;

        try {
            const res = await fetch(`/api/v1/auth/reset-password/${token}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.status < 400) {
                const data = res.json();
                toast.success(data.message);
                navigate("/");
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            console.error("Error resetting password: ", error);
            toast.error("Error resetting password");
        } finally {
            setIsResettingPassword(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                authUser,
                isSigninUp,
                isLoggingIn,
                isCheckingAuth,
                isSendingEmail,
                isResettingPassword,
                checkAuth,
                signup,
                login,
                logout,
                forgotPassword,
                resetPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

//custom hook
export function useAuth() {
    return useContext(AuthContext);
}
