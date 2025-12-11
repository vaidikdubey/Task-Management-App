import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const { isSendingEmail, forgotPassword } = useAuth();

    const [email, setEmail] = useState({ email: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        const res = forgotPassword(email);

        if (res.ok) {
            toast.success(res.data.message);
            navigate("/check-email")
        }
        else {
            toast.error(res.data.message);
        }
    };

    const handleChange = (e) => {
        setEmail({ [e.target.name]: e.target.value });
    };

    return (
        <div className="flex flex-col justify-center items-center h-fit w-sm md:w-lg mx-auto bg-transparent text-white p-1 selection:bg-stone-600 selection:text-sky-100">
            <div className="bg-slate-900/90 h-full w-full border border-slate-700 rounded-xl p-8 shadow-input">
                <h1 className="font-bold text-2xl md:text-4xl text-center bg-linear-to-b from-emerald-300 to-teal-300 text-transparent bg-clip-text mb-2 pb-1 md:mb-5">
                    Hey Champ!
                </h1>
                <p className="text-center text-slate-400 text-sm md:text-lg">
                    Don't worry - we’ve got your back!
                </p>
                <div className="mx-auto my-5 bg-teal-500/30 p-3 w-fit rounded-[999px]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        className="rotate-140 scale-y-[-1]"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                </div>

                <h3 className="text-center font-bold text-3xl pb-4">
                    Forgot Your Password?
                </h3>
                <p className="text-center max-w-sm mx-auto text-slate-400">
                    Enter your email and we’ll blast a secure password-reset
                    link straight to your inbox. You’ll be back conquering tasks
                    in no time!
                </p>

                <form onSubmit={handleSubmit} className="m-4 md:mt-8">
                    <label
                        htmlFor="email"
                        className="flex gap-2 mb-2 md:mb-4 ml-1"
                    >
                        Registered Email <Mail />
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email.email}
                        onChange={handleChange}
                        placeholder="hero@domain.com"
                        className="p-1 md:p-3 bg-slate-800 rounded-md flex-1 placeholder:text-slate-500 border border-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-sm text-sm md:text-base md:placeholder:text-base invalid:border-red-600 w-full"
                    />
                    <button
                        type="submit"
                        className="flex justify-center mx-auto h-full w-50 md:w-90 gap-3 bg-linear-to-r from-emerald-500 to-teal-400 p-1 md:p-3 rounded-xl text-black font-bold text-sm md:text-md cursor-pointer hover:shadow hover:shadow-emerald-500 hover:transition-all hover:duration-300 hover:ease-in-out active:shadow active:shadow-emerald-500 transform active:translate-y-1 active:scale-95 transition-all duration-100 mt-5 md:mt-8"
                        disabled={isSendingEmail}
                    >
                        {isSendingEmail ? "Please wait…" : "Send Reset Link"}
                    </button>
                </form>
                <p className="text-center text-xl">
                    Remembered it?{" "}
                    <Link
                        to={"/login"}
                        className="text-emerald-300 font-bold text-xs md:text-xl"
                    >
                        ← Back to Login
                    </Link>
                </p>
            </div>
            <p className="absolute bottom-1 md:bottom-2 italic text-sm text-slate-500">
                Still stuck?{" "}
                <Link
                    to={"/support"}
                    className="text-emerald-500 text-xs md:text-sm"
                >
                    Contact Support
                </Link>
            </p>
        </div>
    );
};
