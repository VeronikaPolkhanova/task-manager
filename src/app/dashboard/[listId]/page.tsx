import TaskListDetails from "@/components/TaskListDetails";

export default async function TaskListPage({
  params,
}: {
  params: { listId: string };
}) {
  // await убирает warning `params` should be awaited before using its properties
  const { listId } = await params;
  return <TaskListDetails listId={listId} />;
}
