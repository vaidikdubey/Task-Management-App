import React from "react";
import { Link } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

export const CreateNotesPage = () => {
    return (
        <>
            <Link to={"/"}>
                <ArrowBigLeft className="absolute left-5 top-5 text-emerald-400 cursor-pointer hover:text-sky-500 hover:scale-110" />
            </Link>

            <div className="flex justify-center items-center text-2xl font-bold min-h-full w-full py-50 my-15 text-amber-400 shadow-xl rounded-2xl">
                Feature under construction.... We regret the inconvenience😔
            </div>
        </>
    );
};
