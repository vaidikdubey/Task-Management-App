import { useContext, createContext, useState } from "react";
import toast from "react-hot-toast";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
    const [isGettingProjects, setIsGettingProjects] = useState(false);
    const [allProjects, setAllProjects] = useState(null);

    const getAllProjects = async () => {
        setIsGettingProjects(true);

        try {
            const res = await fetch("/api/v1/project/getAll", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();

                setAllProjects(data.data);
                toast.success(data.message || "Projects fetched");
            } else {
                toast.error(data.message || "Error fetching projects");
            }
        } catch (error) {
            console.error("Error fetching projects: ", error);
            toast.error("Error fetching projects");
        } finally {
            setIsGettingProjects(false);
        }
    };

    return (
        <ProjectContext.Provider
            value={{ isGettingProjects, allProjects, getAllProjects }}
        >
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    return useContext(ProjectContext);
}
