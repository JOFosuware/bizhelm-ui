"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bhFetch } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/home";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const mockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";
      if (!mockMode) {
        await bhFetch("/auth/login", { method: "POST", body: JSON.stringify({ identifier: email, password }) });
      }
      router.push(next);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Sign in" subtitle="Access your BizHelm dashboard">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="text-xs font-medium text-slate-600">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@company.com" required />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Password</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" required />
        </div>

        {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}

        <Button className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <Link className="text-slate-600 hover:text-slate-900" href="/forgot-password">Forgot password?</Link>
          <Link className="text-slate-600 hover:text-slate-900" href="/register">Create account</Link>
        </div>
      </form>
    </AuthCard>
  );
}
