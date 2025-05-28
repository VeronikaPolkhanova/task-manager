import { NextResponse } from "next/server";

const users = [
  { email: "test@example.com", password: "123456", name: "Ivan Ivanov" },
];

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find(
    (it) => it.email === email && it.password === password
  );

  // эмуляция задержки ответа от сервера
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (user) {
    return NextResponse.json(
      {
        user: {
          email,
          name: user.name,
        },
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
