"use client";

import { useState } from "react";

import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import AddTask from "./AddTask";
import Button from "./ui/Button";
import TaskItem from "./TaskItem";
import TaskListTitleModal from "./TaskListTitleModal";

interface TaskListDetailsProps {
  listId: string;
}

const TaskListDetails: React.FC<TaskListDetailsProps> = ({ listId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const list = useSelector((state: RootState) =>
    state.tasks.lists.find((l) => l.id === listId)
  );

  if (!list) {
    return <div className="p-6 text-gray-400">List not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{list.title}</h2>
        <Button onClick={() => setIsOpen(true)}>Edit</Button>
      </div>
      <AddTask listId={listId} />
      <div className="space-y-3">
        {list.tasks.length ? (
          list.tasks.map((task) => (
            <TaskItem key={task.id} listId={listId} task={task} />
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
