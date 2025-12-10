import React from "react";
import { useNavigate } from "react-router-dom";

function VerifyEmailPage() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center h-fit w-sm md:w-xl mx-auto bg-transparent text-white p-1 selection:bg-stone-600 selection:text-sky-100">
            <div className="bg-slate-900/90 h-full w-fit border border-slate-700 rounded-xl px-6 shadow-input py-10">
                <div className="mx-auto my-5 bg-linear-to-r from-emerald-500 to-teal-400 p-3 w-fit rounded-[999px]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="60"
                        height="60"
                        role="img"
                        aria-label="Check"
                    >
                        <path
                            fill="none"
                            stroke="black"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20 6L9 17l-5-5"
                        />
                    </svg>
                </div>
                <h1 className="text-center text-transparent bg-linear-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-4xl font-bold">
                    EMAIL VERIFIED!
                </h1>
                <p className="my-4 text-center text-emerald-300 font-medium text-xl">
                    Welcome to the Conquest
                </p>
                <p className="mt-6 text-center text-slate-300">
                    Your TaskMaster powers are now{" "}
                    <span className="font-bold text-emerald-300">
                        FULLY ACTIVATED
                    </span>
                    . <br />
                    Time to dominate your tasks like never before.
                </p>
                <button
                    type="button"
                    className="mt-10 flex justify-center mx-auto h-full w-50 md:w-90 gap-3 bg-linear-to-r from-emerald-500 to-teal-400 p-1 md:p-3 rounded-xl text-black font-bold text-sm md:text-md cursor-pointer hover:shadow hover:shadow-emerald-500 hover:transition-all hover:duration-300 hover:ease-in-out active:shadow active:shadow-emerald-500 transform active:translate-y-1 active:scale-95 transition-all duration-100"
                    onClick={() => navigate("/", { replace: true })}
                >
                    Continue to Dashboard
                </button>
            </div>
        </div>
    );
}

export default VerifyEmailPage;
