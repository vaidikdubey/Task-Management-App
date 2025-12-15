import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";

function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const { isLoggingIn, login } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(form);

        navigate("/");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center h-fit w-sm md:w-xl mx-auto bg-transparent text-white p-1 selection:bg-stone-600 selection:text-sky-100">
            <div className="bg-slate-900/90 h-full w-full border border-slate-700 rounded-xl p-6 shadow-input">
                <h1 className="font-bold text-2xl md:text-4xl text-center bg-linear-to-b from-emerald-300 to-teal-300 text-transparent bg-clip-text mb-2 md:mb-5">
                    Welcome Back, Task Hero!
                </h1>
                <p className="text-center text-slate-400 text-sm md:text-lg">
                    Time to reclaim your productivity throne! <br /> Log in to{" "}
                    <span className="bg-linear-to-b from-emerald-300 to-teal-300 text-transparent bg-clip-text font-bold">
                        Manago
                    </span>{" "}
                    and keep conquering your quests.
                </p>

                <div className="flex flex-col h-fit w-full my-2 md:my-5">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2 md:gap-4"
                    >
                        <div className="flex items-center justify-between px-3">
                            <label
                                htmlFor="username"
                                className="flex py-2 md:p-4 md:gap-2 w-20 md:w-35 text-sm md:text-base"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="p-1 md:p-3 bg-slate-800 rounded-md flex-1 placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-sm text-sm md:text-base md:placeholder:text-base"
                            />
                        </div>

                        <div className="flex items-center justify-between px-3">
                            <label
                                htmlFor="email"
                                className="flex py-2 md:p-4 md:gap-2 w-20 md:w-35 text-sm md:text-base"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="hero@domain.com"
                                className="p-1 md:p-3 bg-slate-800 rounded-md flex-1 placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-sm text-sm md:text-base md:placeholder:text-base invalid:border-red-600"
                            />
                        </div>
                        <div className="flex items-center justify-between px-3">
                            <label
                                htmlFor="password"
                                className="flex py-2 md:p-4 md:gap-2 w-20 md:w-35 text-sm md:text-base"
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
                        <button
                            type="submit"
                            className="flex justify-center mx-auto h-full w-50 md:w-90 gap-3 bg-linear-to-r from-emerald-500 to-teal-400 p-1 md:p-3 rounded-xl text-black font-bold text-sm md:text-md cursor-pointer hover:shadow hover:shadow-emerald-500 hover:transition-all hover:duration-300 hover:ease-in-out active:shadow active:shadow-emerald-500 transform active:translate-y-1 active:scale-95 transition-all duration-100"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? "Powering up…" : "Enter the Arena!"}
                        </button>
                    </form>
                </div>
                <p className="text-slate-400 text-center mt-4 text-[10px] md:text-sm">
                    Thousands of champions are already completing quests today.
                </p>
                <p className="text-slate-500 mt-3 text-center text-xs md:text-base">
                    New here?{" "}
                    <Link
                        to={"/register"}
                        className="text-emerald-300 font-bold text-xs underline md:text-base"
                    >
                        Create your account
                    </Link>{" "}
                </p>
                <p className="text-slate-500 text-center text-xs md:text-base">
                    Forgot your password?{" "}
                    <Link
                        to={"/forgot-password"}
                        className="text-emerald-300 font-bold text-xs underline md:text-base"
                    >
                        Reset it!
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
