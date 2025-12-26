import React, { useEffect } from "react";
import { useTaskStore } from "../../store/useTaskStore";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { arrayMove } from "@dnd-kit/sortable";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableTaskCard } from "./Kanban Components/SortableTaskCard.jsx";
import { DroppableColumn } from "./Kanban Components/DroppableColumn.jsx";

export const KanbanBoard = () => {
    const { projectId } = useParams();

    const { tasksByProject, getTasksByProject, updateTask } = useTaskStore();

    useEffect(() => {
        getTasksByProject(projectId);
        toast.success("Tasks fetched successfully");
    }, [projectId]);

    const todoTasks = tasksByProject?.data?.filter((p) => p.status === "todo");
    const progressTasks = tasksByProject?.data?.filter(
        (p) => p.status === "in_progress"
    );
    const completedTasks = tasksByProject?.data?.filter(
        (p) => p.status === "done"
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        //Drop on column
        if (
            overId === "todo" ||
            overId === "in_progress" ||
            overId === "done"
        ) {
            useTaskStore.setState((state) => ({
                tasksByProject: {
                    ...state.tasksByProject,
                    data: state.tasksByProject.data.map((task) =>
                        task._id === activeId
                            ? { ...task, status: overId }
                            : task
                    ),
                },
            }));

            //Update backend status
            updateTask(projectId, activeId, overId);

            return;
        }

        const tasks = tasksByProject.data;

        const activeTask = tasks.find((t) => t._id === activeId);
        const overTask = tasks.find((t) => t._id === overId);

        //Drop on card (cross-column)
        if (activeTask && overTask && activeTask.status !== overTask.status) {
            useTaskStore.setState((state) => ({
                tasksByProject: {
                    ...state.tasksByProject,
                    data: state.tasksByProject.data.map((task) =>
                        task._id === activeId
                            ? { ...task, status: overTask.status }
                            : task
                    ),
                },
            }));

            //Update backend status
            updateTask(projectId, activeId, overTask.status);

            return;
        }

        //Same-column reorder
        const activeIndex = tasks.findIndex((task) => task._id === activeId);
        const overIndex = tasks.findIndex((task) => task._id === overId);

        if (activeIndex === -1 || overIndex === -1) return;

        if (tasks[activeIndex].status === tasks[overIndex].status) {
            const reorderedTasks = arrayMove(tasks, activeIndex, overIndex);

            useTaskStore.setState({
                tasksByProject: {
                    ...tasksByProject,
                    data: reorderedTasks,
                },
            });
        }
    };

    return (
        <div className="flex gap-4 items-stretch h-[calc(100vh-10.5rem)]">
            <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <DroppableColumn id={"todo"}>
                    <div className="p-2 rounded-lg bg-blue-100 w-full flex flex-col mb-2">
                        <h4 className="font-bold text-black text-xl mb-1">
                            To Do ({todoTasks?.length})
                        </h4>
                        <div className="flex-1 overflow-y-auto no-scrollbar mb-1 rounded-2xl relative">
                            {todoTasks?.length > 0 ? (
                                <SortableContext
                                    items={todoTasks?.map((task) => task._id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {todoTasks?.map((item) => (
                                        <SortableTaskCard
                                            key={item._id}
                                            task={item}
                                            borderColor="border-blue-300"
                                        />
                                    ))}
                                </SortableContext>
                            ) : (
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 text-xl font-semibold text-slate-600 text-center italic">
                                    No tasks found
                                </p>
                            )}
                        </div>
                    </div>
                </DroppableColumn>
                <DroppableColumn id={"in_progress"}>
                    <div className="p-2 rounded-lg bg-yellow-100 w-full flex flex-col mb-2">
                        <h4 className="font-bold text-black text-xl mb-1">
                            In Progress ({progressTasks?.length})
                        </h4>
                        <div className="flex-1 overflow-y-auto no-scrollbar mb-1 rounded-2xl relative">
                            {progressTasks?.length > 0 ? (
                                <SortableContext
                                    items={progressTasks?.map(
                                        (task) => task._id
                                    )}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {progressTasks?.map((item) => (
                                        <SortableTaskCard
                                            key={item._id}
                                            task={item}
                                            borderColor="border-yellow-300"
                                        />
                                    ))}
                                </SortableContext>
                            ) : (
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 text-xl font-semibold text-slate-600 text-center italic">
                                    No tasks found
                                </p>
                            )}
                        </div>
                    </div>
                </DroppableColumn>
                <DroppableColumn id={"done"}>
                    <div className="p-2 rounded-lg bg-green-100 w-full flex flex-col mb-2">
                        <h4 className="font-bold text-black text-xl mb-1">
                            Done ({completedTasks?.length})
                        </h4>
                        <div className="flex-1 overflow-y-auto no-scrollbar mb-1 rounded-2xl relative">
                            {completedTasks?.length > 0 ? (
                                <SortableContext
                                    items={completedTasks?.map(
                                        (task) => task._id
                                    )}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {completedTasks?.map((item) => (
                                        <SortableTaskCard
                                            key={item._id}
                                            task={item}
                                            borderColor="border-green-300"
                                        />
                                    ))}
                                </SortableContext>
                            ) : (
                                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 text-xl font-semibold text-slate-600 text-center italic">
                                    No tasks found
                                </p>
                            )}
                        </div>
                    </div>
                </DroppableColumn>
            </DndContext>
        </div>
    );
};
