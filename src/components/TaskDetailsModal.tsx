"use client";

import { useState } from "react";

import { Task } from "@/types";
import { statusOptions } from "@/constants";

import Modal from "./ui/Modal";
import Button from "./ui/Button";
import EditTask from "./EditTask";
import TaskTimer from "./TaskTimer";

type contentMode = "Show" | "Edit";

interface TaskModalProps {
  task: Task;
  listId: string;
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  listId,
  isOpen,
  onClose,
}) => {
  const [mode, setMode] = useState<contentMode>("Show");

  const handleCloseModal = () => {
    setMode("Show");
    onClose();
  };

  const detailsCard = (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-sm text-gray-400">Title:</p>
          <h3 className="font-semibold">{task.title}</h3>
        </div>
        <div>
          <p className="text-sm text-gray-400">Description:</p>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Time limit:</p>
          <p className="text-sm text-gray-600">{task.timeLimit} min</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Status:</p>
          <p className="text-sm text-gray-600">
            {statusOptions.find(({ id }) => id === task.status)?.text}
          </p>
        </div>
        {task.status === "in_progress" && task.startedAt && task.timeLimit && (
          <TaskTimer startedAt={task.startedAt} timeLimit={task.timeLimit} />
        )}
      </div>
      <div className="w-full flex justify-end mt-2">
        <Button className="w-fit" onClick={() => setMode("Edit")}>
          Edit
        </Button>
      </div>
    </div>
  );

  // если mode === "Show" показываем детали задачи
  // если mode === "Edit" показывем инпуты для редактировани задачи
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      {mode === "Show" ? (
        detailsCard
      ) : (
        <EditTask
          listId={listId}
          task={task}
          onClose={onClose}
          changeMode={() => setMode("Show")}
        />
      )}
    </Modal>
  );
};

export default TaskModal;
