import { useDroppable } from "@dnd-kit/core";

export const DroppableColumn = ({ id, children }) => {
    const { setNodeRef } = useDroppable({
        id,
    });
    return (
        <div ref={setNodeRef} className="flex-1 flex h-full">
            {children}
        </div>
    );
};
