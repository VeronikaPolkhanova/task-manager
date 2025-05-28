"use client";

import { useState } from "react";

import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { Task } from "@/types";
import { statusOptions } from "@/constants";
import { deleteTask } from "@/redux/slices/tasksSlice";

import { cn } from "./lib/utils";
import Button from "./ui/Button";
import TaskTimer from "./TaskTimer";
import TaskModal from "./TaskDetailsModal";

interface TaskItemProps {
  task: Task;
  listId: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, listId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { id, status, timeLimit, title } = task;

  const statusData = statusOptions.find(({ id }) => status === id);

  return (
    <div
      className={cn(
        "border rounded p-3 border-blue-100 border-l-8 flex flex-col justify-between gap-1 items-start",
        statusData?.style
      )}>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs text-gray-400">Time limit: {timeLimit} min</p>
        <p className="text-xs">Status: {statusData?.text}</p>
        {task.status === "in_progress" && task.startedAt && task.timeLimit && (
          <TaskTimer startedAt={task.startedAt} timeLimit={task.timeLimit} />
        )}
      </div>
      <div className="flex gap-2 justify-end w-full">
        <Button onClick={() => setIsOpen(true)}>Show more</Button>
        <Button onClick={() => dispatch(deleteTask({ listId, taskId: id }))}>
          Delete
        </Button>
      </div>
      {isOpen &&
        createPortal(
          <TaskModal
            task={task}
            listId={listId}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />,
          document.body
        )}
    </div>
  );
};

export default TaskItem;
