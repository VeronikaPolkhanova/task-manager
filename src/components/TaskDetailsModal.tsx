"use client";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { Task } from "@/types";
import { statusOptions } from "@/constants";
import { editTask } from "@/redux/slices/tasksSlice";

import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import TaskTimer from "./TaskTimer";
import Textarea from "./ui/Textarea";

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
  const dispatch = useDispatch();

  const [mode, setMode] = useState<contentMode>("Show");

  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [timeLimit, setTimeLimit] = useState(task.timeLimit);
  const [description, setDescription] = useState(task.description);

  const handleChangeMode = () => {
    if (mode === "Show") return setMode("Edit");
    dispatch(
      editTask({
        listId,
        task: { ...task, title, status, timeLimit, description },
      })
    );
    setMode("Show");
    onClose();
  };

  const handleCloseModal = () => {
    setMode("Show");
    onClose();
  };
  // если mode === "Show" показываем детали задачи
  // если mode === "Edit" показывем инпуты для редактировани задачи
  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div className="flex flex-col gap-2">
        {mode === "Show" ? (
          <>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-sm text-gray-400">Title:</p>
                <h3 className="font-semibold">{task.title}</h3>
              </div>
              <div>
                <p className="text-sm text-gray-400">Description</p>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Time limit:</p>
                <p className="text-sm text-gray-600">{task.timeLimit} min</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-sm text-gray-600">
                  {statusOptions.find(({ id }) => id === task.status)?.text}
                </p>
              </div>
              {task.status === "in_progress" &&
                task.startedAt &&
                task.timeLimit && (
                  <TaskTimer
                    startedAt={task.startedAt}
                    timeLimit={task.timeLimit}
                  />
                )}
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-400">Edit task:</p>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="number"
              min={0}
              value={isNaN(timeLimit) ? "" : timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="border px-2 py-1 rounded text-sm">
              {statusOptions.map(({ id, text }) => (
                <option key={id} value={id}>
                  {text}
                </option>
              ))}
            </select>
          </>
        )}
        <div className="w-full flex justify-end mt-2">
          <Button className="w-fit" onClick={handleChangeMode}>
            {mode === "Show" ? "Edit" : "Save"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
