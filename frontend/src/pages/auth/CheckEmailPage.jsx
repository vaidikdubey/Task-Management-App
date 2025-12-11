import React from "react";
import { MailCheck } from "lucide-react";

export const CheckEmailPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-fit w-sm md:w-lg mx-auto bg-transparent text-white p-1 selection:bg-stone-600 selection:text-sky-100">
            <div className="bg-slate-900/90 h-full w-full border border-slate-700 rounded-xl p-8 shadow-input">
                <div className="mx-auto my-5 bg-teal-500/30 p-3 w-fit rounded-[999px]">
                    <MailCheck className="h-15 w-15" />
                </div>
                <h1 className="font-bold text-2xl md:text-4xl text-center bg-linear-to-b from-emerald-300 to-teal-300 text-transparent bg-clip-text mb-2 pb-1 md:mb-5">
                    Check Your Inbox
                </h1>
                <p className="text-center text-slate-400 text-sm md:text-lg">
                    We've just sent an email to you
                </p>
                <p className="text-center max-w-sm mx-auto text-slate-400 mt-5 text-xs md:text-base">
                    Click the link inside to continue.
                </p>
            </div>
            <p className="absolute bottom-2 text-md md:text-lg text-slate-400">
                You can close this page
            </p>
        </div>
    );
};
