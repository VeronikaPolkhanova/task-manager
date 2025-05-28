"use client";

import { useState } from "react";

import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { addTask } from "@/redux/slices/tasksSlice";

import Input from "./ui/Input";
import Button from "./ui/Button";
import TaskItem from "./TaskItem";
import Textarea from "./ui/Textarea";
import TaskListTitleModal from "./TaskListTitleModal";

interface TaskListDetailsProps {
  params: { listId: string };
}

const TaskListDetails: React.FC<TaskListDetailsProps> = ({ params }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const list = useSelector((state: RootState) =>
    state.tasks.lists.find((l) => l.id === params.listId)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);

  if (!list) {
    return <div className="p-6 text-gray-400">List not found</div>;
  }

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(
        addTask({
          listId: params.listId,
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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{list.title}</h2>
        <Button onClick={() => setIsOpen(true)}>Edit</Button>
      </div>
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
      <div className="space-y-3">
        {list.tasks.length ? (
          list.tasks.map((task) => (
            <TaskItem key={task.id} listId={params.listId} task={task} />
          ))
        ) : (
          <p className="text-gray-400">Tasks lists are empty</p>
        )}
      </div>
      {isOpen &&
        createPortal(
          <TaskListTitleModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            listTitle={list.title}
            listId={list.id}
          />,
          document.body
        )}
    </div>
  );
};

export default TaskListDetails;
