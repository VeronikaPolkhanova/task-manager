import { NextResponse } from "next/server";

export const initialStateData = [
  {
    id: "Z0RmnUCxSZ_tysE-ekQOl",
    title: "Chores",
    tasks: [
      {
        id: "AfU-n3mYeYOPr1kCV9q0C",
        title: "To wash dishes",
        description: "To wash dishes until evening",
        status: "pending",
        timeLimit: 300,
        startedAt: null,
      },
      {
        id: "yRPZltktPZ7oaQBUc6hs9",
        title: "To clean room",
        description: "To clean room",
        status: "pending",
        timeLimit: 60,
        startedAt: null,
      },
    ],
  },
  {
    id: "asjL9yjLwoqzwE8eILKUZ",
    title: "Work",
    tasks: [
      {
        id: "-7JGG8WW6pgnDxtzt6B0O",
        title: "To email ",
        description: "To email mr. Smith about project",
        status: "pending",
        timeLimit: 60,
        startedAt: null,
      },
      {
        id: "g2eR2cXZyqX6EojSPTzzO",
        title: "To join daily meet",
        description: "To join daily meet with team",
        status: "pending",
        timeLimit: 20,
        startedAt: null,
      },
    ],
  },
];

export async function GET() {
  // эмуляция задержки ответа от сервера
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json(
    {
      data: {
        ...initialStateData,
      },
    },
    { status: 200 }
  );
}
