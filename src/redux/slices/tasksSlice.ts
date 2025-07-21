import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { TaskList, Task } from "@/types";
import { initialStateData } from "@/constants";

interface TasksState {
  lists: TaskList[];
}

const initialState: TasksState = {
  lists: initialStateData as TaskList[],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        listId: string;
        title: string;
        description: string;
        timeLimit: number;
      }>
    ) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      if (list) {
        list.tasks.push({
          id: nanoid(),
          title: action.payload.title,
          description: action.payload.description,
          status: "pending",
          timeLimit: action.payload.timeLimit,
          startedAt: null,
        });
      }
    },
    editTask: (
      state,
      action: PayloadAction<{
        listId: string;
        task: Task;
      }>
    ) => {
      const { listId, task: updatedTask } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (!list) return;

      const index = list.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index === -1) return;

      const prevTask = list.tasks[index];

      // Таймерная логика: если статус стал "in_progress", запускаем таймер
      if (
        prevTask.status !== "in_progress" &&
        updatedTask.status === "in_progress"
      ) {
        updatedTask.startedAt = Date.now();
      }

      // Если статус не "in_progress", таймер сбрасывается
      if (updatedTask.status !== "in_progress") {
        updatedTask.startedAt = null;
      }

      list.tasks[index] = updatedTask;
    },
    deleteTask: (
      state,
      action: PayloadAction<{ listId: string; taskId: string }>
    ) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      if (list) {
        list.tasks = list.tasks.filter((t) => t.id !== action.payload.taskId);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const list = state.lists.find((l) => l.id === updatedTask.id);
      if (!list) return;

      const index = list.tasks.findIndex((t) => t.id === updatedTask.id);
      if (index === -1) return;

      const existingTask = list.tasks[index];

      // Если статус поменялся:
      if (existingTask.status !== updatedTask.status) {
        if (updatedTask.status === "in_progress") {
          updatedTask.startedAt = Date.now(); // стартуем таймер
        } else {
          updatedTask.startedAt = null; // сбрасываем
        }
      }

      list.tasks[index] = updatedTask;
    },
  },
});

export const { addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
