"use client";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "@/redux/slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      dispatch(loginSuccess(data.user));
      router.push("/dashboard");
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };

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
      <Button onClick={handleLogin} disabled={auth.loading}>
        Login
      </Button>
      {auth.error && <p className="text-amber-700">{auth.error}</p>}
    </div>
  );
};

export default LoginPage;
