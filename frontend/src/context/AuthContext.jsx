import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isSigninUp, setIsSigninUp] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false); //Forgot password states
    const [isResettingPassword, setIsResettingPassword] = useState(false); //Reset password states
    const [isChangingPassword, setIsChangingPassword] = useState(false); //Change password states

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
                setAuthUser(null);
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
                setAuthUser(data);   
            }

            return { ok: res.ok, data };
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
                setAuthUser(data);
            }

            return { ok: res.ok, data };
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

            return { ok: res.ok, data };
        } catch (error) {
            console.error("Error sending email: ", error);
            toast.error("Error sending email");
        } finally {
            setIsSendingEmail(false);
        }
    };

    const resetPassword = async (token, formData) => {
        setIsResettingPassword(true);

        const { password } = formData;

        try {
            const res = await fetch(`/api/v1/auth/reset-password/${token}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = res.json();
            
            return { ok: res.ok, data };
        } catch (error) {
            console.error("Error resetting password: ", error);
            toast.error("Error resetting password");
        } finally {
            setIsResettingPassword(false);
        }
    };

    const changePassword = async (formData) => {
        setIsChangingPassword(true);

        try {
            const { oldPassword, password } = formData;

            const res = await fetch("/api/v1/auth/change-password", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({ oldPassword, password }),
            });

            const data = await res.json();

            if (data.statusCode < 400) {
                return {ok: res.ok, data}
            } else {
                return {ok: res.ok, data}
            }
        } catch (error) {
            console.error("Error updating password: ", error);
            toast.error("Error updating password");
        } finally {
            setIsChangingPassword(false);
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
                isChangingPassword,
                checkAuth,
                signup,
                login,
                logout,
                forgotPassword,
                resetPassword,
                changePassword,
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
