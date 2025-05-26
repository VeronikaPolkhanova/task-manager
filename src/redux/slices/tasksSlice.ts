import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

type TaskStatus = "pending" | "in_progress" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  timeLimit: number;
}

interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
}

interface TasksState {
  lists: TaskList[];
}

const initialState: TasksState = {
  lists: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<{ title: string }>) => {
      state.lists.push({
        id: nanoid(),
        title: action.payload.title,
        tasks: [],
      });
    },
    editList: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const list = state.lists.find((l) => l.id === action.payload.id);
      if (list) {
        list.title = action.payload.title;
      }
    },
    deleteList: (state, action: PayloadAction<{ id: string }>) => {
      state.lists = state.lists.filter((l) => l.id !== action.payload.id);
    },
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
        });
      }
    },
    editTask: (
      state,
      action: PayloadAction<{
        listId: string;
        taskId: string;
        title?: string;
        description?: string;
        timeLimit?: number;
      }>
    ) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      const task = list?.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        if (action.payload.title !== undefined)
          task.title = action.payload.title;
        if (action.payload.description !== undefined)
          task.description = action.payload.description;
        if (action.payload.timeLimit !== undefined)
          task.timeLimit = action.payload.timeLimit;
      }
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
    changeTaskStatus: (
      state,
      action: PayloadAction<{
        listId: string;
        taskId: string;
        status: TaskStatus;
      }>
    ) => {
      const list = state.lists.find((l) => l.id === action.payload.listId);
      const task = list?.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const {
  addList,
  editList,
  deleteList,
  addTask,
  editTask,
  deleteTask,
  changeTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
