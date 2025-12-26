import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { User, UserLock, Clock, ClockPlus } from "lucide-react";
import { timeAgo } from "../../../utils/timeAgo";

export const SortableTaskCard = ({ task, borderColor }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`bg-white text-black mx-2 my-4 p-2 rounded-xl border-l-4 ${borderColor} flex flex-col gap-1 text-start cursor-grab`}
        >
            <h6 className="text-sm font-semibold">{task.title}</h6>

            <p className="text-xs text-wrap">{task.description}</p>

            <p className="flex items-center gap-2 text-xs font-semibold">
                <User size={16} /> {task.assignedTo.fullname}
            </p>

            <p className="flex items-center gap-2 text-xs font-semibold">
                <UserLock size={16} /> {task.assignedBy.fullname}
            </p>

            <p className="flex items-center gap-2 text-xs">
                <Clock size={16} /> {timeAgo(task.createdAt)}
            </p>

            <p className="flex items-center gap-2 text-xs">
                <ClockPlus size={16} /> {timeAgo(task.updatedAt)}
            </p>
        </div>
    );
};
