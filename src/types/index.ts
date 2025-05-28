export type TaskStatus = "pending" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  timeLimit: number;
  startedAt: number | null;
}

export interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
}
