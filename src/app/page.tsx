export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager!</h1>
      <a
        href="/login"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go to login
      </a>
    </div>
  );
}
