import TaskListDetails from "@/components/TaskListDetails";

export default function TaskListPage({
  params,
}: {
  params: { listId: string };
}) {
  return <TaskListDetails params={{ listId: params.listId }} />;
}
