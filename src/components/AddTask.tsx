"use client";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { addTask } from "@/redux/slices/tasksSlice";

import Input from "./ui/Input";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";

interface AddTaskProps {
  listId: string;
}

const AddTask: React.FC<AddTaskProps> = ({ listId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(
        addTask({
          listId: listId,
          title,
          description,
          timeLimit,
        })
      );
      setTitle("");
      setDescription("");
      setTimeLimit(60);
    }
  };

  return (
    <div className="flex flex-col gap-1 space-y-2">
      <Input
        className="border px-2 py-1 w-full rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="number"
        className="border px-2 py-1 w-full rounded"
        placeholder="Time (min)"
        min={0}
        value={isNaN(timeLimit) ? "" : timeLimit}
        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
      />
      <Button className="w-fit" onClick={handleAddTask}>
        Add task
      </Button>
    </div>
  );
};

export default AddTask;
