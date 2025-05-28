"use client";

import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { Task } from "@/types";
import { statusOptions } from "@/constants";
import { editTask } from "@/redux/slices/tasksSlice";

import Input from "./ui/Input";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";

interface EditTaskProps {
  task: Task;
  listId: string;
  changeMode: () => void;
  onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({
  task,
  listId,
  changeMode,
  onClose,
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [timeLimit, setTimeLimit] = useState(task.timeLimit);
  const [description, setDescription] = useState(task.description);

  const onClickAction = () => {
    dispatch(
      editTask({
        listId,
        task: { ...task, title, status, timeLimit, description },
      })
    );
    changeMode();
    onClose();
  };

  return (
    <div className="flex flex-col gap-2">
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
      <div className="w-full flex justify-end mt-2">
        <Button className="w-fit" onClick={onClickAction}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditTask;
