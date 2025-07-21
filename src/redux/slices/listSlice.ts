import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { TaskList } from "@/types";
import { initialStateData } from "@/constants";

interface TasksState {
  lists: TaskList[];
}

const initialState: TasksState = {
  lists: initialStateData as TaskList[],
};

const listSlice = createSlice({
  name: "list",
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
  },
});

export const { addList, editList, deleteList } = listSlice.actions;

export default listSlice.reducer;
