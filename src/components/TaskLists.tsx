"use client";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { RootState } from "@/redux/store";
import { addList, deleteList } from "@/redux/slices/tasksSlice";

import Input from "./ui/Input";
import Button from "./ui/Button";

const TaskLists = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.tasks.lists);
  const [newListTitle, setNewListTitle] = useState("");

  const handleAddList = () => {
    if (newListTitle.trim() !== "") {
      dispatch(addList({ title: newListTitle }));
      setNewListTitle("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tasks lists</h2>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="New task list"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <Button onClick={handleAddList}>Add</Button>
      </div>
      <ul className="space-y-2">
        {lists.map((list) => (
          <li
            key={list.id}
            className="p-3 border border-blue-100 rounded flex justify-between items-center">
            <div className="flex flex-col gap-2">
              {list.title} ({list.tasks.length} tasks)
              <Link
                href={`/dashboard/${list.id}`}
                className="bg-transparent font-bold text-gray-400 hover:bg-transparent hover:text-gray-500">
                Show
              </Link>
            </div>
            <Button onClick={() => dispatch(deleteList({ id: list.id }))}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskLists;
