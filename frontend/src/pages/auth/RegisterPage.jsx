import React, { useState } from "react";
import { Eye, EyeOff, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirm: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {isSigninUp, signup} = useAuthStore()

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(form);
        
        navigate("/");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center h-fit w-sm md:w-xl mx-auto bg-transparent text-white p-1 selection:bg-stone-600 selection:text-sky-100">
            <div className="bg-slate-900/90 h-full w-full border border-slate-700 rounded-xl p-6 shadow-input">
                <h1 className="font-bold text-2xl md:text-4xl text-center bg-linear-to-b from-emerald-300 to-teal-300 text-transparent bg-clip-text mb-2 md:mb-5">
                    Welcome, Task Conqueror!
                </h1>
                <p className="text-center text-slate-400 text-sm md:text-lg">
                    Ready to crush your to-do list like a boss? <br /> Join{" "}
                    <span className="bg-linear-to-b from-emerald-300 to-teal-300 text-transparent bg-clip-text font-bold">
                        Manago
                    </span>{" "}
                    and level up your productivity!
                </p>

                <div className="flex flex-col h-fit w-full my-2 md:my-5">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-2 md:gap-4"
                    >
                        <div className="flex items-center justify-between px-3">
                            <label
                                htmlFor="fullname"
                                className="flex py-2 md:p-4 md:gap-2 w-20 md:w-35 text-sm md:text-base"
                            >
                                Full Name <User2 className="hidden md:block" />
                            </label>
                            <input
                                type="text"
                                id="fullname"
                                name="fullname"
                                value={form.fullname}
                                onChange={handleChange}
                                placeholder="Epic Hero Name"
                                className="p-1 md:p-3 bg-slate-800 rounded-md flex-1 placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-sm text-sm md:text-base md:placeholder:text-base"
                            />
                        </div>
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
                                placeholder="Champion Alias"
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
                                placeholder="Super Secret (8+ Chars)"
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
                                className="flex py-2 md:p-4 md:gap-2 w-20 md:w-35 text-sm md:text-base"
                            >
                                Confirm Password
                            </label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirm"
                                name="confirm"
                                value={form.confirm}
                                onChange={handleChange}
                                onCopy={(e) => e.preventDefault()}
                                onPaste={(e) => e.preventDefault()}
                                onCut={(e) => e.preventDefault()}
                                placeholder="Type it again"
                                className="p-1 md:p-3 bg-slate-800 rounded-md flex-1 placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-sm text-sm md:text-base md:placeholder:text-base select-none"
                            />
                            <button
                                type="button"
                                className="ml-2 flex items-center"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5 text-base-content/40" />
                                ) : (
                                    <Eye className="h-5 w-5 text-base-content/40" />
                                )}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="flex justify-center mx-auto h-full w-50 md:w-90 gap-3 bg-linear-to-r from-emerald-500 to-teal-400 p-1 md:p-3 rounded-xl text-black font-bold text-sm md:text-md cursor-pointer hover:shadow hover:shadow-emerald-500 hover:transition-all hover:duration-300 hover:ease-in-out active:shadow active:shadow-emerald-500 transform active:translate-y-1 active:scale-95 transition-all duration-100"
                            disabled={isSigninUp}
                        >
                            {isSigninUp ? (
                                "Launching your account…"
                            ) : (
                                <>
                                    Launch My Account{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        fill="currentColor"
                                        className="md:w-5 md:h-5 w-4 h-4"
                                    >
                                        <path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13.7-23 39.9-29.6 59.7-15.9L232 192c19.2-12.9 40.9-20.2 64-20.2s44.8 7.3 64 20.2l96.5-54.6c19.8-13.7 46-7.1 59.7 15.9l52.5 88.5c4.4 7.4 4.5 16.7 .2 24.1s-12.3 12.1-20.9 12.1l-105.8-0l-9.3 24.8c4.8 13.3 8.8 24.9 11.8 33.8c3.8 11.4 .8 23.7-7.7 32.2l-30.9 30.9c8.8 8.8 13.7 20.7 13.7 33.1s-4.9 24.4-13.7 33.1l-41.4 41.4c-8.8 8.8-20.7 13.7-33.1 13.7s-24.4-4.9-33.1-13.7l-30.9-30.9c-10.6 7.6-23 12.5-36.3 13.9l-32.8 124c-3.5 13.3-16.2 22.4-30.2 22.4H192c-13.9 0-26.6-9-30.2-22.4L129 428.3c-13.3-1.4-25.7-6.3-36.3-13.9zM352 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
                <p className="text-slate-400 text-center mt-4 text-[10px] md:text-sm">
                    Already 50,000+ warriors are dominating their tasks with us!
                </p>
                <p className="text-slate-500 mt-3 text-center text-xs md:text-base">
                    Have an account?{" "}
                    <Link
                        to={"/login"}
                        className="text-emerald-300 font-bold text-xs underline md:text-base"
                    >
                        Log in instantly
                    </Link>{" "}
                </p>
                <p className="text-slate-500 text-center text-xs md:text-base">
                    By signing up, you agree to our{" "}
                    <Link
                        to={"/terms-privacy"}
                        className="text-emerald-300 font-bold text-xs underline md:text-base"
                    >
                        Terms
                    </Link>{" "}
                    &{" "}
                    <Link
                        to={"/terms-privacy"}
                        className="text-emerald-300 font-bold text-xs underline md:text-base"
                    >
                        Privacy
                    </Link>{" "}
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
