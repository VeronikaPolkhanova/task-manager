"use client";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "@/redux/store";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { login } from "@/redux/slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    const params = { email, password };
    dispatch(login(params));
  };

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  return (
    <div className="p-6 max-w-80 mx-auto min-h-screen flex flex-col justify-center items-center gap-2">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} disabled={loading}>
        Login
      </Button>
      {(error as string) && <p className="text-amber-700">{error as string}</p>}
    </div>
  );
};

export default LoginPage;
