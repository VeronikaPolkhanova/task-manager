"use client";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import {
  addTask,
  changeTaskStatus,
  deleteTask,
} from "@/redux/slices/tasksSlice";

import Input from "./ui/Input";
import Button from "./ui/Button";
import Textarea from "./ui/Textarea";

interface TaskListDetailsProps {
  params: { listId: string };
}

const TaskListDetails: React.FC<TaskListDetailsProps> = ({ params }) => {
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) =>
    state.tasks.lists.find((l) => l.id === params.listId)
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);

  if (!list) {
    return <div className="p-6">List not found</div>;
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
      <h2 className="text-2xl font-bold">{list.title}</h2>
      <div className="space-y-2">
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
          placeholder="Time (sec)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(parseInt(e.target.value))}
        />
        <Button onClick={handleAddTask}>Add task</Button>
      </div>
      <div className="space-y-3">
        {list.tasks.map((task) => (
          <div
            key={task.id}
            className="border rounded p-3 flex flex-col md:flex-row justify-between md:items-center gap-2">
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-400">
                Time: {task.timeLimit} sec
              </p>
              <p className="text-xs">Status: {task.status}</p>
            </div>

            <div className="flex gap-2">
              <select
                value={task.status}
                onChange={(e) =>
                  dispatch(
                    changeTaskStatus({
                      listId: params.listId,
                      taskId: task.id,
                      status: e.target.value as any,
                    })
                  )
                }
                className="border px-2 py-1 rounded">
                <option value="pending">Ожидает</option>
                <option value="in_progress">В процессе</option>
                <option value="done">Готово</option>
              </select>
              <Button
                onClick={() =>
                  dispatch(
                    deleteTask({ listId: params.listId, taskId: task.id })
                  )
                }>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListDetails;
