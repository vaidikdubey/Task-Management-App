import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore.js";

export const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const { isResettingPassword, resetPassword } = useAuthStore();

    const { token } = useParams();

    const [form, setForm] = useState({ password: "", confirm: "" });

    const [showPassword, setShowPassword] = useState(false);

    const [showResetPassword, setShowResetPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword(token, form);
            
        navigate("/");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col justify-center items-center h-fit w-sm md:w-lg mx-auto bg-transparent text-white p-1 selection:bg-stone-600 selection:text-sky-100">
            <div className="bg-slate-900/90 h-full w-fit border border-slate-700 rounded-xl p-6 shadow-input">
                <h1 className="font-bold text-2xl md:text-4xl text-center bg-linear-to-b from-emerald-300 to-teal-300 text-transparent bg-clip-text mb-2 pb-1 md:mb-3">
                    You're Almost There!
                </h1>
                <p className="text-center text-slate-400 text-sm md:text-lg">
                    Your new battle-ready password awaits
                </p>
                <div className="mx-auto my-5 bg-teal-500/30 p-5 w-fit rounded-[999px]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
                        />
                    </svg>
                </div>

                <h3 className="text-center font-bold text-3xl pb-4">
                    Reset Your Password
                </h3>
                <p className="text-center max-w-sm mx-auto text-slate-400">
                    Choose a strong password and get back to conquering your
                    tasks in seconds.
                </p>

                <form onSubmit={handleSubmit} className="m-4 md:mt-8">
                    <div className="flex items-center justify-between px-3">
                        <label
                            htmlFor="password"
                            className="flex py-2 md:py-4 md:px-0 md:gap-2 w-20 text-sm md:text-base"
                        >
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            placeholder="Enter your password"
                            className="p-1 md:p-3 bg-slate-800 rounded-md flex-1 placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-sm text-sm md:text-base md:placeholder:text-base placeholder:select-none select-none"
                        />
                        <button
                            type="button"
                            className="ml-2 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-base-content/40" />
                            ) : (
                                <Eye className="h-5 w-5 text-base-content/40" />
                            )}
                        </button>
                    </div>
                    <div className="flex items-center justify-between px-3">
                        <label
                            htmlFor="confirm"
                            className="flex py-2 md:py-4 md:px-0 md:gap-2 w-20 text-sm md:text-base"
                        >
                            Confirm Password
                        </label>
                        <input
                            type={showResetPassword ? "text" : "password"}
                            id="confirm"
                            name="confirm"
                            value={form.confirm}
                            onChange={handleChange}
                            onCopy={(e) => e.preventDefault()}
                            onPaste={(e) => e.preventDefault()}
                            onCut={(e) => e.preventDefault()}
                            placeholder="Confirm your password"
                            className="p-1 md:p-3 bg-slate-800 rounded-md flex-1 placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-sm text-sm md:text-base md:placeholder:text-base placeholder:select-none select-none"
                        />
                        <button
                            type="button"
                            className="ml-2 flex items-center"
                            onClick={() =>
                                setShowResetPassword(!showResetPassword)
                            }
                        >
                            {showResetPassword ? (
                                <EyeOff className="h-5 w-5 text-base-content/40" />
                            ) : (
                                <Eye className="h-5 w-5 text-base-content/40" />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="flex justify-center mx-auto h-full w-50 md:w-90 gap-3 bg-linear-to-r from-emerald-500 to-teal-400 p-1 md:p-3 rounded-xl text-black font-bold text-sm md:text-md cursor-pointer hover:shadow hover:shadow-emerald-500 hover:transition-all hover:duration-300 hover:ease-in-out active:shadow active:shadow-emerald-500 transform active:translate-y-1 active:scale-95 transition-all duration-100 mt-5 md:mt-8"
                        disabled={isResettingPassword}
                    >
                        {isResettingPassword
                            ? "Updating Password…"
                            : "Secure My Account"}
                    </button>
                </form>
                <p className="text-center text-xs md:text-xl">
                    Changed your mind?{" "}
                    <Link
                        to={"/login"}
                        className="text-emerald-300 font-bold text-xs md:text-xl"
                    >
                        ← Back to Login
                    </Link>
                </p>
            </div>
        </div>
    );
};
